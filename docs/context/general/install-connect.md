# Install & Connect

Use the [Codex Master Prompt](../prompts/CODEX_MASTER_PROMPT.md) from Codex running on Dorgham’s PC. This starter pack is not a remote installer and does not configure accounts by itself.

## Safe order

1. Confirm the intended PC folder/repository, Git status/remotes and backup. Preserve existing work; stop if the target is unclear.
2. Inventory installed tools and actual sign-in/model-selector state for OpenBot, Codex, Claude Code, OpenCode, Copilot, Qoder, Kilo, Antigravity and T3 Code. Do not expose credentials.
3. Check current OpenBot commercial-use terms and provider privacy/data handling before client or agency content is sent. Use synthetic data until resolved.
4. Create/verify the canonical local folder and keep `agents/`, `skills/`, `prompts/`, `templates/`, `schemas/`, `settings/` and `work/` versioned. Put secrets in the supported credential manager only.
5. Start with local file handoffs. Import only a few weekly roles into OpenBot if supported; keep project files as source of truth.
6. Run one synthetic client and one harmless test repository/worktree round-trip: brief/spec → approved handoff → one implementation result → evidence-based review → recorded approval decision → retro proposal. Do not merge, publish or send externally during setup.
7. Connect GitHub only after the operator confirms the intended repository and least-privilege access. Verify a read-only identity/status request before enabling writes.
8. Add analytics, content publishing or ad integrations only when Dorgham uses them, access is supported and the exact scope is approved.

## Model check

Use the live signed-in selector as the authority. Record product/version, provider, displayed model name, cost/usage indication and test outcome. Do not assume subscription quotas, API access or commercial rights. Use one implementer per code task; provider fallback must be intentional and documented. See [Tool Stack and Model Routing](tool-stack-and-model-routing.md).

## Ready-to-use checklist

- [ ] Intended local repo/folder and backup confirmed.
- [ ] User changes preserved; target branch and remote recorded.
- [ ] OpenBot commercial terms and provider privacy/client-data conditions checked.
- [ ] Models/tools marked verified, unavailable, unknown or requiring operator action.
- [ ] Synthetic brief/spec/handoff/result/review/retro round-trip completed.
- [ ] Demo is visibly distinct from live; no fake connection or analytics values.
- [ ] No credentials in source, prompts, dashboard browser storage or logs.
- [ ] No PR merge, branch deletion, public post, client message, ad spend or deployment occurred without explicit approval.

If an integration is unsupported or login is unavailable, keep the system useful through documented file handoffs and manual checklists. Do not fake successful configuration.

## Related

- [Operator Guide](operator-guide.md)
- [Tool Stack and Model Routing](tool-stack-and-model-routing.md)
- [Architecture](architecture.md)
