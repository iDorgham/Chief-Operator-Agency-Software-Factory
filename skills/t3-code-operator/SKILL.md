---
name: t3-code-operator
description: Configure, inspect, or use T3 Code as the local control plane for Codex, Claude Code, OpenCode, and other coding agents; use for projects, threads, workspaces, approvals, pairing, service status, or troubleshooting, not for the T3 web stack.
---

# T3 Code Operator

Treat T3 Code as a coding-agent control plane, not a model, business orchestrator or application framework.

Use `https://t3.codes/` as the canonical public product site. Do not download installers from lookalike domains.

1. Inspect `t3 --version`, `t3 status`, managed policy and the intended project/repository before changes.
2. Start local-only/loopback by default. Do not enable LAN, Tailscale, pairing or background service without user intent and a reviewed trust boundary.
3. Create one thread/workspace per bounded coding task. Do not run competing implementers on overlapping files.
4. Require the selected agent to read repository instructions, approved specification/handoff and verification commands.
5. Use Codex as the default implementer; Claude Code may be an alternative or independent reviewer; OpenCode is a fallback only after runtime/provider readiness is verified.
6. Inspect actual diffs, tests and result artifacts. T3 Code session success is not proof of CI, merge or deployment.
7. Return evidence to the Chief Operator/OpenBot workflow. Keep merge, deployment and destructive actions behind exact operator approval.
8. If a thread/action is interrupted, reconcile Git workspace and agent state before retrying.

For this factory's division of responsibility, read `docs/09-integrations/openbot-and-t3-code.md`.

