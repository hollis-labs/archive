package integration

import (
	"encoding/json"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

type agentsBootGolden struct {
	Markers []string `json:"markers"`
}

func TestAgentsBootCheckContractAgainstGolden(t *testing.T) {
	golden := loadAgentsBootGolden(t)
	script := filepath.Join("scripts", "agents-boot-drift-check.sh")
	cmd := exec.Command("bash", script)
	cmd.Dir = filepath.Join("..", "..")
	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("agents boot check failed: %v\noutput:\n%s", err, string(out))
	}
	content := string(out)
	for _, marker := range golden.Markers {
		if !strings.Contains(content, marker) {
			t.Fatalf("missing marker %q in output:\n%s", marker, content)
		}
	}
}

func loadAgentsBootGolden(t *testing.T) agentsBootGolden {
	t.Helper()
	data, err := os.ReadFile(filepath.Join("fixtures", "agents_boot_check_contract_golden.json"))
	if err != nil {
		t.Fatalf("read agents boot golden: %v", err)
	}
	var out agentsBootGolden
	if err := json.Unmarshal(data, &out); err != nil {
		t.Fatalf("unmarshal agents boot golden: %v", err)
	}
	return out
}
