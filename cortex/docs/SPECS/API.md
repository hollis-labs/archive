# HTTP API Spec

Status: pivot-aligned draft (Task 5)

## Conventions
- Base path: `/v1`
- JSON request/response
- Deterministic ordering for all collection responses
- Error shape:
  - `code` (string)
  - `message` (string)
  - `details` (object, optional)

## Identity and namespace context
Each mutating request carries:
- `client_id` (string)
- `actor` (string: `user`, `app:<client-id>`, `system`)

Server enforces namespace ownership rules independent of caller-provided namespace values.

## Endpoints

### POST `/v1/namespaces/register`
Register a namespace owner policy.

Request:
- `namespace`
- `owner_type` (`user` | `app`)
- `owner_id`
- `policy` (object)

Response:
- `namespace`
- `owner_type`
- `owner_id`

### POST `/v1/context/write`
Append revision for `(namespace,key)`.

Request:
- `client_id`
- `actor`
- `namespace`
- `key`
- `payload`
- `reason` (optional)

Response:
- `record_id`
- `revision`
- `head_revision`
- `timestamp`

### POST `/v1/context/promote`
Promote a record into protected `user/*` with explicit approval semantics.

Request:
- `client_id`
- `actor` (`user` required)
- `from_namespace`
- `from_key`
- `to_namespace` (`user/*`)
- `to_key`
- `source_revision` (optional; defaults to current head)

Response:
- `promoted_record_id`
- `target_revision`

### GET `/v1/context/head`
Query:
- `namespace`
- `key`

Response:
- `record`

### GET `/v1/context/history`
Query:
- `namespace`
- `key`
- `limit` (optional)
- `cursor` (optional)

Response:
- `items` (stable oldest->newest window unless cursor semantics specify bounded page)
- `next_cursor`

### POST `/v1/views/evaluate`
Evaluate deterministic selector for context-aware retrieval.

Request:
- `selector` (object)
- `include_payload` (bool, default true)
- `limit` (optional)

Response:
- `items` (deterministically ordered)
- `evaluation_meta` (`sort_keys`, `matched_count`, `truncated`)

## Determinism requirements
- Identical store state + identical request must produce identical item ordering.
- Selector evaluation must use explicit sort keys; fallback sort is `(namespace,key,revision)`.
- APIs never mutate state during read/view calls.
