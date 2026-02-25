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

Determinism anti-patterns:
- Anti-pattern: relying on implicit result order when selector order keys are omitted in client expectations.
  - Recommendation: always reason against canonical fallback `(namespace,key,revision)` or provide explicit `order`.
- Anti-pattern: sending unbounded broad selectors in automation and assuming stable subset sampling.
  - Recommendation: set explicit `limit` and deterministic `order`, then paginate/iterate deterministically.
- Anti-pattern: mixing unsupported/unknown selector fields and treating failures as transient.
  - Recommendation: negotiate supported fields via documented capability model and treat `validation_error` as schema mismatch.

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

`tags_any` selector example:
```json
{
  "selector": {
    "namespaces": ["app/editor/*", "user/*"],
    "tags_any": ["active", "session"],
    "revision_scope": "head",
    "order": ["namespace", "key", "revision"],
    "limit": 100
  }
}
```

`revision_scope=all` selector example:
```json
{
  "selector": {
    "namespaces": ["app/editor/session"],
    "keys": ["summary"],
    "revision_scope": "all",
    "order": ["namespace", "key", "revision"],
    "limit": 50
  }
}
```

`revision_scope=all` result semantics:
- Includes every matching revision in deterministic revision order for each `(namespace,key)`.
- Does not collapse to heads; use `revision_scope=head` for current-head-only results.

## Example naming/style conventions

- Valid examples:
  - Use labels ending in `selector example` (for example: `` `tags_any` selector example ``).
  - Show only supported fields unless demonstrating fallback behavior explicitly.
  - Include deterministic cues (`order`, `limit`, `revision_scope`) when behavior depends on them.
- Invalid examples:
  - Prefix with `Invalid ...` and include expected failure class (for example: `Invalid selector examples (400 validation_error)`).
  - Keep examples minimal and focused on one failing constraint per block.
- Formatting:
  - Prefer compact JSON blocks with stable key ordering for readability.
  - Place explanatory semantics immediately below the example when interpretation is non-obvious.

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

Deprecation normalization examples:
- Deprecated field accepted during release window:
```json
{
  "input_selector": {
    "namespaces": ["user/*"],
    "sort": ["namespace", "key", "revision"],
    "revision_scope": "head"
  },
  "normalized_selector": {
    "namespaces": ["user/*"],
    "order": ["namespace", "key", "revision"],
    "revision_scope": "head",
    "limit": 200
  },
  "deprecation_note": "`sort` is deprecated and normalized to canonical `order`"
}
```
- Ordering remains stable after normalization:
```json
{
  "input_ordering_field": "sort",
  "normalized_ordering_field": "order",
  "ordering_guarantee": "result ordering remains `(namespace,key,revision)` for equivalent selector intent"
}
```

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

Compatibility examples:
- Additive rollout (supported capability):
```json
{
  "selector": {
    "namespaces": ["app/editor/*"],
    "order": ["namespace", "key", "revision"],
    "tags_all": ["active", "session"]
  },
  "assumption": "tags_all is explicitly documented as supported by current server capability profile"
}
```
- Unsupported additive field (strict failure):
```json
{
  "selector": {
    "namespaces": ["app/editor/*"],
    "order": ["namespace", "key", "revision"],
    "tags_all": ["active", "session"]
  },
  "expected_error": {
    "code": "validation_error",
    "message": "unknown selector field: tags_all"
  }
}
```

## Quick validation checklist

Before adding/updating selector examples:
1. Ordering:
   - Ensure `order` is explicit or the example expectation uses fallback `(namespace,key,revision)`.
2. Limits:
   - Confirm `limit` is non-negative and within max bound (`<=500`), or omitted to use default behavior.
3. Unknown fields:
   - Verify no undocumented selector fields are present unless explicitly described as invalid examples.
4. Revision scope:
   - Use `revision_scope=head` for head-only expectations.
   - Use `revision_scope=all` only when examples intentionally include full history semantics.
5. API alignment:
   - Cross-check `POST /v1/views/evaluate` validation notes in `docs/SPECS/API.md` for matching error/constraint behavior.

## Reviewer checklist (doc PRs)

Use this during VIEWS doc review after the quick validation checklist has passed:
1. Deterministic ordering guarantees:
   - Confirm examples and prose keep fallback ordering `(namespace,key,revision)` intact when `order` is omitted.
   - Verify no new language suggests non-deterministic ordering or sampling behavior.
2. Unknown-field strictness:
   - Ensure unsupported selector fields are still documented as `validation_error` outcomes.
   - Confirm new additive-field examples explicitly state capability support assumptions.
3. Capability discovery consistency:
   - Check that capability negotiation guidance stays documentation-driven for MVP.
   - Verify API/MCP cross-references remain aligned with selector capability and validation behavior.

## Selector examples consistency checklist

Use this when editing multiple selector example sections in one PR:
1. Fallback ordering consistency:
   - Ensure compatibility, deprecation, and validation examples all preserve canonical fallback `(namespace,key,revision)` semantics.
2. Normalization consistency:
   - Confirm normalized selector outputs use canonical fields (`order`, `revision_scope`, `limit`) across all example blocks.
3. Unknown-field outcome consistency:
   - Keep unsupported-field outcomes aligned to `validation_error` and avoid mixed error-class wording for equivalent cases.
4. Cross-section drift check:
   - Reconcile deprecation examples with capability examples so no field is simultaneously shown as both unsupported and baseline without an explicit assumption.

## CLI/API mapping
- API: `POST /v1/views/evaluate`
- CLI: `context view --selector ...`
