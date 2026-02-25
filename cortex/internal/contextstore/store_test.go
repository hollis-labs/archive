package contextstore

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"testing"
	"time"
)

func TestAppendHeadAndHistory(t *testing.T) {
	dir := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: dir})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	for i := 1; i <= 3; i++ {
		payload := json.RawMessage([]byte(`{"n":` + string(rune('0'+i)) + `}`))
		if _, err := s.AppendRecord(context.Background(), AppendInput{
			Namespace: "app/editor/session",
			Key:       "summary",
			Actor:     "app:editor",
			Payload:   payload,
		}); err != nil {
			t.Fatalf("append %d: %v", i, err)
		}
	}

	head, err := s.Head(context.Background(), "app/editor/session", "summary")
	if err != nil {
		t.Fatalf("head: %v", err)
	}
	if head.Revision != 3 {
		t.Fatalf("expected head revision 3, got %d", head.Revision)
	}

	history, err := s.History(context.Background(), "app/editor/session", "summary", 0)
	if err != nil {
		t.Fatalf("history: %v", err)
	}
	if len(history) != 3 {
		t.Fatalf("expected 3 history rows, got %d", len(history))
	}
	for i := range history {
		want := int64(i + 1)
		if history[i].Revision != want {
			t.Fatalf("history[%d] revision=%d want=%d", i, history[i].Revision, want)
		}
	}
}

func TestHistoryDeterministicOrdering(t *testing.T) {
	dir := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: dir})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	writes := []string{`{"v":1}`, `{"v":2}`, `{"v":3}`}
	for _, raw := range writes {
		if _, err := s.AppendRecord(context.Background(), AppendInput{
			Namespace: "user/goals",
			Key:       "focus",
			Actor:     "user",
			Payload:   json.RawMessage(raw),
		}); err != nil {
			t.Fatalf("append: %v", err)
		}
	}

	a, err := s.History(context.Background(), "user/goals", "focus", 0)
	if err != nil {
		t.Fatalf("history A: %v", err)
	}
	b, err := s.History(context.Background(), "user/goals", "focus", 0)
	if err != nil {
		t.Fatalf("history B: %v", err)
	}

	if !reflect.DeepEqual(a, b) {
		t.Fatalf("history ordering/content not deterministic")
	}
}

func TestMissingPayloadReturnsConsistencyFault(t *testing.T) {
	dir := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: dir})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	rec, err := s.AppendRecord(context.Background(), AppendInput{
		Namespace: "app/editor/session",
		Key:       "summary",
		Actor:     "app:editor",
		Payload:   json.RawMessage(`{"ok":true}`),
	})
	if err != nil {
		t.Fatalf("append: %v", err)
	}

	if err := os.Remove(filepath.Join(dir, "data", "records", rec.Namespace, rec.Key, "1.json")); err != nil {
		t.Fatalf("remove payload: %v", err)
	}

	_, err = s.Head(context.Background(), rec.Namespace, rec.Key)
	if err == nil {
		t.Fatalf("expected consistency fault")
	}
	if !errors.Is(err, ErrConsistencyFault) {
		t.Fatalf("expected ErrConsistencyFault, got %v", err)
	}
}

func TestSelectValidationAndLimits(t *testing.T) {
	dir := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: dir})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	for i := 0; i < DefaultSelectLimit+20; i++ {
		if _, err := s.AppendRecord(context.Background(), AppendInput{
			Namespace: "app/editor/session",
			Key:       fmt.Sprintf("k-%03d", i),
			Actor:     "app:editor",
			Payload:   json.RawMessage(`{"ok":true}`),
		}); err != nil {
			t.Fatalf("append %d: %v", i, err)
		}
	}

	// Limit=0 should apply the default bound.
	rows, err := s.Select(context.Background(), Selector{
		Namespaces:    []string{"app/editor/*"},
		RevisionScope: "all",
	})
	if err != nil {
		t.Fatalf("select default limit: %v", err)
	}
	if len(rows) != DefaultSelectLimit {
		t.Fatalf("expected default limit %d rows, got %d", DefaultSelectLimit, len(rows))
	}

	_, err = s.Select(context.Background(), Selector{
		Namespaces: []string{"app/editor/*"},
		Limit:      MaxSelectLimit + 1,
	})
	if err == nil {
		t.Fatalf("expected limit validation error")
	}

	_, err = s.Select(context.Background(), Selector{
		Namespaces: []string{"["},
	})
	if err == nil {
		t.Fatalf("expected namespace pattern validation error")
	}
}

