package main

import (
	"bytes"
	"context"
	"os"
	"path/filepath"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func TestParseServeArgsDefaults(t *testing.T) {
	cfg, err := parseServeArgs(nil)
	if err != nil {
		t.Fatalf("parse defaults: %v", err)
	}
	if cfg.Addr != ":8080" || cfg.ManagedAuth || cfg.StaticToken != "" || cfg.EnableMetrics {
		t.Fatalf("unexpected defaults: %+v", cfg)
	}
}

func TestParseServeArgsMetricsFlag(t *testing.T) {
	cfg, err := parseServeArgs([]string{"--metrics"})
	if err != nil {
		t.Fatalf("parse metrics flag: %v", err)
	}
	if !cfg.EnableMetrics {
		t.Fatalf("expected metrics to be enabled")
	}
}

func TestParseServeArgsMutuallyExclusiveAuthModes(t *testing.T) {
	_, err := parseServeArgs([]string{"--managed-auth", "--static-token", "abc"})
	if err == nil {
		t.Fatalf("expected auth mode conflict error")
	}
}

func TestRunServeFlagValidationPath(t *testing.T) {
	oldRoot := os.Getenv("CONTEXTD_ROOT")
	t.Cleanup(func() { _ = os.Setenv("CONTEXTD_ROOT", oldRoot) })
	_ = os.Setenv("CONTEXTD_ROOT", t.TempDir())

	stdout, err := os.CreateTemp(t.TempDir(), "stdout-*.log")
	if err != nil {
		t.Fatalf("create stdout temp: %v", err)
	}
	defer stdout.Close()
	stderr, err := os.CreateTemp(t.TempDir(), "stderr-*.log")
	if err != nil {
		t.Fatalf("create stderr temp: %v", err)
	}
	defer stderr.Close()

	code := run(context.Background(), []string{"serve", "--managed-auth", "--static-token", "x"}, stdout, stderr)
	if code == 0 {
		t.Fatalf("expected non-zero code for invalid args")
	}
	if _, err := stderr.Seek(0, 0); err != nil {
		t.Fatalf("seek stderr: %v", err)
	}
	data := &bytes.Buffer{}
	if _, err := data.ReadFrom(stderr); err != nil {
		t.Fatalf("read stderr: %v", err)
	}
	if data.Len() == 0 {
		t.Fatalf("expected stderr output for invalid args")
	}
}

func TestRunServeManagedAuthRequiresActiveToken(t *testing.T) {
	root := t.TempDir()
	oldRoot := os.Getenv("CONTEXTD_ROOT")
	t.Cleanup(func() { _ = os.Setenv("CONTEXTD_ROOT", oldRoot) })
	_ = os.Setenv("CONTEXTD_ROOT", root)

	stdout, err := os.CreateTemp(t.TempDir(), "stdout-*.log")
	if err != nil {
		t.Fatalf("create stdout temp: %v", err)
	}
	defer stdout.Close()
	stderr, err := os.CreateTemp(t.TempDir(), "stderr-*.log")
	if err != nil {
		t.Fatalf("create stderr temp: %v", err)
	}
	defer stderr.Close()

	code := run(context.Background(), []string{"serve", "--managed-auth", "--addr", "127.0.0.1:0"}, stdout, stderr)
	if code == 0 {
		t.Fatalf("expected non-zero when no active tokens")
	}
	if _, err := stderr.Seek(0, 0); err != nil {
		t.Fatalf("seek stderr: %v", err)
	}
	buf := &bytes.Buffer{}
	if _, err := buf.ReadFrom(stderr); err != nil {
		t.Fatalf("read stderr: %v", err)
	}
	if !bytes.Contains(buf.Bytes(), []byte("requires at least one active token")) {
		t.Fatalf("unexpected stderr: %s", buf.String())
	}
}

func TestHasActiveAuthTokensFromMetadata(t *testing.T) {
	root := t.TempDir()
	s, err := contextstore.Open(context.Background(), contextstore.Config{
		RootDir:    root,
		RecordsDir: filepath.Join(root, "data", "records"),
		DBPath:     filepath.Join(root, "data", "index", "context.db"),
	})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	defer s.Close()
	if ok, err := s.HasActiveAuthTokens(context.Background()); err != nil || ok {
		t.Fatalf("expected no active tokens, got ok=%v err=%v", ok, err)
	}
	token, _, err := s.IssueAuthToken(context.Background(), "admin", 0)
	if err != nil {
		t.Fatalf("issue token: %v", err)
	}
	if ok, err := s.HasActiveAuthTokens(context.Background()); err != nil || !ok {
		t.Fatalf("expected active token, got ok=%v err=%v", ok, err)
	}
	if err := s.RevokeAuthToken(context.Background(), token); err != nil {
		t.Fatalf("revoke token: %v", err)
	}
	if ok, err := s.HasActiveAuthTokens(context.Background()); err != nil || ok {
		t.Fatalf("expected no active tokens after revoke, got ok=%v err=%v", ok, err)
	}
}
