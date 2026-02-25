#!/usr/bin/env bash
set -euo pipefail

cat <<'CMDS'
api	go test ./tests/integration -run APIContract -count=1
api-errors	go test ./tests/integration -run APIErrorContract -count=1
audit	go test ./tests/integration -run AuditContract -count=1
metrics	go test ./tests/integration -run MetricsContract -count=1
log-metrics	go test ./tests/integration -run LogMetricsContract -count=1
readiness	go test ./tests/integration -run ReadinessContract -count=1
cli-health-summary	go test ./tests/integration -run CLIHealthSummaryContract -count=1
cli-audit	go test ./tests/integration -run CLIAuditContract -count=1
smoke-invalid-token	go test ./tests/integration -run SmokeInvalidTokenContract -count=1
make-contract-cli-list	go test ./tests/integration -run MakeContractCLIListContract -count=1
make-contract-cli-run	go test ./tests/integration -run MakeContractCLIRunContract -count=1
bootstrap-sync	go test ./tests/integration -run BootstrapSyncScript -count=1
bootstrap-sync-no-log	go test ./tests/integration -run BootstrapSyncNoLogContract -count=1
make-bootstrap-sync	go test ./tests/integration -run MakeBootstrapSyncContract -count=1
make-smoke-invalid-token	go test ./tests/integration -run MakeSmokeInvalidTokenContract -count=1
runlog-helper	go test ./tests/integration -run RunlogHelperContract -count=1
agents-boot-check	go test ./tests/integration -run AgentsBootCheckContract -count=1
CMDS
