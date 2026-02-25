# Local Development

Status: active draft

## Prerequisites
- Go toolchain (version per `go.mod`)
- Git

## Planned workflows
- Build and test commands for service components
- Local run instructions for CLI/API/desktop app
- Test data and fixture workflows

## Build and test
- Run full tests: `go test ./...`
- Run targeted integration/auth tests: `go test ./tests/integration -run AuthGate`

## API auth (MVP)
- Mutating HTTP endpoints support bearer-token auth.
- Configure the server with an auth token and send:
  - `Authorization: Bearer <token>`
- If token is configured and missing/mismatched, server returns:
  - HTTP `401`
  - `{"code":"auth_required","message":"missing or invalid bearer token","details":null}`

### Managed token lifecycle (local admin path)
- Issue token: `contextd context token issue --label admin --ttl 24h`
- Rotate token: `contextd context token rotate --token <old-token> --label admin --ttl 24h`
- Revoke token: `contextd context token revoke --token <token>`
- List token metadata: `contextd context token list --output table`
- In managed mode, revoked/expired tokens are rejected for mutating API endpoints.

Safe local handling:
- Do not commit tokens into the repository.
- Prefer exporting tokens into a local shell session (`export CONTEXTD_TOKEN=...`) or an untracked env file.
- Rotate tokens after local sharing events and revoke obsolete tokens promptly.

Rotation checklist:
1. Issue or rotate to obtain a new token.
2. Update local runtime environment with the new token.
3. Verify API mutating route access with the new token.
4. Revoke the old token.

## Service runner
- Start API server (default `:8080`): `contextd serve`
- Start with managed token auth: `contextd serve --managed-auth --addr :8080`
- Start with legacy static token: `contextd serve --static-token <token> --addr :8080`
- Enable local diagnostics endpoint: `contextd serve --metrics --addr :8080`
- Enable structured request logging: `contextd serve --request-logs --addr :8080`
- Request log redaction mode (default redacted): `contextd serve --request-logs --request-log-mode redacted --addr :8080`
- Request log full query mode (local debugging only): `contextd serve --request-logs --request-log-mode full --addr :8080`
- Configure graceful shutdown timeout: `contextd serve --shutdown-timeout 10s`
- Managed auth guard: server startup fails if no active token exists.
- Metrics endpoint: `GET /v1/metrics` (available only when `--metrics` is enabled).
- Service lifecycle: `SIGINT`/`SIGTERM` trigger graceful shutdown and deterministic shutdown logs.
- Request-log security posture:
  - Default to `--request-log-mode redacted` in shared/dev-team environments.
  - Use `--request-log-mode full` only for short local debugging sessions.
  - Avoid `full` mode when tokens/session IDs may appear in query strings.

## Namespace schema contract operations
- Register namespace: `contextd context namespace register --namespace app/editor/session --owner-type app --owner-id editor`
- Show namespace policy: `contextd context namespace show --namespace app/editor/session`
- Use `required_keys` policy to enforce top-level payload keys for writes/promotions.

## Consistency operations
- CLI scan report: `contextd context doctor --output json`
- CLI head rebuild + report: `contextd context repair-heads --output table`
- API scan endpoint: `GET /v1/context/consistency/scan`
- API repair endpoint: `POST /v1/context/consistency/repair` (mutating auth rules apply)

## Audit operations
- CLI audit query: `contextd context audit --limit 50 --output table`
- CLI filtered audit query: `contextd context audit --limit 50 --namespace user/notes --event-type promote --output json`
- CLI cursor query: `contextd context audit --cursor <next_cursor> --limit 50 --output json`
- API audit query: `GET /v1/context/audit?limit=50`
- API filtered audit query: `GET /v1/context/audit?limit=50&event_type=write&namespace=app/editor/session`
- Cursor pagination flow (fixture-aligned):
  1. `curl -s 'http://127.0.0.1:8080/v1/context/audit?limit=2' | jq .`
  2. Extract `next_cursor` from response.
  3. `curl -s \"http://127.0.0.1:8080/v1/context/audit?limit=2&cursor=<next_cursor>\" | jq .`
- Expected response fields: `items`, `count`, `next_cursor`.

## Backup and restore
- Export snapshot: `contextd context backup export --out /path/to/backup.json`
- Verify snapshot integrity: `contextd context backup verify --in /path/to/backup.json`
- Restore snapshot: `contextd context backup restore --in /path/to/backup.json`
- Expected behavior: deterministic record/history parity and restored audit/token metadata.

## Readiness checks
- CLI readiness report: `contextd context health --output table`
- CLI readiness summary: `contextd context health --summary --output table`
- API readiness report: `GET /v1/health/readiness`
- Readiness includes storage-path status, schema version, consistency issue count, and status tier:
  - `healthy`: all core checks pass.
  - `degraded`: store accessible but non-fatal consistency issues detected.
  - `failing`: required storage path missing or critical readiness preconditions unmet.

## First-time bootstrap
- Run deterministic setup: `contextd context bootstrap --default-app editor --output json`
- Command seeds baseline namespaces and returns readiness summary.
- Re-running bootstrap is idempotent.

## Retention and compaction
- Compact revisions + trim audit events:
  - `contextd context compact --keep-revisions 5 --keep-audit 5000 --output table`
- Compaction preserves latest heads per `(namespace,key)` and rebuilds head pointers deterministically.

