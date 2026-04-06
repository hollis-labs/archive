package memory

import (
	"context"
	"errors"
)

// ErrEmbedderUnavailable is returned when no real embedder is wired.
// Callers check for this sentinel via errors.Is to know when to surface
// a structured "embeddings not available" response.
var ErrEmbedderUnavailable = errors.New("embedder unavailable")

// Embedder is the abstract interface memory calls when embeddings are
// needed. At D-core time the only implementation is NoopEmbedder. When
// Tracks H and I land, real providers implement this interface and are
// injected in place of the stub in main.go.
type Embedder interface {
	Embed(ctx context.Context, text string) ([]float32, error)
	Model() string
	Dimensions() int
}

// Compile-time assertion that NoopEmbedder satisfies Embedder.
var _ Embedder = NoopEmbedder{}

// NoopEmbedder is the D-core stub. Every Embed call returns
// ErrEmbedderUnavailable. It exists so that code paths referencing an
// embedder can be wired and compiled without a real provider.
type NoopEmbedder struct{}

// Embed always returns ErrEmbedderUnavailable.
func (NoopEmbedder) Embed(_ context.Context, _ string) ([]float32, error) {
	return nil, ErrEmbedderUnavailable
}

// Model returns the empty string for the no-op implementation.
func (NoopEmbedder) Model() string { return "" }

// Dimensions returns zero for the no-op implementation.
func (NoopEmbedder) Dimensions() int { return 0 }
