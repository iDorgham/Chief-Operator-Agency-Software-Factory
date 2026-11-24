"use client";

import { useEffect, useRef, useState } from "react";
import { createTRPCClient, httpLink } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DeskRouter } from "../server/demo";

type Snapshot = inferRouterOutputs<DeskRouter>["desk"]["snapshot"];
type Task = Snapshot["tasks"][number];
const views = ["Overview", "Projects", "Work queue", "Active run", "Approvals", "Team", "Capabilities", "Evidence", "Audit", "Improvements", "Settings"] as const;
type View = typeof views[number];
const iconPaths: Record<View, string> = {
  Overview: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  Projects: "M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
  "Work queue": "M9 6h12 M9 12h12 M9 18h12 M3 6h.01 M3 12h.01 M3 18h.01",
  "Active run": "m9 5 11 7-11 7z M4 5v14",
  Approvals: "m9 12 2 2 4-4 M12 3l8 4v5c0 5-8 9-8 9s-8-4-8-9V7z",
  Team: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  Capabilities: "m12 3 9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5",
  Evidence: "M14 2H5v20h14V7z M14 2v6h5 M8 12h8 M8 16h6",
  Audit: "M4 4v5h5 M4 9a9 9 0 1 1-1 6 M12 7v5l3 2",
  Improvements: "m3 17 6-6 4 4 8-10 M15 5h6v6",
  Settings: "M4 7h16 M4 17h16 M9 4v6 M15 14v6",
};
const navGroups: { label: string; items: View[] }[] = [
  { label: "Workspace", items: ["Overview", "Projects", "Work queue", "Approvals"] },
  { label: "Operations", items: ["Active run", "Team", "Evidence", "Audit"] },
  { label: "Manage", items: ["Capabilities", "Improvements", "Settings"] },
];
function Icon({ view }: { view: View }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[view]} /></svg>;
}
const client = createTRPCClient<DeskRouter>({ links: [httpLink({ url: "/api/trpc" })] });
const queryKey = ["demo-desk"];

function Badge({ status }: { status: string }) {
  return <span className={`badge ${status.toLowerCase().replaceAll(" ", "-")}`}><span aria-hidden="true">{status.toLowerCase() === "blocked" ? "!" : "•"}</span> {status.replaceAll("_", " ")}</span>;
}
function Empty({ title, children }: { title: string; children?: React.ReactNode }) {
  return <div className="empty"><span aria-hidden="true">◇</span><h3>{title}</h3>{children && <p>{children}</p>}</div>;
}
function Panel({ title, label, children, action }: { title: string; label?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="panel"><div className="panel-head"><h2 title={label}>{title}</h2>{action}</div>{children}</section>;
}
function time(value: string) { return new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(value)); }

export function ControlDesk() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } }));
  return <QueryClientProvider client={queryClient}><Desk /></QueryClientProvider>;
}

