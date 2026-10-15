// Giphy is a subprocess plugin for Nanite. It exposes:
//
//   - a /giphy <query> slash command that renders a giphy-modal envelope
//   - a giphy.search MCP tool that returns structured GIF metadata plus
//     the same envelope for agent-facing use
//
// Runtime: the host spawns this binary as a subprocess, speaks JSON-RPC
// over stdio, and passes the Giphy API key via InitParams.Config (which
// the host resolves from GIPHY_API_KEY or keychain per plugin.yaml).
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	plugin "github.com/hollis-labs/plugin-sdk"
	"github.com/hollis-labs/plugin-sdk/subprocess"
)

const envelopeType = "giphy-modal"

// giphyPlugin is the subprocess plugin implementation. It satisfies
// subprocess.Plugin (Init/Load/Unload), subprocess.CommandHandler, and
// subprocess.MCPHandler.
type giphyPlugin struct {
	apiKey string
	rating string
	client *http.Client
}

func (p *giphyPlugin) Init(ctx context.Context, params subprocess.InitParams) (subprocess.InitResult, error) {
	p.apiKey = params.Config["giphy_api_key"]
	p.rating = params.Config["giphy_rating"]
	if p.rating == "" {
		p.rating = "g"
	}
	p.client = &http.Client{Timeout: 5 * time.Second}

	return subprocess.InitResult{
		ID:          "giphy",
		Name:        "Giphy",
		Version:     "0.1.0",
		Description: "Giphy GIF search",
		Protocol:    subprocess.ProtocolVersion,
	}, nil
}

func (p *giphyPlugin) Load(ctx context.Context) (subprocess.LoadResult, error) {
	return subprocess.LoadResult{}, nil
}

func (p *giphyPlugin) Unload(ctx context.Context) error { return nil }

// Command handles /giphy <query>. An empty query returns a user-visible
// error message; search failures degrade to an error-action response so
// the chat surface can render it without special casing.
func (p *giphyPlugin) Command(ctx context.Context, req subprocess.CommandRequest) (subprocess.CommandResult, error) {
	query := req.Args
	if query == "" {
		return subprocess.CommandResult{Action: "error", Content: "usage: /giphy <query>"}, nil
	}

	res, err := Search(ctx, p.client, p.apiKey, p.rating, query)
	if err != nil {
		return subprocess.CommandResult{Action: "error", Content: fmt.Sprintf("giphy: %v", err)}, nil
	}
	if res == nil {
		return subprocess.CommandResult{Action: "message", Content: fmt.Sprintf("No GIFs found for %q.", query)}, nil
	}

	env := plugin.EnvelopeOut{
		Type: envelopeType,
		Data: map[string]interface{}{
			"title":   res.Title,
			"gif_url": res.GifURL,
			"source":  res.Source,
			"query":   res.Query,
		},
	}
	return subprocess.CommandResult{
		Action:    "message",
		Content:   res.Title,
		Envelopes: []plugin.EnvelopeOut{env},
	}, nil
}

// MCPCallTool routes mcp/call_tool invocations. Only the `search` tool
// is currently served; any other name returns an MCP-level error result
// (IsError=true) so the agent can surface the failure without tearing
// down the transport.
func (p *giphyPlugin) MCPCallTool(ctx context.Context, req subprocess.MCPCallRequest) (subprocess.MCPCallResult, error) {
	if req.ToolName != "search" {
		return mcpError(fmt.Sprintf("unknown tool %q", req.ToolName))
	}
	query, _ := req.Arguments["query"].(string)
	if query == "" {
		return mcpError("argument 'query' is required")
	}

	res, err := Search(ctx, p.client, p.apiKey, p.rating, query)
	if err != nil {
		return mcpError(err.Error())
	}
	if res == nil {
		payload, _ := json.Marshal(map[string]interface{}{"found": false, "query": query})
		return subprocess.MCPCallResult{Content: payload}, nil
	}

	payload, err := json.Marshal(res)
	if err != nil {
		return mcpError(fmt.Sprintf("marshal result: %v", err))
	}
	env := plugin.EnvelopeOut{
		Type: envelopeType,
		Data: map[string]interface{}{
			"title":   res.Title,
			"gif_url": res.GifURL,
			"source":  res.Source,
			"query":   res.Query,
		},
	}
	return subprocess.MCPCallResult{
		Content:   payload,
		Envelopes: []plugin.EnvelopeOut{env},
	}, nil
}

func mcpError(msg string) (subprocess.MCPCallResult, error) {
	payload, _ := json.Marshal(map[string]string{"error": msg})
	return subprocess.MCPCallResult{Content: payload, IsError: true}, nil
}

func main() {
	if err := subprocess.Serve(&giphyPlugin{}); err != nil {
		os.Exit(1)
	}
}