func BenchmarkSelectRepresentativeWorkload(b *testing.B) {
	dir := b.TempDir()
	s, err := Open(context.Background(), Config{RootDir: dir})
	if err != nil {
		b.Fatalf("open: %v", err)
	}
	defer s.Close()

	for i := 0; i < 600; i++ {
		ns := "app/editor/session"
		if i%2 == 0 {
			ns = "user/goals"
		}
		if _, err := s.AppendRecord(context.Background(), AppendInput{
			Namespace: ns,
			Key:       fmt.Sprintf("k-%03d", i),
			Actor:     "user",
			Payload:   json.RawMessage(`{"v":1}`),
		}); err != nil {
			b.Fatalf("append %d: %v", i, err)
		}
	}

	sel := Selector{
		Namespaces:    []string{"app/editor/*", "user/*"},
		RevisionScope: "all",
		Order:         []string{"namespace", "key", "revision"},
		Limit:         300,
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		rows, err := s.Select(context.Background(), sel)
		if err != nil {
			b.Fatalf("select: %v", err)
		}
		if len(rows) > sel.Limit {
			b.Fatalf("expected bounded results <= %d, got %d", sel.Limit, len(rows))
		}
	}
}

func TestScanConsistencyAndRepairHeads(t *testing.T) {
	dir := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: dir})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	if _, err := s.AppendRecord(context.Background(), AppendInput{
		Namespace: "app/editor/session",
		Key:       "summary",
		Actor:     "app:editor",
		Payload:   json.RawMessage(`{"v":1}`),
	}); err != nil {
		t.Fatalf("append: %v", err)
	}
	if _, err := s.AppendRecord(context.Background(), AppendInput{
		Namespace: "app/editor/session",
		Key:       "summary",
		Actor:     "app:editor",
		Payload:   json.RawMessage(`{"v":2}`),
	}); err != nil {
		t.Fatalf("append: %v", err)
	}

	// Force a head mismatch for repair verification.
	if _, err := s.db.Exec(`UPDATE heads SET head_revision = 1`); err != nil {
		t.Fatalf("tamper head: %v", err)
	}

	issues, err := s.ScanConsistency(context.Background())
	if err != nil {
		t.Fatalf("scan: %v", err)
	}
	foundHeadMismatch := false
	for _, issue := range issues {
		if issue.Type == "head_mismatch" {
			foundHeadMismatch = true
		}
	}
	if !foundHeadMismatch {
		t.Fatalf("expected head_mismatch issue, got %+v", issues)
	}

	rebuilt, err := s.RebuildHeads(context.Background())
	if err != nil {
		t.Fatalf("rebuild heads: %v", err)
	}
	if rebuilt != 1 {
		t.Fatalf("expected one rebuilt head, got %d", rebuilt)
	}

	issuesAfter, err := s.ScanConsistency(context.Background())
	if err != nil {
		t.Fatalf("scan after repair: %v", err)
	}
	for _, issue := range issuesAfter {
		if issue.Type == "head_mismatch" {
			t.Fatalf("expected head mismatch repaired, still present: %+v", issue)
		}
	}
}

func TestAuthTokenLifecycle(t *testing.T) {
	s, err := Open(context.Background(), Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	token, meta, err := s.IssueAuthToken(context.Background(), "cli-admin", time.Hour)
	if err != nil {
		t.Fatalf("issue: %v", err)
	}
	if meta.TokenID == "" || token == "" {
		t.Fatalf("expected issued token and metadata")
	}
	if err := s.ValidateAuthToken(context.Background(), token); err != nil {
		t.Fatalf("validate issued token: %v", err)
	}

	rotated, _, err := s.RotateAuthToken(context.Background(), token, "rotated", time.Hour)
	if err != nil {
		t.Fatalf("rotate: %v", err)
	}
	if err := s.ValidateAuthToken(context.Background(), token); !errors.Is(err, ErrAuthTokenRevoked) {
		t.Fatalf("expected revoked old token, got %v", err)
	}
	if err := s.ValidateAuthToken(context.Background(), rotated); err != nil {
		t.Fatalf("validate rotated token: %v", err)
	}

	if err := s.RevokeAuthToken(context.Background(), rotated); err != nil {
		t.Fatalf("revoke: %v", err)
	}
	if err := s.ValidateAuthToken(context.Background(), rotated); !errors.Is(err, ErrAuthTokenRevoked) {
		t.Fatalf("expected revoked rotated token, got %v", err)
	}
}

func TestReadinessHealthyAndDegraded(t *testing.T) {
	root := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: root})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	if _, err := s.AppendRecord(context.Background(), AppendInput{
		Namespace: "app/editor/session",
		Key:       "summary",
		Actor:     "app:editor",
		Payload:   json.RawMessage(`{"v":1}`),
	}); err != nil {
		t.Fatalf("append: %v", err)
	}

	healthy, err := s.Readiness(context.Background())
	if err != nil {
		t.Fatalf("readiness healthy: %v", err)
	}
	if !healthy.Healthy || healthy.ConsistencyIssues != 0 {
		t.Fatalf("expected healthy readiness, got %+v", healthy)
	}

	if err := os.Remove(filepath.Join(root, "data", "records", "app", "editor", "session", "summary", "1.json")); err != nil {
		t.Fatalf("remove payload: %v", err)
	}
	degraded, err := s.Readiness(context.Background())
	if err != nil {
		t.Fatalf("readiness degraded: %v", err)
	}
	if degraded.Healthy || degraded.ConsistencyIssues == 0 {
		t.Fatalf("expected degraded readiness, got %+v", degraded)
	}
}
