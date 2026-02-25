package main

import (
	"context"
	"os"
	"path/filepath"

	"github.com/hollis-labs/volon-dev/internal/contextcli"
	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func main() {
	root := os.Getenv("CONTEXTD_ROOT")
	if root == "" {
		root = "."
	}

	store, err := contextstore.Open(context.Background(), contextstore.Config{
		RootDir:    root,
		RecordsDir: filepath.Join(root, "data", "records"),
		DBPath:     filepath.Join(root, "data", "index", "context.db"),
	})
	if err != nil {
		_, _ = os.Stderr.WriteString("error: " + err.Error() + "\n")
		os.Exit(1)
	}
	defer store.Close()

	cli := &contextcli.CLI{
		Store:  store,
		Policy: contextpolicy.New(),
		Stdout: os.Stdout,
		Stderr: os.Stderr,
	}
	code := cli.Run(context.Background(), os.Args[1:])
	os.Exit(code)
}
