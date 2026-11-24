---
owner: Software Lead
status: canonical
task_id: T3-002
version: 1.0.0
last_reviewed: 2026-11-24
---

# T3 Code Project and Codex Thread Verification - 2026-11-24

## Task contract

- **Owner:** Software Lead
- **Approved inputs:** this repository, the installed T3 Code desktop application and CLI, the local Codex CLI, and read-only inspection of local configuration and logs
- **Acceptance criteria:** register this repository as a T3 Code project, run one harmless Codex thread against an isolated workspace, and show observable evidence that the thread started, stayed inside its exclusions and returned a result
- **Exclusions:** no GitHub write, merge, deploy, publish, spend, delete, credential creation or remote T3 Code exposure; the smoke thread may only read canonical files
- **Evidence:** T3 Code project register, thread records, provider logs and local sandbox reproductions recorded below

## Project registration

| Item | Observation | Status |
| --- | --- | --- |
| Project title | `Bots` | verified |
| Project id | `5b308c28-81b9-4965-91ea-4cd735e87926` | verified |
| Workspace root | `D:\Work\AI\Projects\bots` | verified |
| Repository identity | `github.com/iDorgham/Chief-Operator-Agency-Software-Factory` | verified |
| Registered at | 2026-11-24T00:20:01Z | verified |

Registration is complete. The repository was added without enabling remote access.

## Codex threads

| Thread | Provider/model | Workspace | Outcome |
| --- | --- | --- | --- |
| `743ec756-9705-42a0-ac93-17a1e678804c` (T3-002-SMOKE) | codex `gpt-6.1-sol`, `approval-required` | worktree `D:\worktrees\bots\t3-cbd23ef5-47942f4a9ca3ea80`, branch `t3/cbd23ef5` | thread completed; no file was read because every shell call failed with `CreateProcessAsUserW failed: 5 (Access is denied.)` |
| `mcp:48202f23-54bb-475e-acfe-181f4167def1` (T3-002-SMOKE-2) | codex `gpt-6.1-sol`, `approval-required` | worktree `D:\worktrees\bots\t3-2714d927-dfbbff20a6df10ab`, branch `t3/2714d927` | failed at start with "Usage limit reached - try again at 8:06 AM" |

Both threads stayed inside their exclusions: no edit, commit, push, PR, deploy, publish or network action occurred, and the approval card appeared before any command ran. The verification is still incomplete because neither thread could read a file.

## Root cause

Codex executes shell commands through its Windows restricted-token sandbox (`CreateProcessAsUserW`). This machine's only `pwsh` on `PATH` was the **Microsoft Store PowerShell Preview** package, whose App Execution Alias cannot be created under that restricted token. The failure is deterministic and reproduces without any model call:

| Reproduced with | Command | Result |
| --- | --- | --- |
| Store preview alias (what Codex resolved) | `codex sandbox -- pwsh -NoProfile -Command ...` | failed: `CreateProcessAsUserW failed: 5 (Access is denied.)` |
| Generic alias `...\WindowsApps\pwsh.exe` | `codex sandbox -- <alias> ...` | failed: same access-denied error |
| Package folder `C:\Program Files\WindowsApps\...` | `codex sandbox -- <package exe> ...` | failed: `Win32 error -1073283067` |
| Stable package alias `...\WindowsApps\Microsoft.PowerShell_8wekyb3d8bbwe\pwsh.exe` | `codex sandbox -- <alias> ...` | passed: ran |
| In-box Windows PowerShell 5.1 | `codex sandbox -- ...\v1.0\powershell.exe ...` | passed: ran, correct working directory |
| `windows.sandbox` alternatives | `-c windows.sandbox="none"` / `"elevated"` | rejected: only `elevated`, `unelevated`, `mxc` are accepted; `elevated` needs machine-wide accounts (`CreateProcessWithLogonW failed: 267`) |

Codex resolves a bare `pwsh` from `PATH`, so the fix is environmental rather than repository-side: give `pwsh` a non-alias target that comes first on `PATH`.

## Remedy applied

1. Installed PowerShell `7.7.0` (x64) as a portable, per-user build at `C:\Users\User\AppData\Local\Programs\PowerShell\7`. No MSI is published for `7.7.0`; the winget manifest ships only an MSIX bundle, which is the failing Store mechanism, so the official release zip was extracted instead. No administrator rights, no machine-wide accounts.
2. Prepended that directory to the **user** `PATH` so a bare `pwsh` resolves to the real executable ahead of the Store aliases. The previous value is backed up at `%TEMP%\pwsh7\user-path-before.txt`; rollback is restoring that value to `HKCU\Environment\Path`.
3. Verified with the real shell first on `PATH`: `codex sandbox -- pwsh -NoProfile -Command "..."` printed `7.7.0` and the smoke worktree as the working directory.

This changes the local machine configuration only. Nothing was written to this repository by either Codex thread.

## Remaining blockers

