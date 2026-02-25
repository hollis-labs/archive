package contextcli

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
	"os/exec"
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
	// ExecCommand is an optional command runner hook used by contract helpers.
	ExecCommand func(ctx context.Context, name string, args ...string) ([]byte, error)
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
	if err := c.reloadPolicies(ctx); err != nil {
		return c.fail(err.Error())
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
	case "bootstrap":
		return c.runBootstrap(ctx, args[2:])
	case "compact":
		return c.runCompact(ctx, args[2:])
	case "contract":
		return c.runContract(ctx, args[2:])
	default:
		return c.fail("unknown subcommand: " + args[1])
	}
}

type contractSuite struct {
	Name    string `json:"name"`
	Command string `json:"command"`
}

func contractSuites() []contractSuite {
	return []contractSuite{
		{Name: "api", Command: "go test ./tests/integration -run APIContract -count=1"},
		{Name: "api-errors", Command: "go test ./tests/integration -run APIErrorContract -count=1"},
		{Name: "audit", Command: "go test ./tests/integration -run AuditContract -count=1"},
		{Name: "metrics", Command: "go test ./tests/integration -run MetricsContract -count=1"},
		{Name: "log-metrics", Command: "go test ./tests/integration -run LogMetricsContract -count=1"},
		{Name: "readiness", Command: "go test ./tests/integration -run ReadinessContract -count=1"},
		{Name: "cli-health-summary", Command: "go test ./tests/integration -run CLIHealthSummaryContract -count=1"},
		{Name: "cli-audit", Command: "go test ./tests/integration -run CLIAuditContract -count=1"},
		{Name: "smoke-invalid-token", Command: "go test ./tests/integration -run SmokeInvalidTokenContract -count=1"},
		{Name: "make-contract-cli-list", Command: "go test ./tests/integration -run MakeContractCLIListContract -count=1"},
		{Name: "make-contract-cli-run", Command: "go test ./tests/integration -run MakeContractCLIRunContract -count=1"},
		{Name: "bootstrap-sync", Command: "go test ./tests/integration -run BootstrapSyncScript -count=1"},
		{Name: "bootstrap-sync-no-log", Command: "go test ./tests/integration -run BootstrapSyncNoLogContract -count=1"},
		{Name: "make-bootstrap-sync", Command: "go test ./tests/integration -run MakeBootstrapSyncContract -count=1"},
		{Name: "make-smoke-invalid-token", Command: "go test ./tests/integration -run MakeSmokeInvalidTokenContract -count=1"},
		{Name: "runlog-helper", Command: "go test ./tests/integration -run RunlogHelperContract -count=1"},
		{Name: "fixture-lint-script", Command: "go test ./tests/integration -run ContractFixtureLintScript -count=1"},
		{Name: "agents-boot-check", Command: "go test ./tests/integration -run AgentsBootCheckContract -count=1"},
	}
}

func (c *CLI) runContract(ctx context.Context, args []string) int {
	if len(args) == 0 {
		return c.fail("usage: context contract <list|run> ...")
	}
	switch args[0] {
	case "list":
		return c.runContractList(args[1:])
	case "run":
		return c.runContractRun(ctx, args[1:])
	default:
		return c.fail("usage: context contract <list|run> ...")
	}
}

