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
| `tests/integration/fixtures/smoke_invalid_token_contract_golden.json` | Smoke invalid-token marker sequence contract | `go test ./tests/integration -run SmokeInvalidTokenContract` |
| `tests/integration/fixtures/runlog_helper_contract_golden.json` | Run-log helper output skeleton contract | `go test ./tests/integration -run RunlogHelperContract` |

## Full validation

- `go test ./...`
- `make contract-lint`
