package embedding

import (
	"context"
	"crypto/sha256"
	"encoding/binary"
	"math"
)

// MockProvider generates deterministic embeddings for testing.
// The same text always produces the same vector, enabling reproducible tests.
type MockProvider struct {
	model      string
	dimensions int
}

// NewMockProvider creates a mock that generates deterministic vectors.
func NewMockProvider(dimensions int) *MockProvider {
	return &MockProvider{model: "mock-embed", dimensions: dimensions}
}

func (p *MockProvider) Model() string  { return p.model }
func (p *MockProvider) Dimensions() int { return p.dimensions }

func (p *MockProvider) Embed(_ context.Context, text string) ([]float32, error) {
	hash := sha256.Sum256([]byte(text))
	vec := make([]float32, p.dimensions)
	for i := range vec {
		// Use hash bytes cyclically to seed deterministic floats.
		idx := (i * 4) % len(hash)
		bits := binary.LittleEndian.Uint32(hash[idx : idx+4])
		// Map to [-1, 1] range.
		vec[i] = float32(bits)/float32(math.MaxUint32)*2 - 1
	}
	// Normalize to unit vector for cosine similarity.
	var norm float32
	for _, v := range vec {
		norm += v * v
	}
	norm = float32(math.Sqrt(float64(norm)))
	if norm > 0 {
		for i := range vec {
			vec[i] /= norm
		}
	}
	return vec, nil
}
