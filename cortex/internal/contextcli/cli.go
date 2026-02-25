package contextcli

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
	"strings"
	"text/tabwriter"

	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

// CLI implements context command handlers.
type CLI struct {
	Store  *contextstore.Store
	Policy *contextpolicy.Engine
	Stdout io.Writer
	Stderr io.Writer
}

// Run executes `context ...` commands.
func (c *CLI) Run(ctx context.Context, args []string) int {
	if c.Stdout == nil {
		c.Stdout = os.Stdout
	}
	if c.Stderr == nil {
		c.Stderr = os.Stderr
	}
	if c.Policy == nil {
		c.Policy = contextpolicy.New()
	}
	if c.Store == nil {
		return c.fail("store is required")
	}
	if len(args) == 0 || args[0] != "context" {
		return c.fail("usage: context <namespace|put|get|history|view|promote> ...")
	}
	if len(args) < 2 {
		return c.fail("missing context subcommand")
	}

	switch args[1] {
	case "namespace":
		return c.runNamespace(args[2:])
	case "put":
		return c.runPut(ctx, args[2:])
	case "get":
		return c.runGet(ctx, args[2:])
	case "history":
		return c.runHistory(ctx, args[2:])
	case "view":
		return c.runView(ctx, args[2:])
	case "promote":
		return c.runPromote(ctx, args[2:])
	default:
		return c.fail("unknown subcommand: " + args[1])
	}
}

func (c *CLI) runNamespace(args []string) int {
	if len(args) == 0 || args[0] != "register" {
		return c.fail("usage: context namespace register --namespace ... --owner-type ... --owner-id ...")
	}
	fs := flag.NewFlagSet("namespace register", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	namespace := fs.String("namespace", "", "namespace")
	ownerType := fs.String("owner-type", "", "owner-type")
	ownerID := fs.String("owner-id", "", "owner-id")
	if err := fs.Parse(args[1:]); err != nil {
		return c.fail(err.Error())
	}
	if err := c.Policy.RegisterNamespace(*namespace, *ownerType, *ownerID, nil); err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"namespace": *namespace, "owner_type": *ownerType, "owner_id": *ownerID})
}

