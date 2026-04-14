// oEmbed subprocess plugin entrypoint.
//
// The plugin subscribes to `message.sent` events. For each non-command
// message (not prefixed with `!`), it scans the body for http(s) URLs,
// matches the first one against a known oEmbed provider, fetches the
// provider's oEmbed metadata, and attaches an `oembed-card` envelope to
// the event result. The host's chat transport is expected to forward
// envelopes to the UI (see BLG-20260413-012 for the post-hook consumer
// path).
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	plugin "github.com/hollis-labs/plugin-sdk"
	"github.com/hollis-labs/plugin-sdk/subprocess"
	"gopkg.in/yaml.v3"
)

const envelopeType = "oembed-card"

// urlRegex matches http(s):// URLs inside a message body.
var urlRegex = regexp.MustCompile(`https?://[^\s<>"]+`)

type oembedPlugin struct {
	providers []*Provider
}

func (p *oembedPlugin) Init(ctx context.Context, params subprocess.InitParams) (subprocess.InitResult, error) {
	providers := append([]*Provider(nil), DefaultProviders...)

	if extra := params.Config["oembed_extra_providers"]; extra != "" {
		parsed, err := parseExtraProviders(extra)
		if err != nil {
			return subprocess.InitResult{}, fmt.Errorf("oembed_extra_providers: %w", err)
		}
		providers = append(providers, parsed...)
	}
	p.providers = providers

	httpClient = &http.Client{Timeout: 5 * time.Second}
	fetchCache = newOEmbedCache(10 * time.Minute)

	return subprocess.InitResult{
		ID:          "oembed",
		Name:        "oEmbed Rich Previews",
		Version:     "0.1.0",
		Description: "Automatic rich previews for YouTube, Spotify, Vimeo, SoundCloud, Flickr, and user-configured oEmbed providers.",
		Protocol:    subprocess.ProtocolVersion,
	}, nil
}

func (p *oembedPlugin) Load(ctx context.Context) (subprocess.LoadResult, error) {
	return subprocess.LoadResult{}, nil
}

func (p *oembedPlugin) Unload(ctx context.Context) error { return nil }

// EventHandle services `message.sent` post-hook events. Pre-hook is
// never expected for this plugin (plugin.yaml registers no pre-hook),
// so Cancel is always false.
func (p *oembedPlugin) EventHandle(ctx context.Context, req subprocess.EventRequest) (subprocess.EventResult, error) {
	if req.Type != "message.sent" {
		return subprocess.EventResult{}, nil
	}

	content, _ := req.Data["content"].(string)
	if content == "" {
		return subprocess.EventResult{}, nil
	}
	if strings.HasPrefix(strings.TrimLeft(content, " \t"), "!") {
		return subprocess.EventResult{}, nil
	}

	urls := urlRegex.FindAllString(content, 5)
	for _, raw := range urls {
		provider := matchProviderIn(p.providers, raw)
		if provider == nil {
			continue
		}
		result, err := FetchOEmbed(ctx, provider, raw)
		if err != nil || result == nil {
			continue
		}
		env := plugin.EnvelopeOut{
			Type: envelopeType,
			Data: map[string]interface{}{
				"title":         result.Title,
				"description":   result.Description,
				"thumbnail_url": result.ThumbnailURL,
				"provider_name": result.ProviderName,
				"provider_url":  result.ProviderURL,
				"type":          result.Type,
				"url":           result.URL,
				"author_name":   result.AuthorName,
				"html":          result.HTML,
			},
		}
		return subprocess.EventResult{Envelopes: []plugin.EnvelopeOut{env}}, nil
	}
	return subprocess.EventResult{}, nil
}

// extraProvider is the YAML shape users supply via the
// `oembed_extra_providers` config. Pattern is a single regex applied
// to the raw URL; endpoint is the oEmbed endpoint template with a
// `{url}` placeholder.
type extraProvider struct {
	Name     string `yaml:"name"`
	Pattern  string `yaml:"pattern"`
	Endpoint string `yaml:"endpoint"`
}

func parseExtraProviders(blob string) ([]*Provider, error) {
	var raw []extraProvider
	if err := yaml.Unmarshal([]byte(blob), &raw); err != nil {
		return nil, err
	}
	out := make([]*Provider, 0, len(raw))
	for i, ep := range raw {
		if ep.Name == "" || ep.Pattern == "" || ep.Endpoint == "" {
			return nil, fmt.Errorf("entry %d: name, pattern, and endpoint are all required", i)
		}
		re, err := regexp.Compile(ep.Pattern)
		if err != nil {
			return nil, fmt.Errorf("entry %d (%s): invalid pattern: %w", i, ep.Name, err)
		}
		out = append(out, &Provider{
			Name:        ep.Name,
			URLPatterns: []*regexp.Regexp{re},
			Endpoint:    ep.Endpoint,
		})
	}
	return out, nil
}

// matchProviderIn is a non-global variant of MatchProvider used at
// runtime so user-supplied providers participate in matching.
func matchProviderIn(providers []*Provider, rawURL string) *Provider {
	for _, provider := range providers {
		for _, pattern := range provider.URLPatterns {
			if pattern.MatchString(rawURL) {
				return provider
			}
		}
	}
	return nil
}

func main() {
	if err := subprocess.Serve(&oembedPlugin{}); err != nil {
		fmt.Fprintf(os.Stderr, "oembed: subprocess serve failed: %v\n", err)
		os.Exit(1)
	}
}
