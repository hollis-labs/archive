package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

// Result is the shape returned by Search and serialized into both the
// command envelope and the MCP tool Content payload.
type Result struct {
	Title  string `json:"title"`
	GifURL string `json:"gif_url"`
	Source string `json:"source"`
	Query  string `json:"query"`
}

// giphyAPIResponse mirrors the relevant subset of Giphy's
// /v1/gifs/search JSON response.
type giphyAPIResponse struct {
	Data []struct {
		Title  string `json:"title"`
		Images struct {
			Original   struct{ URL string `json:"url"` } `json:"original"`
			FixedWidth struct{ URL string `json:"url"` } `json:"fixed_width"`
		} `json:"images"`
	} `json:"data"`
}

// demoGifs is a small fallback set used when no API key is configured
// so the plugin can be exercised end-to-end during development without
// a Giphy account.
var demoGifs = map[string]string{
	"celebration": "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
	"success":     "https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif",
	"cat":         "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
	"cats":        "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
	"dog":         "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
	"coding":      "https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif",
	"coffee":      "https://media.giphy.com/media/DrJm6F9poo4aA/giphy.gif",
	"rocket":      "https://media.giphy.com/media/mi6DsSSNKDbUY/giphy.gif",
	"fire":        "https://media.giphy.com/media/j3IxJRLNLZz9sXR7ZA/giphy.gif",
	"balloons":    "https://media.giphy.com/media/26DNdtFJpLXJiwe2Q/giphy.gif",
}

// Search returns a single Giphy result for query. When apiKey is empty
// it returns a deterministic pick from demoGifs. A (nil, nil) return
// means the API responded successfully but with no matches.
func Search(ctx context.Context, client *http.Client, apiKey, rating, query string) (*Result, error) {
	query = strings.TrimSpace(query)
	if query == "" {
		return nil, fmt.Errorf("query is required")
	}
	if apiKey == "" {
		return searchDemo(query), nil
	}
	if rating == "" {
		rating = "g"
	}
	return searchLive(ctx, client, apiKey, rating, query)
}

func searchDemo(query string) *Result {
	lower := strings.ToLower(query)
	var gifURL string
	for keyword, u := range demoGifs {
		if strings.Contains(lower, keyword) {
			gifURL = u
			break
		}
	}
	if gifURL == "" {
		// Deterministic fallback keyed off query so repeat queries
		// return the same demo GIF.
		keys := make([]string, 0, len(demoGifs))
		for k := range demoGifs {
			keys = append(keys, k)
		}
		h := 0
		for _, c := range query {
			h = h*31 + int(c)
		}
		if h < 0 {
			h = -h
		}
		// Stable ordering regardless of map iteration order.
		sortStrings(keys)
		gifURL = demoGifs[keys[h%len(keys)]]
	}
	return &Result{
		Title:  fmt.Sprintf("Here's your %s!", query),
		GifURL: gifURL,
		Source: "GIPHY (demo mode)",
		Query:  query,
	}
}

func searchLive(ctx context.Context, client *http.Client, apiKey, rating, query string) (*Result, error) {
	q := url.Values{}
	q.Set("api_key", apiKey)
	q.Set("q", query)
	q.Set("limit", "1")
	q.Set("rating", rating)
	reqURL := "https://api.giphy.com/v1/gifs/search?" + q.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, reqURL, nil)
	if err != nil {
		return nil, fmt.Errorf("build request: %w", err)
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("giphy api: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("giphy api: %s", resp.Status)
	}

	body, err := io.ReadAll(io.LimitReader(resp.Body, 256*1024))
	if err != nil {
		return nil, fmt.Errorf("read response: %w", err)
	}
	var api giphyAPIResponse
	if err := json.Unmarshal(body, &api); err != nil {
		return nil, fmt.Errorf("parse response: %w", err)
	}
	if len(api.Data) == 0 {
		return nil, nil
	}

	gif := api.Data[0]
	gifURL := gif.Images.Original.URL
	if gifURL == "" {
		gifURL = gif.Images.FixedWidth.URL
	}
	return &Result{
		Title:  fmt.Sprintf("Here's your %s!", query),
		GifURL: gifURL,
		Source: "GIPHY",
		Query:  query,
	}, nil
}

// sortStrings sorts s in place. Inlined so the package keeps its
// plugin-sdk-only direct dependency set (no stdlib "sort" import
// needed).
func sortStrings(s []string) {
	for i := 1; i < len(s); i++ {
		for j := i; j > 0 && s[j-1] > s[j]; j-- {
			s[j-1], s[j] = s[j], s[j-1]
		}
	}
}