func (c *CLI) runPut(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("put", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	clientID := fs.String("client-id", "", "client-id")
	actor := fs.String("actor", "", "actor")
	namespace := fs.String("namespace", "", "namespace")
	key := fs.String("key", "", "key")
	jsonArg := fs.String("json", "", "json payload")
	fileArg := fs.String("file", "", "payload file")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	payload, err := readPayload(*jsonArg, *fileArg)
	if err != nil {
		return c.fail(err.Error())
	}
	if err := c.Policy.CanWrite(*clientID, *actor, *namespace); err != nil {
		return c.fail(err.Error())
	}
	rec, err := c.Store.AppendRecord(ctx, contextstore.AppendInput{Namespace: *namespace, Key: *key, Actor: *actor, Payload: payload})
	if err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(rec)
}

func (c *CLI) runGet(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("get", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	namespace := fs.String("namespace", "", "namespace")
	key := fs.String("key", "", "key")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	rec, err := c.Store.Head(ctx, *namespace, *key)
	if err != nil {
		return c.fail(err.Error())
	}
	return c.writeRecords([]contextstore.Record{rec}, *output)
}

func (c *CLI) runHistory(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("history", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	namespace := fs.String("namespace", "", "namespace")
	key := fs.String("key", "", "key")
	limit := fs.Int("limit", 0, "limit")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	recs, err := c.Store.History(ctx, *namespace, *key, *limit)
	if err != nil {
		return c.fail(err.Error())
	}
	return c.writeRecords(recs, *output)
}

func (c *CLI) runView(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("view", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	selector := fs.String("selector", "", "selector json")
	selectorFile := fs.String("selector-file", "", "selector file")
	includePayload := fs.Bool("include-payload", false, "include payload")
	limit := fs.Int("limit", 0, "limit")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}

	sel, err := readSelector(*selector, *selectorFile)
	if err != nil {
		return c.fail(err.Error())
	}
	if *limit > 0 {
		sel.Limit = *limit
	}
	recs, err := c.Store.Select(ctx, sel)
	if err != nil {
		return c.fail(err.Error())
	}
	if !*includePayload {
		for i := range recs {
			recs[i].Payload = nil
		}
	}
	return c.writeRecords(recs, *output)
}

func (c *CLI) runPromote(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("promote", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	clientID := fs.String("client-id", "", "client-id")
	actor := fs.String("actor", "", "actor")
	fromNamespace := fs.String("from-namespace", "", "from-namespace")
	fromKey := fs.String("from-key", "", "from-key")
	toNamespace := fs.String("to-namespace", "", "to-namespace")
	toKey := fs.String("to-key", "", "to-key")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}

	if err := c.Policy.CanPromote(*actor, *toNamespace); err != nil {
		return c.fail(err.Error())
	}
	src, err := c.Store.Head(ctx, *fromNamespace, *fromKey)
	if err != nil {
		return c.fail(err.Error())
	}
	if err := c.Policy.CanWrite(*clientID, *actor, *toNamespace); err != nil {
		return c.fail(err.Error())
	}
	out, err := c.Store.AppendRecord(ctx, contextstore.AppendInput{
		Namespace: *toNamespace,
		Key:       *toKey,
		Actor:     *actor,
		Payload:   src.Payload,
	})
	if err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"promoted_record_id": out.RecordID, "target_revision": out.Revision})
}

func (c *CLI) writeRecords(recs []contextstore.Record, output string) int {
	switch strings.TrimSpace(output) {
	case "json", "":
		return c.writeJSON(recs)
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "NAMESPACE\tKEY\tREVISION\tACTOR")
		for _, rec := range recs {
			_, _ = fmt.Fprintf(w, "%s\t%s\t%d\t%s\n", rec.Namespace, rec.Key, rec.Revision, rec.Actor)
		}
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) writeJSON(value any) int {
	enc := json.NewEncoder(c.Stdout)
	if err := enc.Encode(value); err != nil {
		return c.fail(err.Error())
	}
	return 0
}

func (c *CLI) fail(msg string) int {
	_, _ = fmt.Fprintln(c.Stderr, "error:", msg)
	return 1
}

func readPayload(raw, filePath string) (json.RawMessage, error) {
	if strings.TrimSpace(raw) == "" && strings.TrimSpace(filePath) == "" {
		return nil, errors.New("provide one of --json or --file")
	}
	if strings.TrimSpace(raw) != "" && strings.TrimSpace(filePath) != "" {
		return nil, errors.New("provide only one of --json or --file")
	}
	if strings.TrimSpace(raw) != "" {
		if !json.Valid([]byte(raw)) {
			return nil, errors.New("--json must be valid JSON")
		}
		return json.RawMessage(raw), nil
	}
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	if !json.Valid(data) {
		return nil, errors.New("--file payload must be valid JSON")
	}
	return data, nil
}

func readSelector(raw, filePath string) (contextstore.Selector, error) {
	if strings.TrimSpace(raw) == "" && strings.TrimSpace(filePath) == "" {
		return contextstore.Selector{}, errors.New("provide one of --selector or --selector-file")
	}
	if strings.TrimSpace(raw) != "" && strings.TrimSpace(filePath) != "" {
		return contextstore.Selector{}, errors.New("provide only one of --selector or --selector-file")
	}
	var data []byte
	if strings.TrimSpace(raw) != "" {
		data = []byte(raw)
	} else {
		b, err := os.ReadFile(filePath)
		if err != nil {
			return contextstore.Selector{}, err
		}
		data = b
	}
	var out contextstore.Selector
	if err := json.Unmarshal(data, &out); err != nil {
		return contextstore.Selector{}, err
	}
	return out, nil
}
