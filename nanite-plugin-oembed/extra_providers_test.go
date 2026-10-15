package main

import (
	"strings"
	"testing"
)

func TestParseExtraProviders(t *testing.T) {
	tests := []struct {
		name     string
		blob     string
		wantErr  string
		wantLen  int
		wantName string
	}{
		{
			name: "valid single entry",
			blob: `
- name: Example
  pattern: "https?://example\\.com/posts/"
  endpoint: "https://example.com/oembed?url={url}&format=json"
`,
			wantLen:  1,
			wantName: "Example",
		},
		{
			name:    "missing name",
			blob:    "- pattern: \"https?://example\\\\.com/\"\n  endpoint: \"https://example.com/oembed?url={url}\"\n",
			wantErr: "name, pattern, and endpoint are all required",
		},
		{
			name:    "missing pattern",
			blob:    "- name: Example\n  endpoint: \"https://example.com/oembed?url={url}\"\n",
			wantErr: "name, pattern, and endpoint are all required",
		},
		{
			name:    "missing endpoint",
			blob:    "- name: Example\n  pattern: \"https?://example\\\\.com/\"\n",
			wantErr: "name, pattern, and endpoint are all required",
		},
		{
			name:    "invalid regex",
			blob:    "- name: Bad\n  pattern: \"[invalid(\"\n  endpoint: \"https://example.com/oembed?url={url}\"\n",
			wantErr: "invalid pattern",
		},
		{
			name:    "malformed yaml",
			blob:    "not: a: list",
			wantErr: "",
			wantLen: -1, // signals yaml error path — message varies by yaml.v3
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := parseExtraProviders(tt.blob)
			if tt.wantErr != "" {
				if err == nil {
					t.Fatalf("expected error containing %q, got nil", tt.wantErr)
				}
				if !strings.Contains(err.Error(), tt.wantErr) {
					t.Fatalf("error = %q, want substring %q", err.Error(), tt.wantErr)
				}
				return
			}
			if tt.wantLen == -1 {
				if err == nil {
					t.Fatalf("expected yaml error, got nil")
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if len(got) != tt.wantLen {
				t.Fatalf("got %d providers, want %d", len(got), tt.wantLen)
			}
			if tt.wantName != "" && got[0].Name != tt.wantName {
				t.Fatalf("provider[0].Name = %q, want %q", got[0].Name, tt.wantName)
			}
		})
	}
}

func TestMatchProviderIn_IncludesExtras(t *testing.T) {
	blob := `
- name: Custom
  pattern: "https?://custom\\.example/posts/"
  endpoint: "https://custom.example/oembed?url={url}"
`
	extras, err := parseExtraProviders(blob)
	if err != nil {
		t.Fatalf("parseExtraProviders error: %v", err)
	}
	merged := append(append([]*Provider(nil), DefaultProviders...), extras...)

	t.Run("default provider still matches", func(t *testing.T) {
		p := matchProviderIn(merged, "https://www.youtube.com/watch?v=abc")
		if p == nil || p.Name != "YouTube" {
			t.Fatalf("YouTube match failed, got %+v", p)
		}
	})

	t.Run("extra provider matches after default", func(t *testing.T) {
		p := matchProviderIn(merged, "https://custom.example/posts/42")
		if p == nil || p.Name != "Custom" {
			t.Fatalf("Custom match failed, got %+v", p)
		}
	})

	t.Run("unknown URL returns nil", func(t *testing.T) {
		p := matchProviderIn(merged, "https://nowhere.example/xyz")
		if p != nil {
			t.Fatalf("expected nil, got %+v", p)
		}
	})
}
