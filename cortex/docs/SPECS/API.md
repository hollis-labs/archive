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

## Local auth posture (MVP)
- Mechanism: bearer token in `Authorization` header.
- Scope: mutating endpoints (`POST /v1/namespaces/register`, `POST /v1/context/write`, `POST /v1/context/promote`).
- Behavior:
  - Legacy mode: when static server auth token is configured, mutating requests without a matching bearer token return `401`.
  - Managed mode: token lifecycle is store-backed (issue/rotate/revoke/expiry). Revoked/expired tokens are rejected with `401`.
  - Read endpoints (`head`, `history`, `views/evaluate`) remain side-effect free and do not require auth in MVP.
- Error envelope for auth failures:
  - `code: "auth_required"`
  - `message: "missing or invalid bearer token"`

## Identity and namespace context
Each mutating request carries:
- `client_id` (string)
- `actor` (string: `user`, `app:<client-id>`, `system`)

Server enforces namespace ownership rules independent of caller-provided namespace values.
When namespace policy includes schema contract metadata (`required_keys`), write/promote payloads are validated and schema mismatches return `400` (`validation_error`).

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
- `policy`

### GET `/v1/namespaces/get`
Retrieve namespace owner + policy metadata.

Query:
- `namespace`

Response:
- `namespace`
- `owner_type`
- `owner_id`
- `policy`

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

Selector limits:
- `namespaces`: max 32 patterns
- `keys`: max 128 entries
- `limit`: defaults to 200 when omitted/zero, max 500
- invalid selector complexity/shape returns `400` (`code: "validation_error"`)

### GET `/v1/context/consistency/scan`
Run a deterministic consistency scan across index rows and payload files.

Response:
- `count` (integer)
- `issues` (array of typed findings such as `missing_payload`, `head_mismatch`, `missing_head`)

### POST `/v1/context/consistency/repair`
Rebuild `heads` from latest indexed revisions for each `(namespace,key)` pair.

Auth:
- Treated as mutating; requires bearer token when auth token is configured.

Response:
- `rebuilt_heads` (integer)
- `remaining_issues` (integer)
- `issues` (post-repair scan findings)

### GET `/v1/health/readiness`
Return deterministic operational readiness status.

Response:
- `healthy` (boolean)
- `db_path` (string)
- `records_dir` (string)
- `records_dir_exists` (boolean)
- `schema_version` (integer)
- `consistency_issues` (integer)
- `generated_at` (RFC3339 UTC)

### GET `/v1/metrics` (optional)
Expose lightweight runtime request counters and latency aggregates.

Behavior:
- Endpoint is enabled only when service starts with metrics flag (`contextd serve --metrics`).
- When disabled, endpoint returns `404`.

Response:
- `enabled` (boolean)
- `routes` (array of route metrics sorted by `(method,path)`)
  - `method`
  - `path`
  - `requests`
  - `errors`
  - `latency_ns_total`
  - `latency_ns_avg`
- `totals`
  - `requests`
  - `errors`

## Determinism requirements
- Identical store state + identical request must produce identical item ordering.
- Selector evaluation must use explicit sort keys; fallback sort is `(namespace,key,revision)`.
- APIs never mutate state during read/view calls.
