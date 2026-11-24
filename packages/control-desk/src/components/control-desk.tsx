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
const marks = ["◈", "▣", "≡", "↗", "◇", "◎", "⌘", "▤", "≋", "+", "⚙"];
const client = createTRPCClient<DeskRouter>({ links: [httpLink({ url: "/api/trpc" })] });
const queryKey = ["demo-desk"];

function Badge({ status }: { status: string }) {
  return <span className={`badge ${status.toLowerCase().replaceAll(" ", "-")}`}><span aria-hidden="true">{status.toLowerCase() === "blocked" ? "!" : "•"}</span> {status.replaceAll("_", " ")}</span>;
}
function Empty({ title, children }: { title: string; children?: React.ReactNode }) {
  return <div className="empty"><span aria-hidden="true">◇</span><h3>{title}</h3>{children && <p>{children}</p>}</div>;
}
function Panel({ title, label, children, action }: { title: string; label?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="panel"><div className="panel-head"><div>{label && <p className="eyebrow">{label}</p>}<h2>{title}</h2></div>{action}</div>{children}</section>;
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
    setView(next); setSelected(null); setSelectedEvidence(null); setNotice("");
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
    <aside className="sidebar"><div className="brand"><span className="brand-mark" aria-hidden="true">f<span>·</span></span><div>Factory<small>CONTROL DESK</small></div></div><p className="nav-label">WORKSPACE</p><nav aria-label="Workspace">{views.map((item, index) => <button key={item} className={`nav-item ${view === item ? "current" : ""}`} aria-current={view === item ? "page" : undefined} onClick={() => navigate(item)}><span className="nav-icon" aria-hidden="true">{marks[index]}</span>{item}{item === "Approvals" && !!data?.approvals.length && <span className="nav-count">{data.approvals.length}</span>}</button>)}</nav><div className="sidebar-bottom"><span className="avatar">CO</span><div><strong>Chief Operator</strong><small>Single front door</small></div><span aria-hidden="true">↗</span></div></aside>
    <div className="main-shell"><header className="topbar"><div className="breadcrumb">Workspace <span aria-hidden="true">/</span> <strong>Factory demonstration</strong></div><div className="mode-switch" aria-label="Environment"><span className="demo-indicator">● Demo</span><button disabled title="Live requires authentication, durable storage and approved adapters">Live <span aria-hidden="true">⌑</span></button></div></header>
      <div className="demo-banner"><span aria-hidden="true">◇</span><span><strong>Synthetic workspace.</strong> Explore the workflow safely. Decisions are simulated; no external actions run.</span><span className="banner-meta">DEMO / SESSION ONLY</span></div>
      <main id="workspace" tabIndex={-1}><div className="page-heading"><div><p className="eyebrow">OPERATOR WORKSPACE <span>/ 01</span></p><h1 ref={titleRef} tabIndex={-1}>{view === "Overview" ? "Your factory, at a glance." : view}</h1><p>{view === "Overview" ? "One front door. Clear ownership. Evidence at every step." : "Factory demonstration / synthetic records"}</p></div><button className="button secondary refresh" onClick={() => void query.refetch()} disabled={query.isFetching}><span aria-hidden="true">↻</span> {query.isFetching ? "Refreshing…" : "Refresh desk"}</button></div>
        {notice && <div className="notice" role="status">{notice}</div>}
        {query.isPending && <section className="panel loading" role="status"><div className="skeleton" /><h2>Loading your demo workspace…</h2><p>Reading project, task and approval records.</p></section>}
        {query.isError && <section className="panel error" role="alert"><h2>The desk could not refresh.</h2><p>{data ? "Previously loaded data is shown below. Refresh before making a decision." : "The demo service is unavailable. Your request has not been treated as successful."}</p><button className="button" onClick={() => void query.refetch()}>Try again</button></section>}
        {data && <>
          {view === "Overview" && <><div className="metrics"><div><p>Confirmed work</p><strong>{completed}<span> / {data.tasks.length}</span></strong><div className="progress-track"><div style={{ width: `${completed / data.tasks.length * 100}%` }} /></div><small>{Math.round(completed / data.tasks.length * 100)}% of tasks completed</small></div><div><p>In motion <span aria-hidden="true">↗</span></p><strong>{data.tasks.filter(t => t.status === "active").length.toString().padStart(2, "0")}</strong><small>One accountable owner per task</small></div><button onClick={() => navigate("Approvals")}><p>Needs your decision <span aria-hidden="true">↗</span></p><strong className="amber-number">{data.approvals.length.toString().padStart(2, "0")}</strong><small>{data.approvals.length ? "Exact approval awaiting review" : "All demo decisions recorded"}</small></button><button onClick={() => { setFilter("blocked"); navigate("Work queue"); }}><p>Blocked <span aria-hidden="true">↗</span></p><strong>{blocked.length.toString().padStart(2, "0")}</strong><small>Waiting on a dependency</small></button></div>
            <div className="workspace-grid"><div className="stack"><Panel title="Work in focus" label="THE QUEUE" action={<button className="text-button" onClick={() => navigate("Work queue")}>View queue ↗</button>}>{taskList(data.tasks.filter(t => t.status !== "completed"))}</Panel><Panel title="Latest activity" label="AUDIT TRAIL" action={<button className="text-button" onClick={() => navigate("Audit")}>All events ↗</button>}>{audit(3)}</Panel></div><div className="stack"><Panel title="One decision to move forward" label="OPERATOR ATTENTION">{data.approvals.length ? <div className="attention"><Badge status="pending" /><h3>Review synthetic preview merge</h3><p>Software Lead has requested a bounded decision. Inspect the version, evidence and consequences first.</p><button className="button" onClick={() => navigate("Approvals")}>Review request <span aria-hidden="true">↗</span></button></div> : <Empty title="Inbox clear">All decisions in this demo session are recorded.</Empty>}</Panel><Panel title="Active run" label="EXECUTION">{run()}</Panel></div></div></>}
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
        </>}
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
