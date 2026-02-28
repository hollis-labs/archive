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
	if !healthy.Healthy || healthy.ConsistencyIssues != 0 || healthy.Status != "healthy" {
		t.Fatalf("expected healthy readiness, got %+v", healthy)
	}

	if err := os.Remove(filepath.Join(root, "data", "records", "app", "editor", "session", "summary", "1.json")); err != nil {
		t.Fatalf("remove payload: %v", err)
	}
	degraded, err := s.Readiness(context.Background())
	if err != nil {
		t.Fatalf("readiness degraded: %v", err)
	}
	if degraded.Healthy || degraded.ConsistencyIssues == 0 || degraded.Status != "degraded" {
		t.Fatalf("expected degraded readiness, got %+v", degraded)
	}

	if err := os.RemoveAll(filepath.Join(root, "data", "records")); err != nil {
		t.Fatalf("remove records dir: %v", err)
	}
	failing, err := s.Readiness(context.Background())
	if err != nil {
		t.Fatalf("readiness failing: %v", err)
	}
	if failing.Status != "failing" || failing.RecordsDirExists {
		t.Fatalf("expected failing readiness, got %+v", failing)
	}
}

func TestNamespacePolicyPersistenceMethods(t *testing.T) {
	s, err := Open(context.Background(), Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	entry := NamespacePolicyEntry{
		Namespace: "app/editor/session",
		OwnerType: "app",
		OwnerID:   "editor",
		Policy: map[string]any{
			"required_keys": []string{"title", "summary"},
		},
	}
	if err := s.UpsertNamespacePolicy(context.Background(), entry); err != nil {
		t.Fatalf("upsert: %v", err)
	}
	got, err := s.GetNamespacePolicy(context.Background(), entry.Namespace)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got.OwnerID != entry.OwnerID || got.OwnerType != entry.OwnerType {
		t.Fatalf("unexpected entry: %+v", got)
	}
	list, err := s.ListNamespacePolicies(context.Background())
	if err != nil {
		t.Fatalf("list: %v", err)
	}
	if len(list) != 1 || list[0].Namespace != entry.Namespace {
		t.Fatalf("unexpected list: %+v", list)
	}
}

func TestCompactionPreservesHeadsAndTrimsAudit(t *testing.T) {
	s, err := Open(context.Background(), Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	for i := 1; i <= 5; i++ {
		rec, err := s.AppendRecord(context.Background(), AppendInput{
			Namespace: "app/editor/session",
			Key:       "summary",
			Actor:     "app:editor",
			Payload:   json.RawMessage([]byte(`{"n":` + string(rune('0'+i)) + `}`)),
		})
		if err != nil {
			t.Fatalf("append %d: %v", i, err)
		}
		if err := s.RecordAuditEvent(context.Background(), AuditEvent{
			EventType: "write",
			Actor:     rec.Actor,
			Namespace: rec.Namespace,
			Key:       rec.Key,
			Revision:  rec.Revision,
			RecordID:  rec.RecordID,
		}); err != nil {
			t.Fatalf("audit %d: %v", i, err)
		}
	}

	deleted, err := s.CompactRevisions(context.Background(), 2)
	if err != nil {
		t.Fatalf("compact revisions: %v", err)
	}
	if deleted != 3 {
		t.Fatalf("expected 3 deleted revisions, got %d", deleted)
	}
	history, err := s.History(context.Background(), "app/editor/session", "summary", 0)
	if err != nil {
		t.Fatalf("history: %v", err)
	}
	if len(history) != 2 || history[0].Revision != 4 || history[1].Revision != 5 {
		t.Fatalf("unexpected history after compaction: %+v", history)
	}
	head, err := s.Head(context.Background(), "app/editor/session", "summary")
	if err != nil {
		t.Fatalf("head after compaction: %v", err)
	}
	if head.Revision != 5 {
		t.Fatalf("expected head revision 5 after compaction, got %d", head.Revision)
	}

	trimmed, err := s.TrimAuditEvents(context.Background(), 2)
	if err != nil {
		t.Fatalf("trim audit: %v", err)
	}
	if trimmed != 3 {
		t.Fatalf("expected 3 trimmed audit rows, got %d", trimmed)
	}
	events, err := s.ListAuditEvents(context.Background(), 10)
	if err != nil {
		t.Fatalf("list audit: %v", err)
	}
	if len(events) != 2 {
		t.Fatalf("expected 2 audit rows after trim, got %d", len(events))
	}
}

func TestQueryAuditEventsFiltersAndCursor(t *testing.T) {
	s, err := Open(context.Background(), Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	seed := []AuditEvent{
		{EventType: "write", Actor: "app:editor", Namespace: "app/editor/session", Key: "summary", Revision: 1, RecordID: "r1"},
		{EventType: "write", Actor: "app:editor", Namespace: "app/editor/session", Key: "summary", Revision: 2, RecordID: "r2"},
		{EventType: "promote", Actor: "user", Namespace: "user/notes", Key: "daily", Revision: 1, RecordID: "r3"},
	}
	for i := range seed {
		if err := s.RecordAuditEvent(context.Background(), seed[i]); err != nil {
			t.Fatalf("record audit %d: %v", i, err)
		}
	}

	pageOne, next, err := s.QueryAuditEvents(context.Background(), AuditQuery{Limit: 2})
	if err != nil {
		t.Fatalf("query page one: %v", err)
	}
	if len(pageOne) != 2 || next == nil {
		t.Fatalf("expected 2 items and next cursor, got len=%d next=%v", len(pageOne), next)
	}
	pageTwo, nextTwo, err := s.QueryAuditEvents(context.Background(), AuditQuery{Limit: 2, Cursor: *next})
	if err != nil {
		t.Fatalf("query page two: %v", err)
	}
	if len(pageTwo) != 1 || nextTwo != nil {
		t.Fatalf("expected final page len=1 and nil cursor, got len=%d next=%v", len(pageTwo), nextTwo)
	}
	if pageTwo[0].ID >= pageOne[len(pageOne)-1].ID {
		t.Fatalf("cursor did not advance to older window")
	}

	filtered, _, err := s.QueryAuditEvents(context.Background(), AuditQuery{
		Limit:     10,
		Namespace: "user/notes",
		EventType: "promote",
	})
	if err != nil {
		t.Fatalf("query filtered: %v", err)
	}
	if len(filtered) != 1 || filtered[0].EventType != "promote" || filtered[0].Namespace != "user/notes" {
		t.Fatalf("unexpected filtered result: %+v", filtered)
	}
}

func TestChecksumOnWrite(t *testing.T) {
	s, err := Open(context.Background(), Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	rec, err := s.AppendRecord(context.Background(), AppendInput{
		Namespace: "user/memory/test",
		Key:       "checksum-test",
		Actor:     "user",
		Payload:   []byte(`{"hello":"world"}`),
	})
	if err != nil {
		t.Fatalf("append: %v", err)
	}
	if rec.Checksum == "" {
		t.Fatal("expected non-empty checksum on new record")
	}
	// SHA-256 hex digest is always 64 hex characters.
	if len(rec.Checksum) != 64 {
		t.Fatalf("checksum wrong length: got %d want 64", len(rec.Checksum))
	}
}

func TestScanConsistencyChecksumCases(t *testing.T) {
	root := t.TempDir()
	s, err := Open(context.Background(), Config{RootDir: root})
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	defer s.Close()

	// Write 3 records.
	recs := make([]Record, 3)
	for i := range recs {
		recs[i], err = s.AppendRecord(context.Background(), AppendInput{
			Namespace: "user/memory/scan-test",
			Key:       fmt.Sprintf("key-%d", i),
			Actor:     "user",
			Payload:   []byte(`{"v":` + string(rune('0'+i)) + `}`),
		})
		if err != nil {
			t.Fatalf("append %d: %v", i, err)
		}
	}

	// Confirm clean scan — no corrupted issues.
	issues, err := s.ScanConsistency(context.Background())
	if err != nil {
		t.Fatalf("clean scan: %v", err)
	}
	for _, iss := range issues {
		if iss.Type == "corrupted" {
			t.Errorf("unexpected corrupted issue on clean store: %+v", iss)
		}
	}

	// Corrupt one file on disk. Store uses <root>/data/records/<namespace>/<key>/<revision>.json
	corruptPath := filepath.Join(root, "data", "records", recs[1].Namespace, recs[1].Key, fmt.Sprintf("%d.json", recs[1].Revision))
	if err := os.WriteFile(corruptPath, []byte(`{"v":"tampered"}`), 0o644); err != nil {
		t.Fatalf("corrupt file: %v", err)
	}

	issues, err = s.ScanConsistency(context.Background())
	if err != nil {
		t.Fatalf("scan after corrupt: %v", err)
	}

	var foundCorrupted bool
	for _, iss := range issues {
		if iss.Type == "corrupted" && iss.Key == "key-1" {
			foundCorrupted = true
		}
	}
	if !foundCorrupted {
		t.Errorf("expected corrupted issue for key-1, got: %+v", issues)
	}

	// Records key-0 and key-2 should not be corrupted.
	for _, iss := range issues {
		if iss.Type == "corrupted" && (iss.Key == "key-0" || iss.Key == "key-2") {
			t.Errorf("unexpected corrupted for %s: %+v", iss.Key, iss)
		}
	}
}
