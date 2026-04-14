package main

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"regexp"
	"strings"
	"testing"
	"time"
)

func TestMatchProvider(t *testing.T) {
	tests := []struct {
		name string
		url  string
		want string
	}{
		{name: "youtube", url: "https://www.youtube.com/watch?v=abc", want: "YouTube"},
		{name: "spotify", url: "https://open.spotify.com/track/123", want: "Spotify"},
		{name: "vimeo", url: "https://vimeo.com/12345", want: "Vimeo"},
		{name: "soundcloud", url: "https://soundcloud.com/user/track", want: "SoundCloud"},
		{name: "flickr", url: "https://www.flickr.com/photos/user/123", want: "Flickr"},
		{name: "unknown", url: "https://example.com", want: ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MatchProvider(tt.url)
			if tt.want == "" {
				if got != nil {
					t.Fatalf("MatchProvider(%q) = %v, want nil", tt.url, got)
				}
				return
			}
			if got == nil || got.Name != tt.want {
				t.Fatalf("MatchProvider(%q) = %v, want %q", tt.url, got, tt.want)
			}
		})
	}
}

func TestFetchOEmbed(t *testing.T) {
	oldClient := httpClient
	oldCache := fetchCache
	t.Cleanup(func() {
		httpClient = oldClient
		fetchCache = oldCache
	})

	transport := roundTripperFunc(func(req *http.Request) (*http.Response, error) {
		switch req.URL.Path {
		case "/youtube":
			return responseJSON(oembedRawResponse{
				Title:        "Video title",
				Description:  "Video description",
				ThumbnailURL: "https://img.example/thumb.jpg",
				ProviderName: "YouTube",
				ProviderURL:  "https://youtube.com",
				Type:         "video",
				AuthorName:   "Creator",
				HTML:         "<iframe></iframe>",
			}), nil
		case "/spotify":
			return responseJSON(oembedRawResponse{
				Title:        "Song title",
				Description:  "Song description",
				ProviderName: "Spotify",
				ProviderURL:  "https://spotify.com",
				Type:         "photo",
				URL:          "https://img.example/photo.jpg",
			}), nil
		case "/http-error":
			return &http.Response{
				StatusCode: http.StatusBadGateway,
				Body:       io.NopCloser(strings.NewReader("bad gateway")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		case "/parse-error":
			return &http.Response{
				StatusCode: http.StatusOK,
				Body:       io.NopCloser(strings.NewReader("{bad json")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		default:
			return &http.Response{
				StatusCode: http.StatusNotFound,
				Body:       io.NopCloser(strings.NewReader("not found")),
				Header:     make(http.Header),
				Request:    req,
			}, nil
		}
	})

	httpClient = &http.Client{Transport: transport}
	fetchCache = newOEmbedCache(10 * time.Minute)

	tests := []struct {
		name         string
		path         string
		rawURL       string
		wantErr      bool
		wantTitle    string
		wantThumbURL string
		provider     *Provider
	}{
		{
			name:         "youtube",
			path:         "/youtube",
			rawURL:       "https://www.youtube.com/watch?v=abc",
			wantTitle:    "Video title",
			wantThumbURL: "https://img.example/thumb.jpg",
			provider: &Provider{
				Name:        "YouTube",
				URLPatterns: []*regexp.Regexp{regexp.MustCompile(`https?://(www\.)?youtube\.com/watch\?`)},
				Endpoint:    "https://example.test/youtube?url={url}",
			},
		},
		{
			name:         "spotify photo fallback",
			path:         "/spotify",
			rawURL:       "https://open.spotify.com/track/123",
			wantTitle:    "Song title",
			wantThumbURL: "https://img.example/photo.jpg",
			provider: &Provider{
				Name:        "Spotify",
				URLPatterns: []*regexp.Regexp{regexp.MustCompile(`https?://open\.spotify\.com/track/`)},
				Endpoint:    "https://example.test/spotify?url={url}",
			},
		},
		{
			name:    "http error",
			path:    "/http-error",
			rawURL:  "https://vimeo.com/12345",
			wantErr: true,
			provider: &Provider{
				Name:        "Vimeo",
				URLPatterns: []*regexp.Regexp{regexp.MustCompile(`https?://(www\.)?vimeo\.com/\d+`)},
				Endpoint:    "https://example.test/http-error?url={url}",
			},
		},
		{
			name:    "json parse error",
			path:    "/parse-error",
			rawURL:  "https://soundcloud.com/user/track",
			wantErr: true,
			provider: &Provider{
				Name:        "SoundCloud",
				URLPatterns: []*regexp.Regexp{regexp.MustCompile(`https?://soundcloud\.com/.+/.+`)},
				Endpoint:    "https://example.test/parse-error?url={url}",
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fetchCache = newOEmbedCache(10 * time.Minute)

			got, err := FetchOEmbed(context.Background(), tt.provider, tt.rawURL)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("FetchOEmbed(%q) error = nil, want error", tt.rawURL)
				}
				return
			}
			if err != nil {
				t.Fatalf("FetchOEmbed(%q) error = %v", tt.rawURL, err)
			}
			if got == nil {
				t.Fatalf("FetchOEmbed(%q) = nil, want result", tt.rawURL)
			}
			if got.Title != tt.wantTitle {
				t.Fatalf("title = %q, want %q", got.Title, tt.wantTitle)
			}
			if got.ThumbnailURL != tt.wantThumbURL {
				t.Fatalf("thumbnail_url = %q, want %q", got.ThumbnailURL, tt.wantThumbURL)
			}
		})
	}

	t.Run("cache hit dedupes repeated URL", func(t *testing.T) {
		fetchCache = newOEmbedCache(10 * time.Minute)

		provider := &Provider{
			Name:        "cache",
			URLPatterns: []*regexp.Regexp{regexp.MustCompile(`https?://(www\.)?youtube\.com/watch\?`)},
			Endpoint:    "https://example.test/youtube?url={url}",
		}

		first, err := FetchOEmbed(context.Background(), provider, "https://www.youtube.com/watch?v=abc")
		if err != nil {
			t.Fatalf("first FetchOEmbed error = %v", err)
		}
		second, err := FetchOEmbed(context.Background(), provider, "https://www.youtube.com/watch?v=abc")
		if err != nil {
			t.Fatalf("second FetchOEmbed error = %v", err)
		}
		if first.Title != second.Title {
			t.Fatalf("cached title = %q, want %q", second.Title, first.Title)
		}
	})
}

func responseJSON(payload oembedRawResponse) *http.Response {
	body, _ := json.Marshal(payload)
	return &http.Response{
		StatusCode: http.StatusOK,
		Body:       io.NopCloser(strings.NewReader(string(body))),
		Header:     make(http.Header),
	}
}

type roundTripperFunc func(*http.Request) (*http.Response, error)

func (f roundTripperFunc) RoundTrip(req *http.Request) (*http.Response, error) {
	return f(req)
}