1. **T3 Code must be restarted.** Its cached shell environment (`~/.t3/userdata/shell-environment-cache.json`) still lists the Store preview alias first, so the running Codex provider would keep spawning the broken shell.
2. **Codex usage allowance is exhausted** until the window resets (reported as 08:06 on 2026-11-24). The in-thread re-run cannot happen before that.

## Remaining human actions

1. Restart T3 Code so the Codex provider inherits the updated `PATH`.
2. After the Codex usage window resets, re-run the T3-002 smoke thread read-only and attach the result to this document.
3. Optional cleanup: remove the PowerShell Preview Store package once the portable stable shell is confirmed working in threads.

## Re-verification - 2026-11-24 (read-only)

Re-checked the local state without any model call or external service:

| Check | Observation | Status |
| --- | --- | --- |
| Portable shell present | `C:\Users\User\AppData\Local\Programs\PowerShell\7\pwsh.exe` reports `7.7.0` | remedy holds |
| User `PATH` prepend | `HKCU\Environment\Path` begins with `C:\Users\User\AppData\Local\Programs\PowerShell\7` ahead of the `WindowsApps` aliases | remedy holds |
| T3 shell env cache | `~/.t3/userdata/shell-environment-cache.json` (mtime 2026-11-24 00:52) still lists `...\WindowsApps\Microsoft.PowerShellPreview_8wekyb3d8bbwe` first and does not contain the portable path | restart still pending |

Conclusion: the environmental remedy is intact, but blocker 1 is unresolved - T3 Code has not been restarted since the fix, so its Codex provider would still spawn the broken Store alias. The smoke re-run remains blocked on the human restart plus the Codex usage window; running the Codex thread also spends external quota and stays outside autonomous scope.

## Restart and shell-cache verification - 2026-11-24T04:40Z

T3 Code was restarted on operator instruction. All nine `T3 Code (Beta)` processes and the resource monitor were stopped, and the app was relaunched with a `PATH` composed from the registry (machine + user), so the new server inherits the portable PowerShell 7 directory ahead of the Store aliases. The server came back up (8 processes) and the `t3` CLI reached it (`t3 thread list` returned the Bots project threads).

The server regenerated `~/.t3/userdata/shell-environment-cache.json` at 04:40:15Z (pre-restart copy saved as `shell-environment-cache.pre-restart-20261124T043938Z.json.bak`):

| Check | Pre-restart | Post-restart |
| --- | --- | --- |
| Leading `PATH` entry | `...\WindowsApps\Microsoft.PowerShellPreview_8wekyb3d8bbwe` | `C:\Users\User\AppData\Local\Programs\PowerShell\7` (index 0) |
| Preview Store alias in `PATH` | present, first | absent |
| First `WindowsApps` entry index | 0 | 27 |

**Blocker 1 is cleared:** the restarted T3 Code server resolves a bare `pwsh` to the real 7.7.0, so its Codex provider will no longer spawn the broken Store alias.

**Blocker 2 still open:** the Codex usage window resets at 2026-11-24T06:06:24Z (the snoozed smoke-2 thread `mcp:48202f23-...` carries that `snoozedUntil`). At the time of this check (04:40Z) Codex is still rate-limited, so the end-to-end smoke thread - which must run a shell command through a Codex turn - cannot pass yet and is not attempted. It is primed to run after 06:06Z.

## Smoke thread re-run - 2026-11-24T06:08Z (PASS)

After the Codex usage window reset (06:06:24Z), a read-only Codex smoke thread was run against an isolated worktree. The shell fix is proven end-to-end.

| Item | Value |
| --- | --- |
| Thread | `mcp:86a00d59-2f7e-4370-aa40-d21a6336d1ea` (T3-002 smoke re-run) |
| Provider / model | codex `gpt-6.1-sol`, `approval-required` |
| Worktree / branch | `D:\worktrees\bots\t3-36189def-22fdb62001381f8f`, branch `t3/t3-002-smoke-rerun-readonly` |
| Prompt | read `AGENTS.md`, reply with only its first markdown heading; no writes, no network, no git writes |
| Outcome | `completed`; assistant returned `# Factory Repository Instructions` |

The returned line is the exact first heading of `AGENTS.md`, which the agent could obtain only by reading the file through a shell command that succeeded - the step that failed on every earlier thread with `CreateProcessAsUserW failed: 5 (Access is denied.)`. The thread stayed inside its exclusions: it ran in its own worktree, made no edit, commit, push or PR (pull request count 0), and performed no network action. This completes the T3-002 acceptance criteria: the repository is registered as a T3 Code project and a harmless Codex thread started, stayed read-only, and returned a correct result.

The activity trace also displayed two non-blocking startup warnings for optional MCP clients: `pencil` was missing its configured path and `byterover-mcp` closed during initialization. Neither client supplied evidence or affected the read-only result. The isolated branch `t3/t3-002-smoke-rerun-readonly` was independently checked with `git status --short --branch` and had no modified or untracked files.

Both earlier remedy blockers are now cleared: the portable PowerShell 7.7.0 + PATH remedy (verified), the T3 Code restart (verified via the regenerated shell cache), and the Codex quota window (passed). **T3-002 is complete.**
