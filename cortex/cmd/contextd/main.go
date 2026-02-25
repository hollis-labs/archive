package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/hollis-labs/volon-dev/internal/contextapi"
	"github.com/hollis-labs/volon-dev/internal/contextcli"
	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

type serveConfig struct {
	Addr        string
	ManagedAuth bool
	StaticToken string
}

func main() {
	os.Exit(run(context.Background(), os.Args[1:], os.Stdout, os.Stderr))
}

func run(ctx context.Context, args []string, stdout, stderr *os.File) int {
	root := os.Getenv("CONTEXTD_ROOT")
	if root == "" {
		root = "."
	}

	store, err := contextstore.Open(ctx, contextstore.Config{
		RootDir:    root,
		RecordsDir: filepath.Join(root, "data", "records"),
		DBPath:     filepath.Join(root, "data", "index", "context.db"),
	})
	if err != nil {
		_, _ = stderr.WriteString("error: " + err.Error() + "\n")
		return 1
	}
	defer store.Close()

	if len(args) > 0 && args[0] == "serve" {
		cfg, err := parseServeArgs(args[1:])
		if err != nil {
			_, _ = stderr.WriteString("error: " + err.Error() + "\n")
			return 1
		}
		return runServe(ctx, store, stderr, cfg)
	}

	cli := &contextcli.CLI{
		Store:  store,
		Policy: contextpolicy.New(),
		Stdout: stdout,
		Stderr: stderr,
	}
	return cli.Run(ctx, args)
}

func parseServeArgs(args []string) (serveConfig, error) {
	fs := flag.NewFlagSet("serve", flag.ContinueOnError)
	fs.SetOutput(io.Discard)
	addr := fs.String("addr", ":8080", "listen address")
	managed := fs.Bool("managed-auth", false, "enable managed token auth")
	static := fs.String("static-token", "", "static bearer token (legacy mode)")
	if err := fs.Parse(args); err != nil {
		return serveConfig{}, err
	}
	if *managed && strings.TrimSpace(*static) != "" {
		return serveConfig{}, fmt.Errorf("managed-auth and static-token are mutually exclusive")
	}
	return serveConfig{Addr: *addr, ManagedAuth: *managed, StaticToken: strings.TrimSpace(*static)}, nil
}

func runServe(ctx context.Context, store *contextstore.Store, stderr *os.File, cfg serveConfig) int {
	srv := contextapi.NewServer(store, contextpolicy.New())
	srv.ManagedAuth = cfg.ManagedAuth
	srv.AuthToken = cfg.StaticToken

	if cfg.ManagedAuth {
		ok, err := store.HasActiveAuthTokens(ctx)
		if err != nil {
			_, _ = stderr.WriteString("error: " + err.Error() + "\n")
			return 1
		}
		if !ok {
			_, _ = stderr.WriteString("error: managed auth requires at least one active token (run `contextd context token issue ...` first)\n")
			return 1
		}
	}

	httpServer := &http.Server{Addr: cfg.Addr, Handler: srv}
	_, _ = stderr.WriteString("contextd serving on " + cfg.Addr + "\n")
	if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		_, _ = stderr.WriteString("error: " + err.Error() + "\n")
		return 1
	}
	_ = ctx
	return 0
}
