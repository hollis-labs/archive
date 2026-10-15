// sign is a release helper invoked by `make release`. It reads a file
// path from argv[1] and writes a base64-encoded Ed25519 signature of
// that file's bytes to stdout. The private key is read from the
// AGENT_MUX_SIGNING_KEY env var as base64 (64-byte ed25519.PrivateKey).
//
// This helper only runs during release builds and is never loaded at
// plugin runtime; it lives in its own cmd/ subdir so `go build .` for
// the plugin binary does not pick it up.
package main

import (
	"crypto/ed25519"
	"encoding/base64"
	"fmt"
	"io"
	"os"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: sign <path>")
		os.Exit(2)
	}
	key := os.Getenv("AGENT_MUX_SIGNING_KEY")
	if key == "" {
		fmt.Fprintln(os.Stderr, "AGENT_MUX_SIGNING_KEY not set")
		os.Exit(2)
	}
	raw, err := base64.StdEncoding.DecodeString(key)
	if err != nil || len(raw) != ed25519.PrivateKeySize {
		fmt.Fprintln(os.Stderr, "AGENT_MUX_SIGNING_KEY must be base64-encoded 64-byte ed25519 private key")
		os.Exit(2)
	}
	f, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	defer f.Close()
	data, err := io.ReadAll(f)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	sig := ed25519.Sign(ed25519.PrivateKey(raw), data)
	fmt.Println(base64.StdEncoding.EncodeToString(sig))
}
