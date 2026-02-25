#!/usr/bin/env bash
set -euo pipefail

fixtures=(
  "tests/integration/fixtures/api_contract_golden.json"
  "tests/integration/fixtures/api_error_contract_golden.json"
  "tests/integration/fixtures/audit_contract_golden.json"
  "tests/integration/fixtures/metrics_contract_golden.json"
  "tests/integration/fixtures/log_metrics_contract_golden.json"
  "tests/integration/fixtures/readiness_contract_golden.json"
  "tests/integration/fixtures/cli_health_summary_contract_golden.json"
  "tests/integration/fixtures/cli_audit_contract_golden.json"
  "tests/integration/fixtures/cli_contract_command_golden.json"
  "tests/integration/fixtures/make_contract_cli_list_contract_golden.json"
  "tests/integration/fixtures/contract_suite_commands_contract_golden.json"
  "tests/integration/fixtures/smoke_invalid_token_contract_golden.json"
  "tests/integration/fixtures/make_smoke_invalid_token_contract_golden.json"
  "tests/integration/fixtures/runlog_helper_contract_golden.json"
  "tests/integration/fixtures/agents_boot_check_contract_golden.json"
)

missing=0
for file in "${fixtures[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "missing fixture: $file" >&2
    missing=1
    continue
  fi
  if [[ ! -s "$file" ]]; then
    echo "empty fixture: $file" >&2
    missing=1
  fi
done

if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

echo "fixture lint ok (${#fixtures[@]} files)"
