package embedding

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// OllamaProvider generates embeddings via a local Ollama instance.
type OllamaProvider struct {
	endpoint   string
	model      string
	dimensions int
	client     *http.Client
}

// OllamaConfig configures the Ollama embedding provider.
type OllamaConfig struct {
	Endpoint   string // default http://127.0.0.1:11434
	Model      string // default nomic-embed-text
	Dimensions int    // default 768
}

// NewOllamaProvider creates a provider that calls the Ollama /api/embeddings endpoint.
func NewOllamaProvider(cfg OllamaConfig) *OllamaProvider {
	if cfg.Endpoint == "" {
		cfg.Endpoint = "http://127.0.0.1:11434"
	}
	if cfg.Model == "" {
		cfg.Model = "nomic-embed-text"
	}
	if cfg.Dimensions == 0 {
		cfg.Dimensions = 768
	}
	return &OllamaProvider{
		endpoint:   cfg.Endpoint,
		model:      cfg.Model,
		dimensions: cfg.Dimensions,
		client:     &http.Client{},
	}
}

func (p *OllamaProvider) Model() string  { return p.model }
func (p *OllamaProvider) Dimensions() int { return p.dimensions }

type ollamaRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
}

type ollamaResponse struct {
	Embedding []float64 `json:"embedding"`
}

func (p *OllamaProvider) Embed(ctx context.Context, text string) ([]float32, error) {
	body, err := json.Marshal(ollamaRequest{Model: p.model, Prompt: text})
	if err != nil {
		return nil, fmt.Errorf("embedding: marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, p.endpoint+"/api/embeddings", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("embedding: create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("embedding: ollama request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("embedding: ollama returned %d: %s", resp.StatusCode, string(respBody))
	}

	var result ollamaResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("embedding: decode response: %w", err)
	}

	if len(result.Embedding) == 0 {
		return nil, fmt.Errorf("embedding: ollama returned empty embedding")
	}

	// Convert float64 → float32.
	vec := make([]float32, len(result.Embedding))
	for i, v := range result.Embedding {
		vec[i] = float32(v)
	}
	return vec, nil
}