func (c *CLI) runContractList(args []string) int {
	fs := flag.NewFlagSet("contract list", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	suites := contractSuites()
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"count": len(suites), "items": suites})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "SUITE\tCOMMAND")
		for _, suite := range suites {
			_, _ = fmt.Fprintf(w, "%s\t%s\n", suite.Name, suite.Command)
		}
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runContractRun(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("contract run", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	suiteName := fs.String("suite", "all", "suite name or all")
	execute := fs.Bool("execute", false, "execute the suite command(s)")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	allSuites := contractSuites()
	selected := make([]contractSuite, 0, len(allSuites))
	if strings.TrimSpace(*suiteName) == "all" {
		selected = append(selected, allSuites...)
	} else {
		for _, suite := range allSuites {
			if suite.Name == strings.TrimSpace(*suiteName) {
				selected = append(selected, suite)
				break
			}
		}
		if len(selected) == 0 {
			return c.fail("unknown contract suite: " + strings.TrimSpace(*suiteName))
		}
	}

	type result struct {
		Suite   string `json:"suite"`
		Command string `json:"command"`
		OK      bool   `json:"ok"`
		Output  string `json:"output,omitempty"`
	}
	results := make([]result, 0, len(selected))
	for _, suite := range selected {
		entry := result{Suite: suite.Name, Command: suite.Command, OK: true}
		if *execute {
			out, err := c.execCommand(ctx, suite.Command)
			entry.Output = strings.TrimSpace(string(out))
			if err != nil {
				entry.OK = false
			}
		}
		results = append(results, entry)
	}

	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{
			"executed": *execute,
			"count":    len(results),
			"items":    results,
		})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		if *execute {
			_, _ = fmt.Fprintln(w, "SUITE\tOK\tCOMMAND")
			for _, item := range results {
				_, _ = fmt.Fprintf(w, "%s\t%t\t%s\n", item.Suite, item.OK, item.Command)
			}
		} else {
			_, _ = fmt.Fprintln(w, "SUITE\tCOMMAND")
			for _, item := range results {
				_, _ = fmt.Fprintf(w, "%s\t%s\n", item.Suite, item.Command)
			}
		}
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) execCommand(ctx context.Context, cmdline string) ([]byte, error) {
	fields := strings.Fields(strings.TrimSpace(cmdline))
	if len(fields) == 0 {
		return nil, errors.New("empty command")
	}
	if c.ExecCommand != nil {
		return c.ExecCommand(ctx, fields[0], fields[1:]...)
	}
	return exec.CommandContext(ctx, fields[0], fields[1:]...).CombinedOutput()
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
	entry := contextstore.NamespacePolicyEntry{
		Namespace: *namespace,
		OwnerType: *ownerType,
		OwnerID:   *ownerID,
	}
	if err := c.Store.UpsertNamespacePolicy(context.Background(), entry); err != nil {
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
	entry, err := c.Store.GetNamespacePolicy(context.Background(), *namespace)
	if err != nil {
		return c.fail(err.Error())
	}
	_ = c.Policy.RegisterNamespace(entry.Namespace, entry.OwnerType, entry.OwnerID, entry.Policy)
	return c.writeJSON(map[string]any{
		"namespace":  *namespace,
		"owner_type": entry.OwnerType,
		"owner_id":   entry.OwnerID,
		"policy":     entry.Policy,
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
	cursor := fs.Int64("cursor", 0, "pagination cursor")
	namespace := fs.String("namespace", "", "namespace filter")
	eventType := fs.String("event-type", "", "event type filter")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	if *cursor < 0 {
		return c.fail("cursor must be a non-negative integer")
	}
	events, nextCursor, err := c.Store.QueryAuditEvents(ctx, contextstore.AuditQuery{
		Limit:     *limit,
		Cursor:    *cursor,
		Namespace: strings.TrimSpace(*namespace),
		EventType: strings.TrimSpace(*eventType),
	})
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{"count": len(events), "items": events, "next_cursor": nextCursor})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "ID\tEVENT\tACTOR\tNAMESPACE\tKEY\tREVISION\tCREATED_AT")
		for _, event := range events {
			_, _ = fmt.Fprintf(w, "%d\t%s\t%s\t%s\t%s\t%d\t%s\n", event.ID, event.EventType, event.Actor, event.Namespace, event.Key, event.Revision, event.CreatedAt)
		}
		if nextCursor != nil {
			_, _ = fmt.Fprintf(w, "NEXT_CURSOR\t%d\t\t\t\t\t\n", *nextCursor)
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
	case "verify":
		return c.runBackupVerify(args[1:])
	default:
		return c.fail("usage: context backup <export|restore|verify> ...")
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

func (c *CLI) runBackupVerify(args []string) int {
	fs := flag.NewFlagSet("backup verify", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	inPath := fs.String("in", "", "backup input file path")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	if strings.TrimSpace(*inPath) == "" {
		return c.fail("--in is required")
	}
	if err := c.Store.VerifyBackup(*inPath); err != nil {
		return c.fail(err.Error())
	}
	return c.writeJSON(map[string]any{"verified": true, "path": *inPath})
}

func (c *CLI) runHealth(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("health", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	output := fs.String("output", "json", "json|table")
	summary := fs.Bool("summary", false, "emit readiness status summary")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}
	report, err := c.Store.Readiness(ctx)
	if err != nil {
		return c.fail(err.Error())
	}
	if *summary {
		payload := map[string]any{
			"status":             report.Status,
			"healthy":            report.Healthy,
			"consistency_issues": report.ConsistencyIssues,
			"records_dir_exists": report.RecordsDirExists,
			"schema_version":     report.SchemaVersion,
		}
		switch strings.TrimSpace(*output) {
		case "json", "":
			return c.writeJSON(payload)
		case "table":
			w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
			_, _ = fmt.Fprintln(w, "STATUS\tHEALTHY\tSCHEMA_VERSION\tCONSISTENCY_ISSUES\tRECORDS_DIR_EXISTS")
			_, _ = fmt.Fprintf(w, "%s\t%t\t%d\t%d\t%t\n", report.Status, report.Healthy, report.SchemaVersion, report.ConsistencyIssues, report.RecordsDirExists)
			_ = w.Flush()
			return 0
		default:
			return c.fail("output must be json|table")
		}
	}

	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(report)
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "STATUS\tHEALTHY\tSCHEMA_VERSION\tCONSISTENCY_ISSUES\tRECORDS_DIR_EXISTS\tDB_PATH")
		_, _ = fmt.Fprintf(w, "%s\t%t\t%d\t%d\t%t\t%s\n", report.Status, report.Healthy, report.SchemaVersion, report.ConsistencyIssues, report.RecordsDirExists, report.DBPath)
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runBootstrap(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("bootstrap", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	defaultApp := fs.String("default-app", "default", "default app namespace owner id")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}

	seed := []contextstore.NamespacePolicyEntry{
		{Namespace: "user/goals", OwnerType: "user", OwnerID: "user"},
		{Namespace: "user/preferences", OwnerType: "user", OwnerID: "user"},
	}
	if strings.TrimSpace(*defaultApp) != "" {
		seed = append(seed, contextstore.NamespacePolicyEntry{
			Namespace: "app/" + strings.TrimSpace(*defaultApp) + "/session",
			OwnerType: "app",
			OwnerID:   strings.TrimSpace(*defaultApp),
		})
	}

	for _, entry := range seed {
		if err := c.Store.UpsertNamespacePolicy(ctx, entry); err != nil {
			return c.fail(err.Error())
		}
		if err := c.Policy.RegisterNamespace(entry.Namespace, entry.OwnerType, entry.OwnerID, entry.Policy); err != nil {
			return c.fail(err.Error())
		}
	}

	report, err := c.Store.Readiness(ctx)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{
			"bootstrapped":      true,
			"seeded_namespaces": seed,
			"readiness":         report,
		})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "BOOTSTRAPPED\tHEALTHY\tSCHEMA_VERSION\tCONSISTENCY_ISSUES")
		_, _ = fmt.Fprintf(w, "true\t%t\t%d\t%d\n", report.Healthy, report.SchemaVersion, report.ConsistencyIssues)
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) runCompact(ctx context.Context, args []string) int {
	fs := flag.NewFlagSet("compact", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	keepRevisions := fs.Int("keep-revisions", 1, "revisions to keep per namespace/key")
	keepAudit := fs.Int("keep-audit", 1000, "audit events to keep")
	output := fs.String("output", "json", "json|table")
	if err := fs.Parse(args); err != nil {
		return c.fail(err.Error())
	}

	deletedRevisions, err := c.Store.CompactRevisions(ctx, *keepRevisions)
	if err != nil {
		return c.fail(err.Error())
	}
	trimmedAudit, err := c.Store.TrimAuditEvents(ctx, *keepAudit)
	if err != nil {
		return c.fail(err.Error())
	}
	report, err := c.Store.Readiness(ctx)
	if err != nil {
		return c.fail(err.Error())
	}
	switch strings.TrimSpace(*output) {
	case "json", "":
		return c.writeJSON(map[string]any{
			"deleted_revisions": deletedRevisions,
			"trimmed_audit":     trimmedAudit,
			"readiness":         report,
		})
	case "table":
		w := tabwriter.NewWriter(c.Stdout, 2, 4, 2, ' ', 0)
		_, _ = fmt.Fprintln(w, "DELETED_REVISIONS\tTRIMMED_AUDIT\tHEALTHY\tCONSISTENCY_ISSUES")
		_, _ = fmt.Fprintf(w, "%d\t%d\t%t\t%d\n", deletedRevisions, trimmedAudit, report.Healthy, report.ConsistencyIssues)
		_ = w.Flush()
		return 0
	default:
		return c.fail("output must be json|table")
	}
}

func (c *CLI) reloadPolicies(ctx context.Context) error {
	entries, err := c.Store.ListNamespacePolicies(ctx)
	if err != nil {
		return err
	}
	for _, entry := range entries {
		if err := c.Policy.RegisterNamespace(entry.Namespace, entry.OwnerType, entry.OwnerID, entry.Policy); err != nil {
			return err
		}
	}
	return nil
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
