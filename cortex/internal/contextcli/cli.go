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
	"time"

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
	case "doctor":
		return c.runDoctor(ctx, args[2:])
	case "repair-heads":
		return c.runRepairHeads(ctx, args[2:])
	case "audit":
		return c.runAudit(ctx, args[2:])
	case "token":
		return c.runToken(ctx, args[2:])
	case "backup":
		return c.runBackup(ctx, args[2:])
	case "health":
		return c.runHealth(ctx, args[2:])
	default:
		return c.fail("unknown subcommand: " + args[1])
	}
}

func (c *CLI) runNamespace(args []string) int {
	if len(args) == 0 {
		return c.fail("usage: context namespace <register|show> ...")
	}
	switch args[0] {
	case "register":
		return c.runNamespaceRegister(args[1:])
	case "show":
		return c.runNamespaceShow(args[1:])
	default:
		return c.fail("usage: context namespace <register|show> ...")
	}
}

func (c *CLI) runNamespaceRegister(args []string) int {
	fs := flag.NewFlagSet("namespace register", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	namespace := fs.String("namespace", "", "namespace")
	ownerType := fs.String("owner-type", "", "owner-type")
	ownerID := fs.String("owner-id", "", "owner-id")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	if err := c.Policy.RegisterNamespace(*namespace, *ownerType, *ownerID, nil); err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"namespace": *namespace, "owner_type": *ownerType, "owner_id": *ownerID})
}

func (c *CLI) runNamespaceShow(args []string) int {
	fs := flag.NewFlagSet("namespace show", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	namespace := fs.String("namespace", "", "namespace")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	owner, ok := c.Policy.GetNamespace(*namespace)
	if !ok {
		return c.fail("namespace not registered")
	}
	return c.writeJSON(map[string]any{
		"namespace":  *namespace,
		"owner_type": owner.OwnerType,
		"owner_id":   owner.OwnerID,
		"policy":     owner.Policy,
	})
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
	if err := c.Policy.ValidatePayload(*namespace, payload); err != nil {
		return c.fail(err.Error())
	}
	rec, err := c.Store.AppendRecord(ctx, contextstore.AppendInput{Namespace: *namespace, Key: *key, Actor: *actor, Payload: payload})
	if err != nil {
		return c.fail(err.Error())
	}
	_ = c.Store.RecordAuditEvent(ctx, contextstore.AuditEvent{
		EventType: "write",
		Actor:     *actor,
		Namespace: *namespace,
		Key:       *key,
		Revision:  rec.Revision,
		RecordID:  rec.RecordID,
		Metadata:  json.RawMessage(`{"source":"cli"}`),
	})
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
	if err := c.Policy.ValidatePayload(*toNamespace, src.Payload); err != nil {
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
	_ = c.Store.RecordAuditEvent(ctx, contextstore.AuditEvent{
		EventType: "promote",
		Actor:     *actor,
		Namespace: *toNamespace,
		Key:       *toKey,
		Revision:  out.Revision,
		RecordID:  out.RecordID,
		Metadata: json.RawMessage(func() []byte {
			b, _ := json.Marshal(map[string]any{
				"source":         "cli",
				"from_namespace": *fromNamespace,
				"from_key":       *fromKey,
			})
			return b
		}()),
	})
	return c.writeJSON(map[string]any{"promoted_record_id": out.RecordID, "target_revision": out.Revision})
}

func (c *CLI) runDoctor(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("doctor", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	issues, err := c.Store.ScanConsistency(ctx)
	if err != nil {
		return c.fail(err.Error())
	}

	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"count": len(issues), "issues": issues})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "TYPE\tNAMESPACE\tKEY\tREVISION\tRECORD_ID\tDETAIL")
		for _, issue := range issues {
			_, _ = fmt.Fprintf(w, "%s\t%s\t%s\t%d\t%s\t%s\n", issue.Type, issue.Namespace, issue.Key, issue.Revision, issue.RecordID, issue.Detail)
		}
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runRepairHeads(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("repair-heads", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	rebuilt, err := c.Store.RebuildHeads(ctx)
	if err != nil {
		return c.fail(err.Error())
	}
	issues, err := c.Store.ScanConsistency(ctx)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{
			"rebuilt_heads":    rebuilt,
			"remaining_issues": len(issues),
		})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "REBUILT_HEADS\tREMAINING_ISSUES")
		_, _ = fmt.Fprintf(w, "%d\t%d\n", rebuilt, len(issues))
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runAudit(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("audit", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	limit := fs.Int("limit", 50, "limit")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	events, err := c.Store.ListAuditEvents(ctx, *limit)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"count": len(events), "items": events})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "ID\tEVENT\tACTOR\tNAMESPACE\tKEY\tREVISION\tCREATED_AT")
		for _, event := range events {
			_, _ = fmt.Fprintf(w, "%d\t%s\t%s\t%s\t%s\t%d\t%s\n", event.ID, event.EventType, event.Actor, event.Namespace, event.Key, event.Revision, event.CreatedAt)
		}
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runToken(ctx context.Context, args []string) int {
	if len(args) == 0 {
		return c.fail("usage: context token <issue|rotate|revoke|list> ...")
	}
	switch args[0] {
	case "issue":
		return c.runTokenIssue(ctx, args[1:])
	case "rotate":
		return c.runTokenRotate(ctx, args[1:])
	case "revoke":
		return c.runTokenRevoke(ctx, args[1:])
	case "list":
		return c.runTokenList(ctx, args[1:])
	default:
		return c.fail("unknown token command: " + args[0])
	}
}

