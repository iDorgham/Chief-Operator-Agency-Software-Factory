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