function Desk() {
  const [view, setView] = useState<View>("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const query = useQuery({ queryKey, queryFn: () => client.desk.snapshot.query() });
  const data = query.data;
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (views.includes(hash as View)) setView(hash as View);
    const handleHash = () => {
      const next = decodeURIComponent(window.location.hash.slice(1));
      if (views.includes(next as View)) setView(next as View);
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  function navigate(next: View) {
    setView(next); setSelected(null); setSelectedEvidence(null); setNotice(""); setMenuOpen(false);
    window.location.hash = next;
    titleRef.current?.focus();
  }
  const completed = data?.tasks.filter(t => t.status === "completed").length ?? 0;
  const blocked = data?.tasks.filter(t => t.status === "blocked") ?? [];
  const task = data?.tasks.find(t => t.id === selected);
  const artifact = data?.evidence.find(e => e.id === selectedEvidence);

  function taskList(tasks: Task[]) {
    if (!tasks.length) return <Empty title="No matching work">Try a different search or status.</Empty>;
    return <div className="task-list">{tasks.map(t => <button className={`task-row ${selected === t.id ? "selected" : ""}`} key={t.id} onClick={() => setSelected(t.id)} aria-label={`Open ${t.id}: ${t.title}`}><span className={`task-symbol ${t.status}`} aria-hidden="true">{t.status === "completed" ? "✓" : t.status === "blocked" ? "!" : "↗"}</span><span className="task-name"><small>{t.id} <span> / {t.lane}</span></small><strong>{t.title}</strong><span>{t.owner}</span></span><Badge status={t.status} /><span aria-hidden="true" className="row-arrow">↗</span></button>)}</div>;
  }
  function audit(limit?: number) {
    return <ol className="audit-list">{data?.events.slice(0, limit).map(event => <li key={event.id}><span className="audit-dot" aria-hidden="true" /><div><small>{time(event.at)} · {event.actor}</small><p>{event.summary}</p><span className="muted">{event.receipt ? `Synthetic evidence: ${event.receipt}` : "No external execution receipt"}</span></div></li>)}</ol>;
  }
  function run() {
    return <><div className="run-caption"><span className="run-icon" aria-hidden="true">↗</span><div><strong>Receipt page implementation</strong><p>SYN-RUN-002 · Software Lead</p></div><Badge status="active" /></div><ol className="timeline">{data?.phases.map((phase, i) => <li key={phase.title} className={phase.status}><span aria-hidden="true">{phase.status === "completed" ? "✓" : `0${i + 1}`}</span><div><strong>{phase.title}</strong><p>{phase.detail}</p><Badge status={phase.status} /></div></li>)}</ol><div className="footnote">ETA unavailable · no historical duration sample. Phase state is synthetic; no live agent is running.</div></>;
  }

  return <div className="desk-shell">
    <a className="skip-link" href="#workspace">Skip to workspace</a>
    <aside className={`sidebar ${menuOpen ? "menu-open" : ""}`}><div className="sidebar-heading"><div className="brand"><span className="brand-mark" aria-hidden="true">f.</span><div>Control Desk<small>Factory workspace</small></div></div><button className="menu-toggle button secondary" aria-expanded={menuOpen} aria-controls="workspace-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close menu" : "Open menu"}<span aria-hidden="true">{menuOpen ? "×" : "☰"}</span></button></div><nav id="workspace-navigation" aria-label="Workspace">{navGroups.map(group => <div className="nav-group" key={group.label}><p className="nav-label">{group.label}</p>{group.items.map(item => <button key={item} className={`nav-item ${view === item ? "current" : ""}`} aria-current={view === item ? "page" : undefined} onClick={() => navigate(item)}><Icon view={item} />{item}{item === "Approvals" && !!data?.approvals.length && <span className="nav-count">{data.approvals.length}</span>}</button>)}</div>)}</nav><div className="sidebar-bottom"><span className="avatar">CO</span><div><strong>Chief Operator</strong><small>Your workspace</small></div></div></aside>
    <div className="main-shell"><header className="topbar"><div className="breadcrumb">Workspace <span aria-hidden="true">/</span> <strong>{view}</strong></div><div className="mode-switch" aria-label="Environment"><span className="demo-indicator"><span aria-hidden="true">●</span> Demo</span><button disabled title="Live requires authentication, durable storage and approved adapters">Live <span aria-hidden="true">⌑</span></button></div></header>
      <main id="workspace" tabIndex={-1}><div className="demo-banner"><span className="demo-tag">Demo workspace</span><span>Synthetic data. Decisions are simulated; no external actions run.</span></div><div className="page-heading"><div><h1 ref={titleRef} tabIndex={-1}>{view === "Overview" ? "Workspace overview" : view}</h1><p>{view === "Overview" ? "A clear view of your work. A little less to keep track of." : "Factory demonstration · synthetic records"}</p></div><button className="button secondary refresh" onClick={() => void query.refetch()} disabled={query.isFetching}><span aria-hidden="true" className={query.isFetching ? "refreshing" : ""}>↻</span> {query.isFetching ? "Refreshing…" : "Refresh desk"}</button></div>
        {notice && <div className="notice" role="status">{notice}</div>}
        {query.isPending && <section className="panel loading" role="status"><div className="skeleton" /><h2>Loading your demo workspace…</h2><p>Reading project, task and approval records.</p></section>}
        {query.isError && <section className="panel error" role="alert"><h2>The desk could not refresh.</h2><p>{data ? "Previously loaded data is shown below. Refresh before making a decision." : "The demo service is unavailable. Your request has not been treated as successful."}</p><button className="button" onClick={() => void query.refetch()}>Try again</button></section>}
        {data && <div key={view} className="view-content">
          {view === "Overview" && <><div className="metrics"><div><p>Completed tasks</p><strong>{completed}<span> / {data.tasks.length}</span></strong><div className="progress-track"><div style={{ width: `${completed / data.tasks.length * 100}%` }} /></div><small>{Math.round(completed / data.tasks.length * 100)}% of tasks completed</small></div><div><p>In progress <span aria-hidden="true">↗</span></p><strong>{data.tasks.filter(t => t.status === "active").length}</strong><small>Tasks currently in progress</small></div><button onClick={() => navigate("Approvals")}><p>Pending approvals <span aria-hidden="true">↗</span></p><strong className="amber-number">{data.approvals.length}</strong><small>{data.approvals.length ? "Ready for your review" : "All demo decisions recorded"}</small></button><button onClick={() => { setFilter("blocked"); navigate("Work queue"); }}><p>Blocked <span aria-hidden="true">↗</span></p><strong>{blocked.length}</strong><small>Waiting on a dependency</small></button></div>
            <div className="workspace-grid"><div className="stack"><Panel title="Work in focus" action={<button className="text-button" onClick={() => navigate("Work queue")}>View queue →</button>}>{taskList(data.tasks.filter(t => t.status !== "completed"))}</Panel><Panel title="Latest activity" action={<button className="text-button" onClick={() => navigate("Audit")}>All activity →</button>}>{audit(3)}</Panel></div><div className="stack"><Panel title="Needs your attention" action={<span className="attention-count">{data.approvals.length}</span>}>{data.approvals.length ? <div className="attention"><span className="decision-icon" aria-hidden="true"><Icon view="Approvals" /></span><h3>Review preview merge</h3><p>A simulated request from Software Lead is ready for your review.</p><button className="button" onClick={() => navigate("Approvals")}>Review request <span aria-hidden="true">→</span></button></div> : <Empty title="Inbox clear">All decisions in this demo session are recorded.</Empty>}</Panel><Panel title="Active run" action={<Badge status="active" />}><div className="run-summary"><h3>Receipt page implementation</h3><p>Software Lead · SYN-RUN-002</p><div className="phase-track" aria-label="Run phases">{data.phases.map(phase => <span key={phase.title} className={phase.status} title={`${phase.title}: ${phase.status}`} />)}</div><div className="run-progress"><span>{data.phases.filter(phase => phase.status === "completed").length} of {data.phases.length} phases complete</span><span>Demo run</span></div><button className="text-button" onClick={() => navigate("Active run")}>View timeline →</button></div></Panel><p className="workspace-note"><Icon view="Approvals" />You stay in control of every decision.</p></div></div></>}
          {view === "Projects" && <Panel title="Projects" label="BOUNDED WORKSPACES">{data.projects.map(project => <div className="project-card" key={project.id}><div><p className="eyebrow">{project.id}</p><h3>{project.title}</h3><p>{project.workspaceRoot}</p><Badge status={project.status} /></div><div><strong>{completed} / {data.tasks.length}</strong><p>confirmed tasks complete</p><button className="button secondary" onClick={() => navigate("Work queue")}>Open project queue ↗</button></div></div>)}</Panel>}
          {view === "Work queue" && <Panel title="Project work" label="ONE OWNER PER TASK"><div className="filters"><label>Search work<input type="search" value={search} placeholder="Task, ID or owner…" onChange={event => setSearch(event.target.value)} /></label><label>Status<select value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All statuses</option>{["active", "blocked", "queued", "completed", "review"].map(status => <option key={status} value={status}>{status}</option>)}</select></label></div>{taskList(data.tasks.filter(t => (filter === "all" || t.status === filter) && `${t.id} ${t.title} ${t.owner}`.toLowerCase().includes(search.toLowerCase())))}</Panel>}
          {task && (view === "Overview" || view === "Work queue") && <section className="panel detail" aria-label="Task detail"><div className="panel-head"><h2>{task.id} · {task.title}</h2><button className="text-button" onClick={() => setSelected(null)}>Close detail</button></div><Badge status={task.status} /><dl><dt>Owner</dt><dd>{task.owner}</dd><dt>Reviewer</dt><dd>{task.reviewer}</dd><dt>Objective</dt><dd>{task.objective}</dd><dt>Acceptance criteria</dt><dd><ul>{task.acceptanceCriteria.map(item => <li key={item}>{item}</li>)}</ul></dd><dt>Evidence</dt><dd>{task.evidenceRefs.length ? task.evidenceRefs.map(id => <button className="text-button" key={id} onClick={() => { navigate("Evidence"); setSelectedEvidence(id); }}>{id} ↗ </button>) : "No evidence submitted yet"}</dd></dl>{task.status === "blocked" && <div className="blocked-note"><strong>Blocked by SYN-002</strong><p>Receipt implementation must produce evidence before the layout review can begin. Software Lead owns recovery.</p></div>}</section>}
          {view === "Active run" && <div className="workspace-grid"><Panel title="SYN-RUN-002" label="SYNTHETIC EXECUTION">{run()}</Panel><Panel title="Recovery & blockers" label="DEPENDENCIES"><div className="attention"><Badge status="blocked" /><h3>Receipt layout review is waiting</h3><p>SYN-003 depends on the SYN-002 implementation and its evidence. Software Lead owns the next step.</p><p>Recovery: finish implementation, attach test evidence, then request independent review.</p><button className="button secondary" onClick={() => { navigate("Work queue"); setSelected("SYN-003"); }}>Inspect blocked task ↗</button></div></Panel></div>}
          {view === "Approvals" && <Panel title="Decision inbox" label="REVIEW THE EXACT ACTION"><p className="panel-intro">These decisions are simulations. A real action would require an authenticated operator and a verified adapter receipt.</p>{data.approvals.length ? data.approvals.map(approval => <ApprovalCard key={approval.id} approval={approval} details={data.approvalDetails[approval.id as keyof typeof data.approvalDetails]} stale={query.isError || query.isFetching} onDecision={message => setNotice(message)} />) : <Empty title="No pending approvals">The demo decision is recorded in Audit. No external action was executed.</Empty>}</Panel>}
          {view === "Team" && <Panel title="Eight roles. One front door." label="ACCOUNTABLE OWNERSHIP"><div className="team-grid">{data.team.map(([name, scope, status], index) => <article className="team-card" key={name}><span className="avatar">{index === 0 ? "CO" : name.split(" ").map(word => word[0]).slice(0, 2).join("")}</span><h3>{name}</h3><p>{scope}</p><Badge status={status} /></article>)}</div></Panel>}
          {view === "Capabilities" && <Panel title="Capability registry" label="VERIFIED BOUNDARIES"><div className="capability-grid">{[["Factory Core", "Demo only", "Project, task and approval tRPC routers · ephemeral memory"], ["Coding execution", "Disconnected", "No T3 Code or provider connection in this application"], ["GitHub", "Disconnected", "No repository writes, merges or branch operations"], ["Publishing & spend", "Disabled", "Requires exact operator approval and a verified adapter"], ["PostgreSQL", "Disconnected", "Schema exists in Core; durable application wiring is pending"], ["Live operator identity", "Unavailable", "Authentication and authorization must be implemented before Live"]].map(([name, status, detail]) => <article className="team-card" key={name}><h3>{name}</h3><Badge status={status} /><p>{detail}</p></article>)}</div></Panel>}
          {view === "Evidence" && <Panel title="Evidence library" label="SOURCES OVER SUMMARIES"><p className="panel-intro">Every record below is a synthetic fixture, not proof of a live integration or an actual test run.</p>{data.evidence.map(item => <button className="evidence-row" key={item.id} onClick={() => setSelectedEvidence(item.id)}><span aria-hidden="true">▤</span><span><small>{item.id} · {item.kind}</small><strong>{item.title}</strong><small>{item.taskId} / {item.version}</small></span><span aria-hidden="true">↗</span></button>)}{artifact && <article className="evidence-detail"><h3>{artifact.title}</h3><p>{artifact.summary}</p><p className="muted">Source: bundled UI-001 synthetic fixture · {artifact.version}</p></article>}</Panel>}
          {view === "Audit" && <Panel title="Event ledger" label="SESSION AUDIT"><p className="panel-intro">Fixture timestamps and session decisions · displayed in Africa/Cairo. Demo records expire after one hour or a server restart.</p>{audit()}</Panel>}
          {view === "Improvements" && <Panel title="Improvement proposals" label="EVIDENCE BEFORE CHANGE"><Empty title="No proposals yet">Proposals need observed workflow evidence, expected benefit, risk, validation and rollback. This synthetic session has no historical sample.</Empty></Panel>}
          {view === "Settings" && <Panel title="Workspace settings" label="DEMO BOUNDARY"><dl className="settings-list"><dt>Environment</dt><dd><Badge status="Demo only" /></dd><dt>Data lifetime</dt><dd>In-memory, per browser session, one hour maximum. Restarting the server resets data.</dd><dt>Live mode</dt><dd>Unavailable. Requires authenticated operator roles, durable PostgreSQL storage and approved adapters.</dd><dt>Time zone</dt><dd>Africa/Cairo</dd><dt>External actions</dt><dd>Disabled. No credentials, client data or external execution adapters are loaded.</dd></dl></Panel>}
        </div>}
        <footer><span>FACTORY <span aria-hidden="true">/</span> CONTROL DESK</span><span>Evidence first. Human controlled.</span></footer>
      </main>
    </div>
  </div>;
}

function ApprovalCard({ approval, details, stale, onDecision }: { approval: Snapshot["approvals"][number]; details: Snapshot["approvalDetails"]["SYN-APR-001"]; stale: boolean; onDecision: (message: string) => void }) {
  const queryClient = useQueryClient();
  const [choice, setChoice] = useState<"approved" | "rejected" | null>(null);
  const [rationale, setRationale] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const mutation = useMutation({
    mutationFn: (status: "approved" | "rejected") => client.desk.decide.mutate({ id: "SYN-APR-001", version: "synthetic-commit-7c21e90", status, rationale }),
    onSuccess: async result => {
      onDecision(`Demo decision ${result.decision.status}. No external action executed. Session audit event: ${result.event.id}`);
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  return <article className="approval-card"><div className="approval-title"><div><p className="eyebrow">{approval.id} / {approval.taskId}</p><h3>Review synthetic preview merge</h3></div><Badge status={approval.status} /></div><dl><dt>Exact action</dt><dd><code>{approval.action}</code></dd><dt>Target</dt><dd>{details.target}</dd><dt>Version</dt><dd><code>{details.version}</code></dd><dt>Requested by</dt><dd>{approval.requester}</dd><dt>Evidence</dt><dd>{details.evidence.join(" · ")} (synthetic fixture records)</dd><dt>Blast radius</dt><dd>{approval.blastRadius}</dd><dt>Consequence</dt><dd>{details.consequence}</dd></dl>
    <div className="approval-actions"><button className="button" onClick={() => { setChoice("approved"); setConfirmed(false); }} disabled={mutation.isPending || stale}>Simulate approval</button><button className="button secondary" onClick={() => { setChoice("rejected"); setConfirmed(false); }} disabled={mutation.isPending || stale}>Simulate rejection</button></div>
    {choice && <form className="confirmation" onSubmit={event => { event.preventDefault(); if (confirmed && rationale.trim() && !stale) mutation.mutate(choice); }}><h4>Confirm simulated {choice === "approved" ? "approval" : "rejection"}</h4><label>Decision rationale<textarea required maxLength={500} value={rationale} onChange={event => setRationale(event.target.value)} placeholder="Explain your demo decision…" /></label><label className="checkbox-label"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} required />I reviewed the exact target, version and evidence. This is a demo decision only.</label><div className="approval-actions"><button className="button" type="submit" disabled={!confirmed || !rationale.trim() || mutation.isPending || stale}>{mutation.isPending ? "Recording…" : "Record demo decision"}</button><button className="text-button" type="button" disabled={mutation.isPending} onClick={() => setChoice(null)}>Cancel</button></div>{mutation.isError && <p role="alert" className="error-message">The decision could not be confirmed. Refresh the desk to check the session audit before retrying.</p>}</form>}
  </article>;
}
