package contextcli

import (
	"bytes"
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func newTestCLI(t *testing.T) (*CLI, *bytes.Buffer, *bytes.Buffer) {
	cli, out, errOut, _ := newTestCLIWithRoot(t)
	return cli, out, errOut
}

func newTestCLIWithRoot(t *testing.T) (*CLI, *bytes.Buffer, *bytes.Buffer, string) {
	t.Helper()
	root := t.TempDir()
	store, err := contextstore.Open(context.Background(), contextstore.Config{RootDir: root})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = store.Close() })
	out := &bytes.Buffer{}
	errOut := &bytes.Buffer{}
	return &CLI{Store: store, Policy: contextpolicy.New(), Stdout: out, Stderr: errOut}, out, errOut, root
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

func TestDoctorAndRepairHeads(t *testing.T) {
	cli, out, errOut, root := newTestCLIWithRoot(t)

	if code := cli.Run(context.Background(), []string{
		"context", "put",
		"--client-id", "editor",
		"--actor", "app:editor",
		"--namespace", "app/editor/session",
		"--key", "summary",
		"--json", `{"v":1}`,
	}); code != 0 {
		t.Fatalf("put failed: %s", errOut.String())
	}

	if err := os.Remove(filepath.Join(root, "data", "records", "app", "editor", "session", "summary", "1.json")); err != nil {
		t.Fatalf("remove payload: %v", err)
	}

	out.Reset()
	if code := cli.Run(context.Background(), []string{"context", "doctor", "--output", "json"}); code != 0 {
		t.Fatalf("doctor failed: %s", errOut.String())
	}
	if !strings.Contains(out.String(), "missing_payload") {
		t.Fatalf("expected missing_payload finding, got: %s", out.String())
	}

	out.Reset()
	if code := cli.Run(context.Background(), []string{"context", "repair-heads", "--output", "table"}); code != 0 {
		t.Fatalf("repair-heads failed: %s", errOut.String())
	}
	if !strings.Contains(out.String(), "REBUILT_HEADS") {
		t.Fatalf("unexpected repair table output: %s", out.String())
	}
}

func TestAuditCommandShowsWriteAndPromote(t *testing.T) {
	cli, out, errOut, _ := newTestCLIWithRoot(t)

	if code := cli.Run(context.Background(), []string{
		"context", "put",
		"--client-id", "editor",
		"--actor", "app:editor",
		"--namespace", "app/editor/session",
		"--key", "summary",
		"--json", `{"v":1}`,
	}); code != 0 {
		t.Fatalf("put failed: %s", errOut.String())
	}

	if code := cli.Run(context.Background(), []string{
		"context", "promote",
		"--client-id", "editor",
		"--actor", "user",
		"--from-namespace", "app/editor/session",
		"--from-key", "summary",
		"--to-namespace", "user/notes",
		"--to-key", "daily",
	}); code != 0 {
		t.Fatalf("promote failed: %s", errOut.String())
	}

	out.Reset()
	if code := cli.Run(context.Background(), []string{"context", "audit", "--limit", "10", "--output", "table"}); code != 0 {
		t.Fatalf("audit failed: %s", errOut.String())
	}
	table := out.String()
	if !strings.Contains(table, "EVENT") || !strings.Contains(table, "write") || !strings.Contains(table, "promote") {
		t.Fatalf("expected write/promote audit rows, got: %s", table)
	}
}
