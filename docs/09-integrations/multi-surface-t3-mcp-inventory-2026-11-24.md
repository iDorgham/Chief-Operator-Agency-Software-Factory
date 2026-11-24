---
owner: Chief Operator
status: canonical
task_id: MCP-001
version: 1.1.0
last_reviewed: 2026-11-24
---

# Multi-Surface T3 MCP Inventory & Verification Evidence - 2026-11-24

## Executive Summary

As part of **MCP-001** (Validate and harden T3 MCP across Codex, Claude, and OpenBot.run), this document records the read-only inventory, provider capabilities, registered projects, and synthetic verification evidence across all operational surfaces following [multi-surface-t3-mcp-plan.md](multi-surface-t3-mcp-plan.md).

All verification steps followed strict synthetic constraints: isolated worktrees, zero file modifications, zero commits/pushes/deletions, zero credential changes, and zero unauthorized external calls.

---

## 1. Environment & T3 Control Plane Status

- **Environment ID:** `1bc12716-e6c9-4c15-8d6b-2abde25d1e1f`
- **Host / Node:** `DESKTOP-QIOT9AT` (Windows x64)
- **T3 Server Version:** `0.1.11`
- **Remote / Linked Environments:** None (`links: []`). Local control plane only; no remote exposure.
- **Repository Project:**
  - **Title:** `Bots`
  - **Project ID:** `5b308c28-81b9-4965-91ea-4cd735e87926`
  - **Workspace Root:** `D:\Work\AI\Projects\bots`
  - **Git Remote:** `github.com/iDorgham/Chief-Operator-Agency-Software-Factory`
  - **Status:** Verified and registered.

---

## 2. Active Provider Capabilities on Local T3 Control Plane

Inspected via `orchestrator_capabilities`:

| Provider Instance | Driver Kind | Status / Child Task Capability | Available Models (Sample) |
| :--- | :--- | :--- | :--- |
| `codex` | `codex` | Enabled (`canRunChildTask: true`, `canRunCrossProviderChildTask: true`) | `gpt-6.2-sol`, `gpt-6.2-astra`, `gpt-6.1-terra`, `gpt-6.1-sol`, `gpt-6-astra`, `gpt-6-luna` |
| `claudeAgent` | `claudeAgent` | Enabled (`canRunChildTask: true`, `canRunCrossProviderChildTask: true`) | `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-fable-5-2`, `claude-haiku-5-5` |
| `opencode` | `opencode` | Enabled (`canRunChildTask: true`, `canRunCrossProviderChildTask: true`) | `opencode/beam-free`, `opencode/deepseek-v4.1-flash-free`, etc. |
| `antigravity` | `antigravity` | Enabled (`canRunChildTask: true`, `canRunCrossProviderChildTask: true`) | `gemini-3.8-flash`, `claude-sonnet-4-6`, `claude-opus-4-6-thinking`, `gpt-oss-120b-medium` |
| `acpRegistry_qoder_cli` | `acpRegistry` | Enabled (`canRunChildTask: true`) | `default` |
| `cursor`, `grok`, `fx`, `kiro`, `muse`, `pi` | various | **Disabled** | N/A |

---

## 3. Surface Verification & Promotion Matrix

Following the verification sequence in [multi-surface-t3-mcp-plan.md](multi-surface-t3-mcp-plan.md):

| Surface | Assigned Lane | Verified Thread / Evidence | Status | Verification Summary |
| :--- | :--- | :--- | :--- | :--- |
| **Codex** | Primary Implementer | `[T3-002 smoke re-run](t3-thread://v2/1bc12716-e6c9-4c15-8d6b-2abde25d1e1f/mcp:86a00d59-2f7e-4370-aa40-d21a6336d1ea)` | **Validated** | Read `AGENTS.md` in isolated worktree `D:\worktrees\bots\t3-36189def...`. Returned exact top heading `# Factory Repository Instructions`. Windows restricted-token sandbox resolution validated. Zero modified files. |
| **Claude** | Independent Reviewer | `[MCP-001 Claude review lane synthetic verification](t3-thread://v2/1bc12716-e6c9-4c15-8d6b-2abde25d1e1f/mcp:9d217eee-d0bc-4c90-abb2-61796008d739)` | **Validated** | Ran `claudeAgent` (`claude-sonnet-5-5`) in isolated worktree `D:\worktrees\bots\t3-claude-smoke-readonl-798a3c19d1eb3163` on branch `t3/claude-smoke-readonly`. Read `AGENTS.md` and returned `# Factory Repository Instructions`. Worktree status checked clean (`git status --short --branch` clean). Zero unauthorized writes or network calls. |
| **OpenBot.run** | Organization Orchestrator | Local CLI / Agent audit (`docs/09-integrations/openbot-chief-operator-verification-2026-11-24.md`) | **Audited (Orchestrator Lane)** | OpenBot runtime version 1.5.0-beta.18 verified. Chief Operator agent imported. Boundary rules and task contracts established. Does not execute concurrent code implementations. Commercial operations gated on LIC-001. |

---

## 4. Role Boundaries & Steady-State Least Privilege

1. **Codex:** Primary implementer. Bounded strictly to one task scope in one isolated git worktree at a time.
2. **Claude:** Independent reviewer. Read-only review lane; alternate implementer only after formal reassignment.
3. **OpenBot.run:** Orchestrator. Manages workflows, queue, schedules, and team roster; must not initiate concurrent conflicting code edits.
4. **Hard Invariants Verified:**
   - No autonomous merge, push to production, or deployment.
   - No destructive file operations or git branch deletions.
   - No credential manipulation or unapproved external network requests.