func (c *CLI) runTokenIssue(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("token issue", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	label := fs.String("label", "default", "label")
	ttl := fs.String("ttl", "", "token ttl (e.g. 1h)")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	var dur time.Duration
	if strings.TrimSpace(*ttl) != "" {
		parsed, err := time.ParseDuration(*ttl)
		if err != nil {
			return c.fail("ttl must be a valid duration")
		}
		dur = parsed
	}
	token, meta, err := c.Store.IssueAuthToken(ctx, *label, dur)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"token": token, "meta": meta})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "TOKEN\tTOKEN_ID\tLABEL\tEXPIRES_AT")
		_, _ = fmt.Fprintf(w, "%s\t%s\t%s\t%s\n", token, meta.TokenID, meta.Label, meta.ExpiresAt)
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runTokenRotate(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("token rotate", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	oldToken := fs.String("token", "", "existing token")
	label := fs.String("label", "", "new token label")
	ttl := fs.String("ttl", "", "new token ttl (e.g. 1h)")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	var dur time.Duration
	if strings.TrimSpace(*ttl) != "" {
		parsed, err := time.ParseDuration(*ttl)
		if err != nil {
			return c.fail("ttl must be a valid duration")
		}
		dur = parsed
	}
	token, meta, err := c.Store.RotateAuthToken(ctx, *oldToken, *label, dur)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"token": token, "meta": meta})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "TOKEN\tTOKEN_ID\tLABEL\tEXPIRES_AT")
		_, _ = fmt.Fprintf(w, "%s\t%s\t%s\t%s\n", token, meta.TokenID, meta.Label, meta.ExpiresAt)
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runTokenRevoke(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("token revoke", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	token := fs.String("token", "", "token")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	if err := c.Store.RevokeAuthToken(ctx, *token); err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"revoked": true})
}

func (c *CLI) runTokenList(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("token list", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	limit := fs.Int("limit", 50, "limit")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	tokens, err := c.Store.ListAuthTokens(ctx, *limit)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"count": len(tokens), "items": tokens})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "TOKEN_ID\tLABEL\tCREATED_AT\tEXPIRES_AT\tREVOKED_AT")
		for _, token := range tokens {
			_, _ = fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\n", token.TokenID, token.Label, token.CreatedAt, token.ExpiresAt, token.RevokedAt)
		}
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runBackup(ctx context.Context, args []string) int {
	if len(args) == 0 {
		return c.fail("usage: context backup <export|restore> ...")
	}
	switch args[0] {
	case "export":
		return c.runBackupExport(ctx, args[1:])
	case "restore":
		return c.runBackupRestore(ctx, args[1:])
	default:
		return c.fail("usage: context backup <export|restore> ...")
	}
}

func (c *CLI) runBackupExport(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("backup export", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	outPath := fs.String("out", "", "backup output file path")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	if strings.TrimSpace(*outPath) == "" {
		return c.fail("--out is required")
	}
	if err := c.Store.ExportBackup(ctx, *outPath); err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"exported": true, "path": *outPath})
}

func (c *CLI) runBackupRestore(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("backup restore", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	inPath := fs.String("in", "", "backup input file path")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	if strings.TrimSpace(*inPath) == "" {
		return c.fail("--in is required")
	}
	if err := c.Store.RestoreBackup(ctx, *inPath); err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"restored": true, "path": *inPath})
}

func (c *CLI) runHealth(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("health", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	report, err := c.Store.Readiness(ctx)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(report)
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "HEALTHY\tSCHEMA_VERSION\tCONSISTENCY_ISSUES\tRECORDS_DIR_EXISTS\tDB_PATH")
		_, _ = fmt.Fprintf(w, "%t\t%d\t%d\t%t\t%s\n", report.Healthy, report.SchemaVersion, report.ConsistencyIssues, report.RecordsDirExists, report.DBPath)
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
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
