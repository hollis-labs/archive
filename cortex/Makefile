.PHONY: test contracts contract-api contract-errors contract-metrics smoke validate e2e-local e2e-managed

BASE_URL ?= http://127.0.0.1:8080
TOKEN ?=
METRICS ?= 0

TEST ?= go test ./...

ifeq ($(strip $(TOKEN)),)
SMOKE_TOKEN_ARG :=
else
SMOKE_TOKEN_ARG := --token $(TOKEN)
endif

ifeq ($(METRICS),1)
SMOKE_METRICS_ARG := --metrics
else
SMOKE_METRICS_ARG :=
endif

test:
	$(TEST)

contract-api:
	go test ./tests/integration -run APIContract -count=1

contract-errors:
	go test ./tests/integration -run APIErrorContract -count=1

contract-metrics:
	go test ./tests/integration -run MetricsContract -count=1

contracts: contract-api contract-errors contract-metrics

smoke:
	scripts/contextd-smoke.sh --base-url $(BASE_URL) $(SMOKE_TOKEN_ARG) $(SMOKE_METRICS_ARG)

validate: contracts
	@echo "validate complete: contract suites passed"

e2e-local:
	scripts/contextd-e2e-local.sh

e2e-managed:
	AUTH_MODE=managed scripts/contextd-e2e-local.sh
