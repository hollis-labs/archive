# CLI Spec

Status: pivot-aligned draft (Task 5)

## Binary
`contextd` (placeholder name)

## Global flags
- `--client-id <id>`: required for write/promote commands.
- `--output json|table` (default `json`).

## Commands

### `context namespace register`
Register namespace ownership policy.

Flags:
- `--namespace <value>`
- `--owner-type user|app`
- `--owner-id <value>`
- `--policy-file <path>`

### `context put`
Append a revision.

Flags:
- `--client-id <id>`
- `--actor user|app:<id>|system`
- `--namespace <value>`
- `--key <value>`
- `--json <payload-json>` or `--file <path>`

### `context get`
Get head revision.

Flags:
- `--namespace <value>`
- `--key <value>`

### `context history`
Read revision history.

Flags:
- `--namespace <value>`
- `--key <value>`
- `--limit <n>`
- `--cursor <value>`

### `context view`
Evaluate deterministic selector.

Flags:
- `--selector <json>` or `--selector-file <path>`
- `--include-payload`
- `--limit <n>`

### `context promote`
Promote record into protected `user/*`.

Flags:
- `--client-id <id>`
- `--actor user`
- `--from-namespace <value>`
- `--from-key <value>`
- `--to-namespace <user/ns>`
- `--to-key <value>`
- `--source-revision <n>` (optional)

## Deterministic CLI behavior
- Default output order follows API deterministic ordering guarantees.
- CLI commands perform no hidden retries that alter semantic ordering.
- Read/view commands are side-effect free.
