# File & Folder Structure

```text
README.md — entry point
docs/ — system and operator docs
agents/ — role prompts + format
skills/ — reusable procedures + format
prompts/ — one-shot/Dot sources + format
templates/ — spec, ticket, handoff, result, review, brand, calendar, update, weekly review
schemas/ — JSON handoff/result contracts
work/clients/<client-id>/projects/<project-id>/features/<feature-id>/ — working artifacts
```

Authored sources are separate from operator work. Group source by artifact type, work by client/project/feature. Lowercase kebab-case, plural folders, stable noun filenames; feature folders use `YYYYMMDD-short-name`. Scratch stays outside canonical structure. Links are relative to source file. No misc/tmp/per-client system duplicates/log folders. Top-level folders stay fixed; contents grow.

## Related
- [Design](design-decisions.md)
- [Guide](operator-guide.md)
