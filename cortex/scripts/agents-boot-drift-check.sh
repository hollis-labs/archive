#!/usr/bin/env bash
set -euo pipefail

critical=(
  "AGENTS.md"
  ".volon/agent-boot.md"
  ".volon/bootstrap.md"
  ".volon/boot/orchestrator.md"
  ".volon/boot/architect.md"
  ".volon/boot/worker.md"
  ".volon/boot/reviewer.md"
)

missing=0
for file in "${critical[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "missing critical boot file: $file" >&2
    missing=1
  fi
done
if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

warnings=0
if ! rg -q "\.volon/boot/" AGENTS.md; then
  echo "warning: AGENTS.md does not reference .volon/boot/ paths" >&2
  warnings=1
fi
if ! rg -q "\.volon/agent-boot\.md" AGENTS.md; then
  echo "warning: AGENTS.md does not reference .volon/agent-boot.md" >&2
  warnings=1
fi
if ! rg -q "orchestrator|architect|worker|reviewer" AGENTS.md; then
  echo "warning: AGENTS.md may be missing expected profile names" >&2
  warnings=1
fi

if [[ "$warnings" -eq 1 ]]; then
  echo "boot-check ok with warnings"
else
  echo "boot-check ok"
fi
