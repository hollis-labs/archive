package main

import (
	"os"

	"github.com/hollis-labs/plugin-sdk/subprocess"
)

func main() {
	if err := subprocess.Serve(&muxPlugin{}); err != nil {
		os.Exit(1)
	}
}