## API contract fixtures
- Golden API contract fixture: `tests/integration/fixtures/api_contract_golden.json`
- Contract suite: `go test ./tests/integration -run APIContract`
- Update process: modify fixture intentionally alongside API shape changes and include rationale in commit message.
- Golden audit contract fixture: `tests/integration/fixtures/audit_contract_golden.json`
- Audit contract suite: `go test ./tests/integration -run AuditContract`
- Golden API error fixture: `tests/integration/fixtures/api_error_contract_golden.json`
- Error contract suite: `go test ./tests/integration -run APIErrorContract`
- Golden readiness contract fixture: `tests/integration/fixtures/readiness_contract_golden.json`
- Readiness contract suite: `go test ./tests/integration -run ReadinessContract`
- Golden CLI health summary fixture: `tests/integration/fixtures/cli_health_summary_contract_golden.json`
- CLI health summary contract suite: `go test ./tests/integration -run CLIHealthSummaryContract`
- Golden CLI audit fixture: `tests/integration/fixtures/cli_audit_contract_golden.json`
- CLI audit contract suite: `go test ./tests/integration -run CLIAuditContract`
- Golden smoke invalid-token fixture: `tests/integration/fixtures/smoke_invalid_token_contract_golden.json`
- Smoke invalid-token contract suite: `go test ./tests/integration -run SmokeInvalidTokenContract`
- Golden run-log helper fixture: `tests/integration/fixtures/runlog_helper_contract_golden.json`
- Run-log helper contract suite: `go test ./tests/integration -run RunlogHelperContract`
- Full fixture inventory: `docs/CONTRACT_FIXTURES.md`

## Metrics contract checks
- Golden metrics fixture: `tests/integration/fixtures/metrics_contract_golden.json`
- Contract suite: `go test ./tests/integration -run MetricsContract`
- Golden log/metrics mode fixture: `tests/integration/fixtures/log_metrics_contract_golden.json`
- Log/metrics mode suite: `go test ./tests/integration -run LogMetricsContract`
- Local query example: `curl -s http://127.0.0.1:8080/v1/metrics | jq .`
- Correlation fields:
  - `routes[].status_counts` tracks per-status response counts.
  - `routes[].recent_request_ids` captures recent request IDs for route-level trace correlation.
- Correlation workflow:
  1. Start service with `--metrics --request-logs`.
  2. Send request with `X-Request-Id: <id>`.
  3. Match `<id>` in request logs and `/v1/metrics` `recent_request_ids`.

## Service smoke checks
- Script: `scripts/contextd-smoke.sh`
- No-auth server:
  - `contextd serve --addr 127.0.0.1:8080`
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080 --auth-mode none`
- Static auth server:
  - `contextd serve --static-token local-dev-token --addr 127.0.0.1:8080`
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080 --auth-mode static --token local-dev-token`
- Managed auth server:
  - `contextd context token issue --label local --ttl 24h --output table`
  - `contextd serve --managed-auth --addr 127.0.0.1:8080 --metrics`
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080 --auth-mode managed --token <issued-token> --metrics`
- In `static`/`managed` mode, smoke pre-checks mutating auth guard by asserting unauthenticated writes return `401`.
- Optional invalid-token negative check:
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080 --auth-mode managed --token <valid-token> --assert-invalid-token`

## Make targets
- Run all tests: `make test`
- Run contract suites: `make contracts`
- Run smoke against active server: `make smoke BASE_URL=http://127.0.0.1:8080`
- Run smoke with auth token: `make smoke BASE_URL=http://127.0.0.1:8080 AUTH_MODE=static TOKEN=<token>`
- Run smoke with metrics check enabled: `make smoke BASE_URL=http://127.0.0.1:8080 AUTH_MODE=managed TOKEN=<token> METRICS=1`
- Run smoke with invalid-token precheck: `make smoke BASE_URL=http://127.0.0.1:8080 AUTH_MODE=managed TOKEN=<token> INVALID_TOKEN_CHECK=1`
- Smoke invalid-token preset: `make smoke-invalid-token BASE_URL=http://127.0.0.1:8080 AUTH_MODE=managed TOKEN=<token>`
- Contract fixture presence lint: `make contract-lint`
- Run full local harness (boot + contracts + smoke + teardown):
  - `make e2e-local`
  - `AUTH_MODE=static make e2e-local`
  - `AUTH_MODE=managed make e2e-local`
- Managed-auth preset:
  - `make e2e-managed`

## Iteration run-log helper
- Script: `scripts/volon-runlog-init.sh`
- Example:
  - `scripts/volon-runlog-init.sh --iteration 47 --date 2026-02-25 --profile orchestrator`
- Make wrapper:
  - `make runlog-init ITERATION=47`
  - `make runlog-init ITERATION=47 RUN_DATE=2026-02-25 PROFILE=orchestrator RUNLOG_OUT=/tmp/runlog-047.md`
- Overwrite safety:
  - By default, existing run-log files are not overwritten.
  - Use script-level force only when intentional:
    - `scripts/volon-runlog-init.sh --iteration 47 --date 2026-02-25 --force`
- Default output path pattern:
  - `.volon/logs/run-iteration-<NNN>-<YYYY-MM-DD>.md`
- Quick validation sequence:
  1. `make contracts`
  2. Start `contextd serve ...`
  3. `make smoke BASE_URL=http://127.0.0.1:8080 TOKEN=<token>`

## Repository conventions
- Product specifications: `docs/SPECS/`
- Architecture decisions: `docs/DECISIONS/`
- Agent artifacts: `artifacts/` and `outputs/`
- Volon runtime state: `.volon/`
