package memory_test

import (
	"context"
	"errors"
	"testing"

	"github.com/hollis-labs/cortex/internal/memory"
)

func TestNoopEmbedderReturnsUnavailable(t *testing.T) {
	var e memory.Embedder = memory.NoopEmbedder{}
	vec, err := e.Embed(context.Background(), "anything")
	if err == nil {
		t.Fatalf("expected NoopEmbedder to return a structured unavailable error, got nil")
	}
	if !errors.Is(err, memory.ErrEmbedderUnavailable) {
		t.Fatalf("expected ErrEmbedderUnavailable, got %v", err)
	}
	if vec != nil {
		t.Fatalf("expected nil vector, got %v", vec)
	}
	if e.Model() != "" {
		t.Fatalf("expected empty model for noop, got %q", e.Model())
	}
	if e.Dimensions() != 0 {
		t.Fatalf("expected 0 dimensions for noop, got %d", e.Dimensions())
	}
}

func TestNoopQueueSwallowsJobs(t *testing.T) {
	var q memory.JobQueue = memory.NoopQueue{}
	err := q.Enqueue(context.Background(), memory.Job{Kind: "embed", Payload: []byte("{}")})
	if err != nil {
		t.Fatalf("NoopQueue.Enqueue should never error, got %v", err)
	}
	// Should also accept an empty job.
	if err := q.Enqueue(context.Background(), memory.Job{}); err != nil {
		t.Fatalf("NoopQueue.Enqueue on empty job should not error, got %v", err)
	}
}
