"""Structural validation for factory contracts and cross-references.

Checks:
  1. Every schemas/*.schema.json is a valid Draft 2020-12 JSON Schema.
  2. Every fixtures/contracts/valid/<schema>.*.json validates against its schema,
     and every fixtures/contracts/invalid/<schema>.*.json is rejected by it.
  3. Every schema has at least one valid fixture.
  4. openbot/team-manifest.yaml role sources exist and channel members are declared roles.
  5. Skills named in agents/*/AGENT.md "## Skills" sections exist as packages.
  6. Archive SHA256SUMS entries match file content at the baseline commit.

Exit code 0 on success, 1 on any failure. Requires: jsonschema, PyYAML, git.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASELINE_COMMIT = "e31ed81"
ARCHIVE_SUMS = ROOT / "archive" / "2026-11-24-pre-rebuild" / "SHA256SUMS"

failures: list[str] = []


def fail(message: str) -> None:
    failures.append(message)


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def check_schemas_and_fixtures(jsonschema) -> None:
    validator_cls = jsonschema.Draft202012Validator
    format_checker = validator_cls.FORMAT_CHECKER
    schemas: dict[str, dict] = {}

    for path in sorted((ROOT / "schemas").glob("*.schema.json")):
        name = path.name.removesuffix(".schema.json")
        try:
            schema = json.loads(path.read_text(encoding="utf-8"))
            validator_cls.check_schema(schema)
            schemas[name] = schema
        except Exception as exc:  # noqa: BLE001 - report every failure kind
            fail(f"Invalid JSON Schema {rel(path)}: {exc}")

    covered: set[str] = set()
    for expectation in ("valid", "invalid"):
        for path in sorted((ROOT / "fixtures" / "contracts" / expectation).glob("*.json")):
            name = path.name.split(".", 1)[0]
            schema = schemas.get(name)
            if schema is None:
                fail(f"Fixture {rel(path)} names unknown schema '{name}'")
                continue
            try:
                instance = json.loads(path.read_text(encoding="utf-8"))
            except json.JSONDecodeError as exc:
                fail(f"Fixture {rel(path)} is not valid JSON: {exc}")
                continue
            errors = list(validator_cls(schema, format_checker=format_checker).iter_errors(instance))
            if expectation == "valid":
                covered.add(name)
                for error in errors:
                    fail(f"Valid fixture rejected {rel(path)}: {error.message}")
            elif not errors:
                fail(f"Invalid fixture accepted {rel(path)}")

    for name in sorted(set(schemas) - covered):
        fail(f"Schema '{name}' has no valid fixture in fixtures/contracts/valid/")


def check_manifest(yaml) -> None:
    path = ROOT / "openbot" / "team-manifest.yaml"
    manifest = yaml.safe_load(path.read_text(encoding="utf-8"))
    role_ids = set()
    for role in manifest.get("roles", []):
        role_ids.add(role["id"])
        if not (ROOT / role["source"]).is_file():
            fail(f"Manifest role '{role['id']}' source missing: {role['source']}")
    if manifest.get("front_door") not in role_ids:
        fail("Manifest front_door is not a declared role")
    for channel in manifest.get("channels", []):
        for member in channel.get("members", []):
            if member not in role_ids:
                fail(f"Manifest channel '{channel['id']}' member '{member}' is not a declared role")
    agent_dirs = {p.parent.name for p in (ROOT / "agents").glob("*/AGENT.md")}
    if agent_dirs != role_ids:
        fail(f"Manifest roles {sorted(role_ids)} differ from agents/ {sorted(agent_dirs)}")


def check_agent_skill_refs() -> None:
    packages = {p.parent.name for p in (ROOT / "skills").glob("*/SKILL.md")}
    packages |= {p.parent.name for p in (ROOT / ".agents" / "skills").glob("*/SKILL.md")}
    for agent in sorted((ROOT / "agents").glob("*/AGENT.md")):
        match = re.search(r"^## Skills\s*\n(.*?)(?=^## |\Z)", agent.read_text(encoding="utf-8"), re.M | re.S)
        if not match:
            continue
        for ref in re.findall(r"\b[a-z0-9]+(?:-[a-z0-9]+)+\b", match.group(1)):
            if ref not in packages:
                fail(f"{rel(agent)} references unknown skill '{ref}'")


def check_archive_hashes() -> None:
    lines = [line for line in ARCHIVE_SUMS.read_text(encoding="utf-8").splitlines() if line.strip()]
    if not lines:
        fail("Archive SHA256SUMS is empty")
        return
    for line in lines:
        digest, _, path = line.partition("  ")
        try:
            blob = subprocess.run(
                ["git", "-C", str(ROOT), "show", f"{BASELINE_COMMIT}:{path}"],
                check=True,
                capture_output=True,
            ).stdout
        except subprocess.CalledProcessError:
            fail(f"Archive entry missing at {BASELINE_COMMIT}: {path}")
            continue
        # SHA256SUMS was generated from a Windows checkout (core.autocrlf=true), so
        # text files were hashed with CRLF line endings. Accept either form.
        crlf = blob.replace(b"\r\n", b"\n").replace(b"\n", b"\r\n")
        if digest not in {hashlib.sha256(blob).hexdigest(), hashlib.sha256(crlf).hexdigest()}:
            fail(f"Archive hash mismatch at {BASELINE_COMMIT}: {path}")
    print(f"Archive: {len(lines)} SHA-256 entries checked against {BASELINE_COMMIT}.")


def main() -> int:
    try:
        import jsonschema
        import yaml
    except ImportError as exc:
        print(f"Missing dependency: {exc}. Install with: python -m pip install jsonschema pyyaml", file=sys.stderr)
        return 1

    check_schemas_and_fixtures(jsonschema)
    check_manifest(yaml)
    check_agent_skill_refs()
    check_archive_hashes()

    if failures:
        for message in failures:
            print(f"FAIL: {message}", file=sys.stderr)
        return 1
    print("Contract validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
