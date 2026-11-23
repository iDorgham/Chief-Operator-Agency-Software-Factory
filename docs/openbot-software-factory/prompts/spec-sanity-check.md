# Prompt: Spec Sanity Check

## Use with
ChatGPT Dot

## Variables
{{spec_text}}, {{feature_context}}

## Tier and token estimate
Tier 0; <1k tokens excluding supplied context.

## Prompt body
```text
Review {{spec_text}} for ambiguity, missing testable criteria, dependencies and scope creep in context {{feature_context}}. Do not invent requirements. Return blockers, questions, observations.
```

## Expected output
Blockers/questions/observations.

## Notes
Draft/check only. Operator reviews; do not include unrelated client data.

## Related
- [Format](00-FORMAT.md)
- [Dots](../docs/dots.md)
