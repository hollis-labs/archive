package contextstore

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"reflect"
	"testing"
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
