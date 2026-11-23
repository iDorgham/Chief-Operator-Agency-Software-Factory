"""Tests for scripts/factory.py. Run: python scripts/test_factory.py"""

from __future__ import annotations

import contextlib
import io
import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import factory  # noqa: E402

FIXTURE_ROOT = factory.ROOT / "fixtures" / "work"


def run(*argv: str) -> tuple[int, str, str]:
    out, err = io.StringIO(), io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
        code = factory.main(list(argv))
    return code, out.getvalue(), err.getvalue()


class FactoryFlowTest(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = Path(tempfile.mkdtemp())
        self.root = str(self.tmp)
        code, out, _ = run("--root", self.root, "init-project", "syn-flow", "--name", "Synthetic flow")
        self.assertEqual(code, 0)
        self.project = out.strip()

    def tearDown(self) -> None:
        shutil.rmtree(self.tmp, ignore_errors=True)

    def new_task(self, *extra: str) -> str:
        code, out, err = run("--root", self.root, "new-task", self.project, "--title", "Synthetic task",
                             "--owner", "software-lead", "--reviewer", "quality-lead",
                             "--criteria", "Observable result", *extra)
        self.assertEqual(code, 0, err)
        return out.strip()

    def move(self, task: str, status: str, actor: str = "software-lead", *extra: str) -> tuple[int, str]:
        code, _, err = run("--root", self.root, "move", task, status, "--actor", actor, *extra)
        return code, err

    def test_standard_lane_full_flow_and_check(self) -> None:
        task = self.new_task()
        self.assertEqual(task, "SF-001")
        self.assertEqual(self.new_task(), "SF-002")
        for status in ("approved", "active"):
            self.assertEqual(self.move(task, status)[0], 0)
        self.assertEqual(self.move(task, "review", "software-lead", "--evidence", "TEST-RUN-1")[0], 0)
        self.assertEqual(self.move(task, "completed", "quality-lead")[0], 0)
        code, out, err = run("--root", self.root, "check")
        self.assertEqual(code, 0, err)
        self.assertIn("0 problem(s)", out)

    def test_guards(self) -> None:
        task = self.new_task()
        code, err = self.move(task, "active")
        self.assertEqual(code, 2)
        self.assertIn("not an allowed transition", err)  # standard lane cannot skip approval
        self.move(task, "approved")
        self.move(task, "active")
        code, err = self.move(task, "review")
        self.assertIn("attach evidence", err)
        self.move(task, "review", "software-lead", "--evidence", "TEST-RUN-1")
        code, err = self.move(task, "completed", "software-lead")
        self.assertIn("cannot complete their own task", err)

    def test_reviewer_must_differ(self) -> None:
        code, _, err = run("--root", self.root, "new-task", self.project, "--title", "x", "--owner", "a",
                           "--reviewer", "a", "--criteria", "c")
        self.assertEqual(code, 2)
        self.assertIn("reviewer must differ", err)

    def test_fast_lane_and_dependencies(self) -> None:
        first = self.new_task("--lane", "fast")
        second = self.new_task("--lane", "fast", "--depends", first)
        self.assertEqual(self.move(first, "active")[0], 0)  # fast lane skips separate approval
        code, err = self.move(second, "active")
        self.assertIn("dependencies not completed", err)
        code, out, _ = run("--root", self.root, "next")
        self.assertNotIn(second, out)

    def test_check_detects_tampering(self) -> None:
        task = self.new_task()
        path = Path(self.project) / "tasks" / f"{task}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        data["status"] = "completed"
        path.write_text(json.dumps(data), encoding="utf-8")
        code, _, err = run("--root", self.root, "check")
        self.assertEqual(code, 1)
        self.assertIn("completed without evidence_refs", err)
        self.assertIn("last event says 'draft'", err)


class RetroTest(unittest.TestCase):
    def test_fixture_metrics_and_idempotent_write(self) -> None:
        tmp = Path(tempfile.mkdtemp())
        try:
            shutil.copytree(FIXTURE_ROOT, tmp, dirs_exist_ok=True)
            code, out, _ = run("--root", str(tmp), "retro", "--write")
            self.assertEqual(code, 0)
            self.assertIn("SFD-001", out)  # rework
            self.assertIn("SFD-003", out)  # blocked
            written = sorted(p.name for p in (tmp / "improvements").glob("*.json"))
            self.assertEqual(len(written), 2)
            for path in (tmp / "improvements").glob("*.json"):
                self.assertEqual(json.loads(path.read_text(encoding="utf-8"))["status"], "proposed")
            run("--root", str(tmp), "retro", "--write")
            self.assertEqual(sorted(p.name for p in (tmp / "improvements").glob("*.json")), written)
            self.assertEqual(run("--root", str(tmp), "check")[0], 0)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    unittest.main(verbosity=1)
