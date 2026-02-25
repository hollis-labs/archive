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

## Determinism rules
1. Selector parsing is pure and side-effect free.
2. Missing `order` defaults to `(namespace,key,revision)`.
3. Equivalent selector + identical store state => identical result ordering.
4. Limit truncation is applied after deterministic sort.

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
- Reject negative or zero limits.

## CLI/API mapping
- API: `POST /v1/views/evaluate`
- CLI: `context view --selector ...`
