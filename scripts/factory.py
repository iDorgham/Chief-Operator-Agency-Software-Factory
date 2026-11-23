"""Factory work automation: scaffold, move, check and learn from work records.

Layout under a work root (default ``work/``)::

    <root>/.../<project-id>/project.json          project record (project.schema.json)
    <root>/.../<project-id>/tasks/<TASK-ID>.json  work items (work-item.schema.json)
    <root>/.../<project-id>/events.jsonl          append-only audit events (event.schema.json)
    <root>/improvements/IMP-*.json                retro proposals (improvement.schema.json)

Commands (run ``python scripts/factory.py <command> -h`` for options):

    init-project  create a project folder and project.json
    new-task      create a work item with the next stable ID
    move          change a task's status through the allowed state machine, logging an event
    next          list tasks that are ready to start now (dependencies completed)
    status        board summary: counts, blocked and stale work
    check         validate every record against its schema and the factory invariants
    retro         compute cycle metrics from events and draft improvement proposals

Nothing here sends, publishes, deploys, merges or spends. ``retro`` only drafts
proposals with status ``proposed``; adopting one still needs operator approval.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCHEMAS = ROOT / "schemas"
WORK_ITEM_VERSION = "1.1.0"

# Allowed status transitions. Fast-lane tasks may also go draft -> active
# (see docs/04-workflows/fast-lane.md).
TRANSITIONS: dict[str, set[str]] = {
    "draft": {"approved", "cancelled"},
    "approved": {"queued", "active", "cancelled"},
    "queued": {"active", "blocked", "cancelled"},
    "active": {"blocked", "review", "cancelled"},
    "blocked": {"active", "queued", "cancelled"},
    "review": {"active", "completed", "cancelled"},
    "completed": set(),
    "cancelled": set(),
}
FAST_LANE_EXTRA = {("draft", "active")}
READY_STATUSES = {"approved", "queued"}
OPEN_STATUSES = {"draft", "approved", "queued", "active", "blocked", "review"}

# Retro thresholds. Tune through an approved improvement proposal.
REWORK_ROUNDS = 2          # review -> active transitions on one task
BLOCKED_SHARE = 0.25       # share of cycle time spent blocked
STALE_ACTIVE = timedelta(days=3)


class FactoryError(Exception):
    pass


# --------------------------------------------------------------------------- io


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def parse_time(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def read_events(project_dir: Path) -> list[dict]:
    path = project_dir / "events.jsonl"
    if not path.exists():
        return []
    events = []
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if line.strip():
            try:
                events.append(json.loads(line))
            except json.JSONDecodeError as exc:
                raise FactoryError(f"{path}:{number}: invalid JSON: {exc}") from exc
    return events


def append_event(project_dir: Path, event: dict) -> None:
    with (project_dir / "events.jsonl").open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(json.dumps(event, ensure_ascii=False) + "\n")


def find_projects(root: Path) -> list[Path]:
    return sorted(p.parent for p in root.rglob("project.json"))


def load_tasks(project_dir: Path) -> dict[str, tuple[Path, dict]]:
    tasks = {}
    for path in sorted((project_dir / "tasks").glob("*.json")):
        data = read_json(path)
        tasks[data.get("task_id", path.stem)] = (path, data)
    return tasks


def validator(name: str):
    try:
        import jsonschema
    except ImportError:
        return None
    schema = read_json(SCHEMAS / f"{name}.schema.json")
    cls = jsonschema.Draft202012Validator
    return cls(schema, format_checker=cls.FORMAT_CHECKER)


def schema_errors(name: str, instance: dict) -> list[str]:
    v = validator(name)
    if v is None:
        return []
    return [f"{'/'.join(map(str, e.path)) or '<root>'}: {e.message}" for e in v.iter_errors(instance)]


def ensure_valid(name: str, instance: dict) -> None:
    errors = schema_errors(name, instance)
    if errors:
        raise FactoryError(f"{name} record is invalid: " + "; ".join(errors))


# ---------------------------------------------------------------------- commands


def cmd_init_project(args) -> int:
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{2,63}", args.project):
        raise FactoryError("project id must be 3-64 chars of a-z, 0-9 and '-'")
    root = Path(args.root)
    base = root / "clients" / args.client / "projects" if args.client else root / "projects"
    project_dir = base / args.project
    if (project_dir / "project.json").exists():
        raise FactoryError(f"{project_dir} already has project.json")
    stamp = now()
    record = {
        "schema_version": "1.0.0",
        "project_id": args.project,
        "client_id": args.client,
        "name": args.name,
        "outcome": args.outcome or "",
        "status": "active",
        "owner": args.owner,
        "sensitivity": args.sensitivity,
        "source_refs": [],
        "created_at": stamp,
        "updated_at": stamp,
    }
    ensure_valid("project", record)
    write_json(project_dir / "project.json", record)
    (project_dir / "tasks").mkdir(exist_ok=True)
    (project_dir / "events.jsonl").touch()
    print(project_dir.as_posix())
    return 0


def next_task_id(project_dir: Path, prefix: str) -> str:
    highest = 0
    for path in (project_dir / "tasks").glob(f"{prefix}-*.json"):
        match = re.fullmatch(rf"{re.escape(prefix)}-(\d+)", path.stem)
        if match:
            highest = max(highest, int(match.group(1)))
    return f"{prefix}-{highest + 1:03d}"


def default_prefix(project_id: str) -> str:
    parts = [p for p in project_id.split("-") if p]
    return ("".join(p[0] for p in parts) if len(parts) > 1 else project_id[:3]).upper()[:6]


def cmd_new_task(args) -> int:
    project_dir = Path(args.project_dir)
    project = read_json(project_dir / "project.json")
    if args.reviewer == args.owner:
        raise FactoryError("reviewer must differ from owner (no bot approves its own work)")
    prefix = (args.prefix or default_prefix(project["project_id"])).upper()
    task_id = next_task_id(project_dir, prefix)
    stamp = now()
    record = {
        "schema_version": WORK_ITEM_VERSION,
        "task_id": task_id,
        "project_id": project["project_id"],
        "client_id": project.get("client_id"),
        "title": args.title,
        "objective": args.objective or "",
        "status": "draft",
        "lane": args.lane,
        "owner": args.owner,
        "reviewer": args.reviewer,
        "version": "1",
        "approved_input_refs": args.input or [],
        "acceptance_criteria": args.criteria,
        "allowed_scope": args.scope or [],
        "exclusions": args.exclude or [],
        "dependencies": args.depends or [],
        "evidence_refs": [],
        "created_at": stamp,
        "updated_at": stamp,
    }
    ensure_valid("work-item", record)
    write_json(project_dir / "tasks" / f"{task_id}.json", record)
    append_event(project_dir, make_event(record, "task.created", args.owner, f"Created {task_id}: {args.title}", None, "draft", [], stamp))
    print(task_id)
    return 0


def make_event(task: dict, event_type: str, actor: str, summary: str, previous, new, evidence, stamp) -> dict:
    key = f"{task['task_id']}:{previous}->{new}:{stamp}"
    return {
        "schema_version": "1.0.0",
        "event_id": "EVT-" + hashlib.sha1(key.encode()).hexdigest()[:12].upper(),
        "project_id": task["project_id"],
        "task_id": task["task_id"],
        "run_id": None,
        "event_type": event_type,
        "actor": actor,
        "occurred_at": stamp,
        "summary": summary,
        "previous_status": previous,
        "new_status": new,
        "idempotency_key": key,
        "receipt_ref": None,
        "evidence_refs": evidence,
    }


def resolve_task(target: str, root: Path) -> tuple[Path, Path]:
    path = Path(target)
    if path.suffix == ".json" and path.exists():
        return path, path.parent.parent
    for project_dir in find_projects(root):
        candidate = project_dir / "tasks" / f"{target}.json"
        if candidate.exists():
            return candidate, project_dir
    raise FactoryError(f"task '{target}' not found under {root}")


def transition_errors(task: dict, new: str, actor: str, tasks: dict) -> list[str]:
    old = task["status"]
    errors = []
    allowed = TRANSITIONS.get(old, set())
    if new not in allowed and not (task.get("lane") == "fast" and (old, new) in FAST_LANE_EXTRA):
        errors.append(f"{old} -> {new} is not an allowed transition (allowed: {', '.join(sorted(allowed)) or 'none'})")
    if new == "active":
        pending = [d for d in task.get("dependencies", []) if d in tasks and tasks[d][1]["status"] != "completed"]
        if pending:
            errors.append(f"dependencies not completed: {', '.join(pending)}")
    if new == "review" and not task.get("evidence_refs"):
        errors.append("attach evidence (--evidence) before moving to review")
    if new == "completed":
        if actor == task["owner"]:
            errors.append("the owner cannot complete their own task; the reviewer or Chief Operator must")
        if not task.get("evidence_refs"):
            errors.append("completed tasks need evidence_refs")
    return errors


def cmd_move(args) -> int:
    task_path, project_dir = resolve_task(args.task, Path(args.root))
    task = read_json(task_path)
    tasks = load_tasks(project_dir)
    task["evidence_refs"] = list(dict.fromkeys(task.get("evidence_refs", []) + (args.evidence or [])))
    errors = transition_errors(task, args.status, args.actor, tasks)
    if errors:
        raise FactoryError(f"{task['task_id']}: " + "; ".join(errors))
    previous = task["status"]
    stamp = now()
    task.update(status=args.status, updated_at=stamp, schema_version=WORK_ITEM_VERSION)
    ensure_valid("work-item", task)
    write_json(task_path, task)
    summary = args.summary or f"{task['task_id']} moved {previous} -> {args.status}"
    append_event(project_dir, make_event(task, "task.status_changed", args.actor, summary, previous, args.status, args.evidence or [], stamp))
    print(f"{task['task_id']}: {previous} -> {args.status}")
    return 0


def all_tasks(root: Path) -> list[tuple[Path, dict, dict]]:
    rows = []
    for project_dir in find_projects(root):
        tasks = load_tasks(project_dir)
        for _, (_, task) in tasks.items():
            rows.append((project_dir, task, tasks))
    return rows


def is_ready(task: dict, tasks: dict) -> bool:
    if task["status"] not in READY_STATUSES:
        return False
    return all(d in tasks and tasks[d][1]["status"] == "completed" for d in task.get("dependencies", []))


def cmd_next(args) -> int:
    ready = [(p, t) for p, t, tasks in all_tasks(Path(args.root)) if is_ready(t, tasks)]
    ready.sort(key=lambda row: (row[1].get("lane") != "fast", row[1].get("created_at", ""), row[1]["task_id"]))
    if not ready:
        print("No tasks ready to start.")
    for project_dir, task in ready:
        print(f"{task['task_id']}\t{task.get('lane', 'standard')}\t{task['owner']}\t{task['title']}")
    return 0


def cmd_status(args) -> int:
    root = Path(args.root)
    rows = all_tasks(root)
    if not rows:
        print(f"No tasks under {root}.")
        return 0
    counts = Counter(t["status"] for _, t, _ in rows)
    print("Status: " + ", ".join(f"{s}={counts[s]}" for s in TRANSITIONS if counts[s]))
    current = datetime.now(timezone.utc)
    for _, task, tasks in rows:
        flag = ""
        if task["status"] == "blocked":
            flag = "BLOCKED"
        elif task["status"] == "active" and "updated_at" in task and current - parse_time(task["updated_at"]) > STALE_ACTIVE:
            flag = "STALE"
        elif is_ready(task, tasks):
            flag = "READY"
        if flag:
            print(f"  {flag:8}{task['task_id']}\t{task['owner']}\t{task['title']}")
    return 0


def cmd_check(args) -> int:
    root = Path(args.root)
    problems: list[str] = []
    if validator("work-item") is None:
        raise FactoryError("check needs jsonschema: pip install -r scripts/requirements.txt")
    projects = find_projects(root)
    for project_dir in projects:
        where = project_dir.as_posix()
        project = read_json(project_dir / "project.json")
        problems += [f"{where}/project.json: {e}" for e in schema_errors("project", project)]
        if project_dir.name != project.get("project_id"):
            problems.append(f"{where}: folder name differs from project_id '{project.get('project_id')}'")
        tasks = load_tasks(project_dir)
        for task_id, (path, task) in tasks.items():
            label = path.relative_to(root).as_posix() if path.is_relative_to(root) else path.as_posix()
            problems += [f"{label}: {e}" for e in schema_errors("work-item", task)]
            if path.stem != task_id:
                problems.append(f"{label}: file name differs from task_id '{task_id}'")
            if task.get("project_id") != project.get("project_id"):
                problems.append(f"{label}: project_id differs from project.json")
            if task.get("reviewer") and task.get("reviewer") == task.get("owner"):
                problems.append(f"{label}: reviewer equals owner")
            if task.get("status") == "completed" and not task.get("evidence_refs"):
                problems.append(f"{label}: completed without evidence_refs")
            for dep in task.get("dependencies", []):
                if dep not in tasks:
                    problems.append(f"{label}: unknown dependency '{dep}'")
        try:
            events = read_events(project_dir)
        except FactoryError as exc:
            problems.append(str(exc))
            events = []
        seen = set()
        for number, event in enumerate(events, 1):
            label = f"{where}/events.jsonl:{number}"
            problems += [f"{label}: {e}" for e in schema_errors("event", event)]
            if event.get("event_id") in seen:
                problems.append(f"{label}: duplicate event_id {event.get('event_id')}")
            seen.add(event.get("event_id"))
            if event.get("task_id") and event["task_id"] not in tasks:
                problems.append(f"{label}: unknown task_id {event['task_id']}")
        problems += [f"{where}: {p}" for p in replay_mismatches(tasks, events)]
    for path in sorted((root / "improvements").glob("*.json")):
        problems += [f"{path.as_posix()}: {e}" for e in schema_errors("improvement", read_json(path))]
    for problem in problems:
        print(f"FAIL: {problem}", file=sys.stderr)
    print(f"Work check: {len(projects)} project(s) under {root.as_posix()}, {len(problems)} problem(s).")
    return 1 if problems else 0


def replay_mismatches(tasks: dict, events: list[dict]) -> list[str]:
    """The last logged status of each task must equal its current status."""
    last: dict[str, str] = {}
    for event in events:
        if event.get("task_id") and event.get("new_status"):
            last[event["task_id"]] = event["new_status"]
    return [
        f"{tid}: status '{task['status']}' but last event says '{last[tid]}'"
        for tid, (_, task) in tasks.items()
        if tid in last and last[tid] != task["status"]
    ]


# -------------------------------------------------------------------------- retro


def task_metrics(events: list[dict]) -> dict[str, dict]:
    by_task: dict[str, list[dict]] = defaultdict(list)
    for event in events:
        if event.get("task_id") and event.get("new_status"):
            by_task[event["task_id"]].append(event)
    metrics = {}
    for task_id, items in by_task.items():
        items.sort(key=lambda e: e["occurred_at"])
        started = finished = None
        blocked = timedelta()
        blocked_since = None
        rework = 0
        for event in items:
            at = parse_time(event["occurred_at"])
            prev, new = event.get("previous_status"), event["new_status"]
            if new == "active" and started is None:
                started = at
            if prev == "review" and new == "active":
                rework += 1
            if new == "blocked":
                blocked_since = at
            elif blocked_since is not None:
                blocked += at - blocked_since
                blocked_since = None
            if new == "completed":
                finished = at
        metrics[task_id] = {
            "cycle": (finished - started) if started and finished else None,
            "blocked": blocked,
            "rework": rework,
            "event_ids": [e["event_id"] for e in items],
        }
    return metrics


def proposal(rule: str, evidence: list[str], problem: str, change: str, benefit: str, risk: str, validation: str, rollback: str) -> dict:
    digest = hashlib.sha1((rule + "|" + "|".join(sorted(evidence))).encode()).hexdigest()[:8].upper()
    return {
        "schema_version": "1.0.0",
        "proposal_id": f"IMP-AUTO-{rule.upper()}-{digest}",
        "owner": "operations-analytics-improvement-lead",
        "evidence_refs": sorted(evidence),
        "problem": problem,
        "change": change,
        "expected_benefit": benefit,
        "risk": risk,
        "validation": validation,
        "rollback": rollback,
        "status": "proposed",
    }


def hours(delta: timedelta) -> float:
    return round(delta.total_seconds() / 3600, 1)


def build_retro(root: Path) -> tuple[list[str], list[dict]]:
    lines = ["# Factory Retro", "", f"Root: `{root.as_posix()}`", ""]
    proposals: list[dict] = []
    rework_tasks, blocked_tasks, cycles = [], [], []
    fast, standard = [], []
    for project_dir in find_projects(root):
        tasks = load_tasks(project_dir)
        for task_id, m in task_metrics(read_events(project_dir)).items():
            task = tasks.get(task_id, (None, {}))[1]
            if m["cycle"] is not None:
                cycles.append(m["cycle"])
                (fast if task.get("lane") == "fast" else standard).append(m["cycle"])
                if m["blocked"] / m["cycle"] >= BLOCKED_SHARE:
                    blocked_tasks.append(task_id)
            if m["rework"] >= REWORK_ROUNDS:
                rework_tasks.append(task_id)

    def avg(values):
        return f"{hours(sum(values, timedelta()) / len(values))} h" if values else "n/a"

    lines += [
        f"- Completed tasks with timing: {len(cycles)}",
        f"- Average cycle (first active -> completed): {avg(cycles)}",
        f"- Fast lane average: {avg(fast)} ({len(fast)}); standard average: {avg(standard)} ({len(standard)})",
        f"- Tasks with >= {REWORK_ROUNDS} review rework rounds: {', '.join(rework_tasks) or 'none'}",
        f"- Tasks blocked >= {int(BLOCKED_SHARE * 100)}% of their cycle: {', '.join(blocked_tasks) or 'none'}",
        "",
    ]
    if rework_tasks:
        proposals.append(proposal(
            "rework", rework_tasks,
            f"{len(rework_tasks)} task(s) went back from review to active {REWORK_ROUNDS}+ times.",
            "Before moving to review, the owner runs the reviewer's checklist and attaches its result as evidence; add that checklist line to templates/task.md.",
            "Fewer review round-trips and shorter cycle time.",
            "Slightly more owner effort before review.",
            "Compare rework rounds on the next five tasks against these.",
            "Remove the checklist line from templates/task.md.",
        ))
    if blocked_tasks:
        proposals.append(proposal(
            "blocked", blocked_tasks,
            f"{len(blocked_tasks)} task(s) spent at least {int(BLOCKED_SHARE * 100)}% of their cycle blocked.",
            "Record dependencies at task creation and run `factory.py next` at the start of each session so blocked work is not started early.",
            "Less idle time in active work; earlier escalation of blockers.",
            "Some tasks start later while their dependencies finish.",
            "Compare blocked share on the next five completed tasks.",
            "Stop the session-start `next` check.",
        ))
    if standard and len(standard) >= 3 and not fast:
        proposals.append(proposal(
            "fastlane", [f"cycles:{len(standard)}"],
            "No work used the fast lane, so low-risk internal tasks pay the full standard-lane overhead.",
            "Classify reversible internal tasks with no external effects as `--lane fast` per docs/04-workflows/fast-lane.md.",
            "Shorter cycle time for small internal tasks.",
            "A misclassified task skips the separate approval step.",
            "Compare fast-lane and standard cycle times after five fast-lane tasks.",
            "Create tasks with the default standard lane again.",
        ))
    lines.append("## Draft proposals (status: proposed, need operator approval)")
    lines.append("")
    lines += [f"- `{p['proposal_id']}`: {p['change']}" for p in proposals] or ["- none"]
    return lines, proposals


def cmd_retro(args) -> int:
    root = Path(args.root)
    lines, proposals = build_retro(root)
    report = "\n".join(lines) + "\n"
    print(report, end="")
    if args.report:
        Path(args.report).parent.mkdir(parents=True, exist_ok=True)
        Path(args.report).write_text(report, encoding="utf-8")
    if args.write:
        for item in proposals:
            ensure_valid("improvement", item)
            path = root / "improvements" / f"{item['proposal_id']}.json"
            if not path.exists():  # never overwrite a proposal someone has reviewed
                write_json(path, item)
                print(f"wrote {path.as_posix()}")
    return 0


# ---------------------------------------------------------------------------- cli


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__.split("\n", 1)[0])
    parser.add_argument("--root", default=str(ROOT / "work"), help="work root (default: work/)")
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("init-project", help="create a project folder and project.json")
    p.add_argument("project", help="project id, e.g. acme-site")
    p.add_argument("--name", required=True)
    p.add_argument("--owner", default="chief-operator")
    p.add_argument("--client", help="client id; omit for internal work")
    p.add_argument("--outcome")
    p.add_argument("--sensitivity", default="internal", choices=["public", "internal", "confidential", "restricted"])
    p.set_defaults(func=cmd_init_project)

    p = sub.add_parser("new-task", help="create a work item with the next stable ID")
    p.add_argument("project_dir")
    p.add_argument("--title", required=True)
    p.add_argument("--owner", required=True)
    p.add_argument("--reviewer", required=True, help="must differ from owner; 'automated-checks' allowed on the fast lane")
    p.add_argument("--criteria", action="append", required=True, help="acceptance criterion (repeat)")
    p.add_argument("--lane", choices=["standard", "fast"], default="standard")
    p.add_argument("--objective")
    p.add_argument("--input", action="append", help="approved input ref (repeat)")
    p.add_argument("--scope", action="append")
    p.add_argument("--exclude", action="append")
    p.add_argument("--depends", action="append")
    p.add_argument("--prefix", help="task ID prefix (default from project id)")
    p.set_defaults(func=cmd_new_task)

    p = sub.add_parser("move", help="change a task's status and log an event")
    p.add_argument("task", help="task ID or path to its JSON file")
    p.add_argument("status", choices=sorted(TRANSITIONS))
    p.add_argument("--actor", required=True)
    p.add_argument("--summary")
    p.add_argument("--evidence", action="append", help="evidence ref to attach (repeat)")
    p.set_defaults(func=cmd_move)

    for name, func, text in (
        ("next", cmd_next, "list tasks ready to start now"),
        ("status", cmd_status, "board summary"),
        ("check", cmd_check, "validate all work records"),
    ):
        sub.add_parser(name, help=text).set_defaults(func=func)

    p = sub.add_parser("retro", help="metrics and draft improvement proposals")
    p.add_argument("--write", action="store_true", help="save new proposals under <root>/improvements/")
    p.add_argument("--report", help="also write the markdown report to this path")
    p.set_defaults(func=cmd_retro)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        return args.func(args)
    except (FactoryError, FileNotFoundError, json.JSONDecodeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
