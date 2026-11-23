# Contract Fixtures

Synthetic, fictional instances of the JSON Schemas in [`schemas/`](../../schemas). They contain no real client data.

- `valid/<schema>.<case>.json` must validate against `schemas/<schema>.schema.json`.
- `invalid/<schema>.<case>.json` must be rejected; each one encodes a governance invariant (for example, an approval with no recorded decider, a self-review, a wildcard client memory scope, or a task without acceptance criteria).

Every schema needs at least one valid fixture. [`scripts/validate_contracts.py`](../../scripts/validate_contracts.py) enforces all of this and runs as part of [`scripts/validate-factory.ps1`](../../scripts/validate-factory.ps1).
