---
owner: Chief Operator
status: canonical
task_id: OB-001
version: 1.0.0
last_reviewed: 2026-11-24
---

# OpenBot Live Capability Audit — 2026-11-24

## Task contract

- **Owner:** Chief Operator
- **Approved inputs:** the installed OpenBot desktop application, its read-only settings and provider status, and OpenBot's official terms, pricing, commercial-license and privacy pages
- **Acceptance criteria:** record the installed version, update track, account and server status, provider availability, license status, storage/data behavior, permissions and Marketplace behavior; identify discrepancies and exact human actions
- **Exclusions:** no purchase, license activation, provider connection, invitation, publication, update, server-plan change, credential creation or external message
- **Evidence:** live OpenBot UI observations and the official pages linked below

## Observed state

| Area | Observation | Status |
| --- | --- | --- |
| Desktop version | OpenBot `0.76.1`, Stable track; `0.77.0` was offered as a staged update | verified; update not installed |
| Account | One signed-in owner account | verified |
| Server | Local server named `OpenBot`; reachable online but restricted to invited sign-ins | verified |
| Hosted plan | No hosted server plan | verified |
| Membership | One owner; no pending invitations observed | verified |
| Providers | ChatGPT, Claude and Gemini signed in; OpenCode, Cline, OpenRouter, GitHub Copilot and Mistral available locally | verified |
| Default provider | Claude | verified |
| Usage at audit time | Claude five-hour allowance exhausted; ChatGPT and Gemini available | transient observation |
| Storage | Customer workspace data measured on this computer; 3.4 GB total, including 12.2 MB chat history and 131 KB agent workspaces | verified |
| Remote desktop | Host component installed; unattended access unavailable; zero active sessions | verified |
| Marketplace | Global catalog exposes connect actions; GitHub is connected and Slack needs attention; no per-agent application disable control was visible | verified limitation |
| Chief Operator | Workspace-only access; Computer Use off; local scripts off; explicit instruction boundary prohibits tools and connected apps unless exactly authorised | verified |

## License decision

The account billing screen showed **Personal use — Current** and described it as free for noncommercial use. It also advertised commercial licenses as free until **December 1, 2026**, with a **Buy a license** action.

OpenBot's official terms state that commercial use requires a valid Commercial License. The official pricing page lists commercial Starter and Team licenses and labels the license promotion free until December 1, 2026. The promotional price does not itself prove that this account has activated a valid commercial license.

**Decision:** synthetic evaluation and personal/noncommercial configuration may continue. Client work, company work and other commercial use remain blocked until the operator explicitly activates the appropriate commercial license and the Billing screen shows it as current. For the current one-human-user factory, the recommended target is the one-seat Starter License; AI agents do not count as Seats. A hosted server subscription is separate and is not needed for the current local setup.

## Data-policy decision

OpenBot's privacy policy states that Customer Data is stored on the computer or server running OpenBot rather than in its central account database. Data needed for a requested task may still be sent to the selected AI provider or connected application. Changing an agent's provider may transmit relevant conversation history and saved context to the newly selected provider.

The current local storage observation is consistent with that policy. It does not remove the need to review each provider's terms before using personal, confidential or client data.

## Official evidence

- [OpenBot Terms & Conditions](https://openbot.run/terms)
- [OpenBot pricing](https://openbot.run/pricing)
- [OpenBot Commercial License Agreement](https://openbot.run/commercial-license)
- [OpenBot Privacy Policy](https://openbot.run/privacy)

## Remaining human actions

1. Complete `LIC-001`: preview the final Starter License checkout price, renewal period, tax and effective date; obtain exact operator approval for that purchase; activate it; then verify that Billing reports it as current. If another human user will sign in, reassess the Team License instead.
2. Decide whether the staged `0.77.0` update should be installed; do not update during active agent work without a rollback window.
3. Review or disconnect the globally connected GitHub application before any client repository is introduced.
4. Resolve or disconnect the Slack connection marked **Needs attention**.
5. Keep real client and personal data out of tests until provider-specific privacy, retention and commercial-use terms are approved.
