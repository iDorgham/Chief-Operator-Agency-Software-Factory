# Prompt: Brand Voice Check

## Use with
ChatGPT Dot

## Variables
{{approved_brand_brief}}, {{draft_copy}}

## Tier and token estimate
Tier 0; <1k tokens excluding supplied context.

## Prompt body
```text
Compare {{draft_copy}} to approved brief {{approved_brand_brief}}. Quote mismatches, suggest minimal edits, flag claims needing verification; do not add facts.
```

## Expected output
Mismatches, edits, fact flags.

## Notes
Draft/check only. Operator reviews; do not include unrelated client data.

## Related
- [Format](00-FORMAT.md)
- [Dots](../docs/dots.md)
