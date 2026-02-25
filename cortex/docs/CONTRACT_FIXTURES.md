# Contract Fixture Inventory

This index lists fixture files and their associated validation command.

| Fixture | Purpose | Test command |
|---|---|---|
| `tests/integration/fixtures/api_contract_golden.json` | Core API success response shape contracts | `go test ./tests/integration -run APIContract` |
| `tests/integration/fixtures/api_error_contract_golden.json` | API error envelope contracts (`code/message/details`) | `go test ./tests/integration -run APIErrorContract` |
| `tests/integration/fixtures/audit_contract_golden.json` | Audit endpoint pagination/filter contracts | `go test ./tests/integration -run AuditContract` |
| `tests/integration/fixtures/metrics_contract_golden.json` | Metrics endpoint route/totals contract | `go test ./tests/integration -run MetricsContract` |
| `tests/integration/fixtures/log_metrics_contract_golden.json` | Request-log mode and metrics correlation contracts | `go test ./tests/integration -run LogMetricsContract` |
| `tests/integration/fixtures/readiness_contract_golden.json` | Readiness status-tier payload contracts | `go test ./tests/integration -run ReadinessContract` |
| `tests/integration/fixtures/cli_health_summary_contract_golden.json` | CLI `context health --summary` contract | `go test ./tests/integration -run CLIHealthSummaryContract` |
| `tests/integration/fixtures/cli_audit_contract_golden.json` | CLI `context audit` cursor/filter JSON contract | `go test ./tests/integration -run CLIAuditContract` |
| `tests/integration/fixtures/cli_contract_command_golden.json` | CLI `context contract list/run` dry-mode contract | `go test ./tests/integration -run CLIContractCommand` |
| `tests/integration/fixtures/smoke_invalid_token_contract_golden.json` | Smoke invalid-token marker sequence contract | `go test ./tests/integration -run SmokeInvalidTokenContract` |
| `tests/integration/fixtures/make_smoke_invalid_token_contract_golden.json` | `make smoke-invalid-token` output marker contract | `go test ./tests/integration -run MakeSmokeInvalidTokenContract` |
| `tests/integration/fixtures/runlog_helper_contract_golden.json` | Run-log helper output skeleton contract | `go test ./tests/integration -run RunlogHelperContract` |
| `tests/integration/fixtures/agents_boot_check_contract_golden.json` | AGENTS boot drift check success-output contract | `go test ./tests/integration -run AgentsBootCheckContract` |

## Full validation

- `go test ./...`
- `make contract-lint`

## Ownership And Update Policy

- Ownership:
  - API/runtime fixture changes: reviewers for `internal/contextapi/` and `internal/contextstore/`.
  - CLI fixture changes: reviewers for `internal/contextcli/`.
  - Smoke/workflow fixture changes: reviewers for `scripts/` and `.volon/` workflow docs.
- Update policy:
  - Any fixture change must be paired with the corresponding test change and rationale in the same commit.
  - If output/shape changes are intentional, update fixture first, then tests, then docs references.
  - If fixture changes are unintentional, treat as regression and fix code/tests before merge.
- Review expectations:
  - Validate fixture file remains non-empty and listed in `scripts/contract-fixture-lint.sh`.
  - Run targeted suite(s) for modified fixture and then `go test ./...`.
