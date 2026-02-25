package contextcli

import (
	"bytes"
	"context"
	"encoding/json"
	"strings"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func newTestCLI(t *testing.T) (*CLI, *bytes.Buffer, *bytes.Buffer) {
	t.Helper()
	store, err := contextstore.Open(context.Background(), contextstore.Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = store.Close() })
	out := &bytes.Buffer{}
	errOut := &bytes.Buffer{}
	return &CLI{Store: store, Policy: contextpolicy.New(), Stdout: out, Stderr: errOut}, out, errOut
}

func TestValidationMissingArgs(t *testing.T) {
	cli, _, errOut := newTestCLI(t)
	code := cli.Run(context.Background(), []string{"context", "get", "--namespace", "app/editor/session"})
	if code == 0 {
		t.Fatalf("expected non-zero exit")
	}
	if !strings.Contains(errOut.String(), "key") {
		t.Fatalf("expected key validation error, got: %s", errOut.String())
	}
}

func TestPutGetHistoryAndTableOutput(t *testing.T) {
	cli, out, errOut := newTestCLI(t)

	for i := 1; i <= 2; i++ {
		out.Reset()
		errOut.Reset()
		code := cli.Run(context.Background(), []string{
			"context", "put",
			"--client-id", "editor",
			"--actor", "app:editor",
			"--namespace", "app/editor/session",
			"--key", "summary",
			"--json", `{"n":` + string(rune('0'+i)) + `}`,
		})
		if code != 0 {
			t.Fatalf("put %d failed: %s", i, errOut.String())
		}
	}

	out.Reset()
	if code := cli.Run(context.Background(), []string{
		"context", "history",
		"--namespace", "app/editor/session",
		"--key", "summary",
		"--output", "table",
	}); code != 0 {
		t.Fatalf("history failed: %s", errOut.String())
	}

	table := out.String()
	if !strings.Contains(table, "NAMESPACE") || !strings.Contains(table, "app/editor/session") {
		t.Fatalf("unexpected table output: %s", table)
	}
}

func TestViewDeterministicJSONOutput(t *testing.T) {
	cli, out, errOut := newTestCLI(t)
	writes := [][]string{
		{"--client-id", "editor", "--actor", "app:editor", "--namespace", "app/editor/session", "--key", "b", "--json", `{"v":1}`},
		{"--client-id", "editor", "--actor", "app:editor", "--namespace", "app/editor/session", "--key", "a", "--json", `{"v":2}`},
	}
	for _, flags := range writes {
		args := append([]string{"context", "put"}, flags...)
		if code := cli.Run(context.Background(), args); code != 0 {
			t.Fatalf("put failed: %s", errOut.String())
		}
	}

	selector := `{"namespaces":["app/editor/*"],"revision_scope":"all","order":["namespace","key","revision"]}`
	out.Reset()
	if code := cli.Run(context.Background(), []string{"context", "view", "--selector", selector, "--output", "json"}); code != 0 {
		t.Fatalf("view A failed: %s", errOut.String())
	}
	a := out.String()

	out.Reset()
	if code := cli.Run(context.Background(), []string{"context", "view", "--selector", selector, "--output", "json"}); code != 0 {
		t.Fatalf("view B failed: %s", errOut.String())
	}
	b := out.String()

	var pa, pb any
	if err := json.Unmarshal([]byte(a), &pa); err != nil {
		t.Fatalf("unmarshal A: %v", err)
	}
	if err := json.Unmarshal([]byte(b), &pb); err != nil {
		t.Fatalf("unmarshal B: %v", err)
	}
	if strings.TrimSpace(a) == "" || strings.TrimSpace(b) == "" {
		t.Fatalf("empty output")
	}
	if !strings.EqualFold("", "") && pa == nil && pb == nil {
		t.Fatalf("impossible guard")
	}
	if !equalJSON(pa, pb) {
		t.Fatalf("view output not deterministic")
	}
}

func equalJSON(a, b any) bool {
	ab, _ := json.Marshal(a)
	bb, _ := json.Marshal(b)
	return string(ab) == string(bb)
}
