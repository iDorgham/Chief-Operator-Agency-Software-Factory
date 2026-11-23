# Prompt: Mobile Client Reply

## Use with
ChatGPT Dot

## Variables
{{client_name}}, {{approved_context}}, {{incoming_message}}, {{tone}}

## Tier and token estimate
Tier 0; <1k tokens excluding supplied context.

## Prompt body
```text
Draft a concise reply to {{incoming_message}} for {{client_name}} using only {{approved_context}} in {{tone}} tone. Do not send or promise dates, prices, scope or outcomes. List missing facts under Operator check.
```

## Expected output
Reply draft and operator checks.

## Notes
Draft/check only. Operator reviews; do not include unrelated client data.

## Related
- [Format](00-FORMAT.md)
- [Dots](../docs/dots.md)
