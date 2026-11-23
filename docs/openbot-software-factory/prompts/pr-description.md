# Prompt: Pr Description

## Use with
T3 thread | Codex task

## Variables
{{task_id}}, {{spec_version}}, {{changes}}, {{tests_run}}, {{limitations}}

## Tier and token estimate
Tier 0; <1k tokens excluding supplied context.

## Prompt body
```text
Write a factual PR description for {{task_id}} / {{spec_version}}. Changes: {{changes}}. Actual tests: {{tests_run}}. Limitations: {{limitations}}. Do not claim unrun tests.
```

## Expected output
Summary, changes, tests, limitations.

## Notes
Draft/check only. Operator reviews; do not include unrelated client data.

## Related
- [Format](00-FORMAT.md)
- [Dots](../docs/dots.md)
