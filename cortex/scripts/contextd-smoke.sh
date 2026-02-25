#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://127.0.0.1:8080"
TOKEN=""
CHECK_METRICS=0

usage() {
  cat <<USAGE
Usage: $(basename "$0") [--base-url URL] [--token TOKEN] [--metrics]

Checks readiness, write, head, history, view routes against a running contextd service.
Use --token for static or managed auth modes on mutating routes.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base-url)
      BASE_URL="$2"
      shift 2
      ;;
    --token)
      TOKEN="$2"
      shift 2
      ;;
    --metrics)
      CHECK_METRICS=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

AUTH_ARGS=()
if [[ -n "$TOKEN" ]]; then
  AUTH_ARGS=(-H "Authorization: Bearer $TOKEN")
fi

curl_json() {
  local method="$1"
  local path="$2"
  local data="${3:-}"
  shift 3 || true

  local url="${BASE_URL}${path}"
  local out
  local code
  local body_file
  body_file="$(mktemp /tmp/contextd-smoke-body.XXXXXX)"

  if [[ -n "$data" ]]; then
    if ! out=$(curl -sS -o "$body_file" -w "%{http_code}" -X "$method" "$url" -H "Content-Type: application/json" "${AUTH_ARGS[@]}" "$@" --data "$data"); then
      echo "request failed: $method $path status=000 body=<curl_error>" >&2
      rm -f "$body_file"
      return 1
    fi
  else
    if ! out=$(curl -sS -o "$body_file" -w "%{http_code}" -X "$method" "$url" "${AUTH_ARGS[@]}" "$@"); then
      echo "request failed: $method $path status=000 body=<curl_error>" >&2
      rm -f "$body_file"
      return 1
    fi
  fi
  code="$out"

  if [[ "$code" -lt 200 || "$code" -ge 300 ]]; then
    echo "request failed: $method $path status=$code body=$(cat "$body_file")" >&2
    rm -f "$body_file"
    return 1
  fi

  cat "$body_file"
  rm -f "$body_file"
}

contains_json_key() {
  local body="$1"
  local key="$2"
  if ! printf '%s' "$body" | grep -q "\"$key\""; then
    echo "missing key '$key' in response: $body" >&2
    return 1
  fi
}

echo "[smoke] checking readiness"
readiness=$(curl_json GET "/v1/health/readiness" "")
contains_json_key "$readiness" "healthy"

echo "[smoke] writing revision"
write_payload='{"client_id":"editor","actor":"app:editor","namespace":"app/editor/session","key":"smoke","payload":{"ok":true}}'
write_res=$(curl_json POST "/v1/context/write" "$write_payload")
contains_json_key "$write_res" "record_id"

echo "[smoke] fetching head"
head_res=$(curl_json GET "/v1/context/head?namespace=app/editor/session&key=smoke" "")
contains_json_key "$head_res" "record"

echo "[smoke] fetching history"
history_res=$(curl_json GET "/v1/context/history?namespace=app/editor/session&key=smoke&limit=5" "")
contains_json_key "$history_res" "items"

echo "[smoke] evaluating view"
view_payload='{"selector":{"namespaces":["app/editor/*"],"revision_scope":"all"},"include_payload":false}'
view_res=$(curl_json POST "/v1/views/evaluate" "$view_payload")
contains_json_key "$view_res" "evaluation_meta"

if [[ "$CHECK_METRICS" -eq 1 ]]; then
  echo "[smoke] checking metrics"
  metrics_res=$(curl_json GET "/v1/metrics" "")
  contains_json_key "$metrics_res" "totals"
fi

echo "[smoke] ok"
