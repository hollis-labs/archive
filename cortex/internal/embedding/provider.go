package embedding

import "context"

// Provider generates text embeddings.
type Provider interface {
	// Embed returns a float32 vector for the given text.
	Embed(ctx context.Context, text string) ([]float32, error)
	// Model returns the model identifier (e.g. "nomic-embed-text").
	Model() string
	// Dimensions returns the expected vector length.
	Dimensions() int
}
