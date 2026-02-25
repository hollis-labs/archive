# Views Spec

Status: draft (Task 6)

## Definition
A View is a deterministic selector over context records. It returns a stable ordered set of matching revisions and does not transform payload semantics.

## Non-goal
Views are not processors. They do not summarize, infer, merge, or mutate records.

## Selector structure
```json
{
  "namespaces": ["user/*", "app/editor/*"],
  "keys": ["goal", "priority", "summary"],
  "tags_any": ["active", "session"],
  "revision_scope": "head|all",
  "order": ["namespace", "key", "revision"],
  "limit": 100
}
```

## Fields
- `namespaces`: optional glob-like namespace filters.
- `keys`: optional explicit key filter list.
- `tags_any`: optional metadata tag match (OR semantics).
- `revision_scope`:
  - `head`: return only current head per `(namespace,key)`.
  - `all`: return full history matches.
- `order`: explicit stable sort keys. Required for deterministic behavior.
- `limit`: optional bounded result size.

## Complexity guardrails (MVP)
- Max `namespaces` patterns: `32`
- Max `keys` entries: `128`
- `limit` behavior:
  - default when omitted/zero: `200`
  - maximum accepted: `500`
- `order` keys allowed: `namespace`, `key`, `revision` (no duplicates)

## Determinism rules
1. Selector parsing is pure and side-effect free.
2. Missing `order` defaults to `(namespace,key,revision)`.
3. Equivalent selector + identical store state => identical result ordering.
4. Limit truncation is applied after deterministic sort.

Normalization example:
```json
{
  "input_selector": {
    "namespaces": ["user/*"],
    "limit": 0
  },
  "normalized_selector": {
    "namespaces": ["user/*"],
    "revision_scope": "head",
    "order": ["namespace", "key", "revision"],
    "limit": 200
  }
}
```

Truncation example (deterministic):
```json
{
  "sorted_items": [
    {"namespace": "app/editor/session", "key": "goal", "revision": 1},
    {"namespace": "app/editor/session", "key": "summary", "revision": 1},
    {"namespace": "user/profile", "key": "goal", "revision": 3}
  ],
  "limit": 2,
  "returned_items": [
    {"namespace": "app/editor/session", "key": "goal", "revision": 1},
    {"namespace": "app/editor/session", "key": "summary", "revision": 1}
  ],
  "truncated": true
}
```

## Response envelope
- `items`: ordered record references (and payloads if requested)
- `evaluation_meta`:
  - `normalized_selector`
  - `sort_keys`
  - `matched_count`
  - `returned_count`
  - `truncated` (boolean)

## Validation rules
- Reject unknown selector fields.
- Reject non-deterministic order directives.
- Reject invalid namespace glob patterns.
- Reject negative limits.
- Reject limits above max bound.

Complexity rejection examples:
- Too many namespaces (max 32):
```json
{
  "selector": {
    "namespaces": ["user/*", "... more than 32 entries ..."],
    "order": ["namespace", "key", "revision"]
  }
}
```
- Too many keys (max 128):
```json
{
  "selector": {
    "keys": ["k1", "k2", "... more than 128 entries ..."],
    "order": ["namespace", "key", "revision"]
  }
}
```

## Selector extension and versioning policy

Current compatibility mode:
- Selector schema is strict by default.
- Unknown selector fields are rejected with `validation_error`.

Extension path for new fields:
1. Add field behind an explicit server capability gate.
2. Document normalization + determinism impact before enabling by default.
3. Keep default behavior stable for clients that only send existing fields.
4. Promote field to baseline only after API/CLI docs and contract tests are updated.

Versioning expectations:
- MVP operates under an implicit `v1` selector contract.
- Future breaking selector changes require an explicit version key or endpoint version bump.
- Additive, non-breaking fields may be introduced only when strict unknown-field behavior can still be preserved for non-opted-in clients.

Deprecation policy:
- Deprecated selector fields remain accepted for at least one documented release window.
- During deprecation, normalization must map deprecated inputs to canonical equivalents without changing result ordering semantics.
- Removal of deprecated fields is treated as a breaking change and requires explicit version transition notes.

## Selector capability discovery model

Discovery approach (current):
- Capability negotiation is documentation-driven in MVP.
- Clients should assume support only for fields listed in this spec and corresponding API/MCP docs.
- Unknown selector fields remain hard errors (`validation_error`) when capability is not explicitly documented/supported.

Integration notes:
- API callers: see `docs/SPECS/API.md` `POST /v1/views/evaluate` validation notes.
- MCP callers: adapter/tool metadata should expose supported selector capabilities for the active phase while preserving strict unknown-field handling.

Future extension option:
- A runtime capability descriptor may be added later, but must be additive and must not relax deterministic validation behavior for unsupported fields.

## CLI/API mapping
- API: `POST /v1/views/evaluate`
- CLI: `context view --selector ...`
