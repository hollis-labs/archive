PLUGIN_ID := oembed
VERSION   := $(shell awk '/^version:/ {print $$2; exit}' plugin.yaml)
PLATFORMS := darwin-arm64 darwin-amd64 linux-amd64 linux-arm64 windows-amd64

DIST_DIR     := dist
STAGING_DIR  := $(DIST_DIR)/staging
ARCHIVES_DIR := $(DIST_DIR)/archives

# Optional; when empty, `make release` skips signature generation.
# Expected format: base64-encoded Ed25519 seed+pub (ed25519.PrivateKey
# concatenated form, 64 bytes).
OEMBED_SIGNING_KEY ?=

# Files shipped inside each per-platform archive.
ARCHIVE_CONTENTS := plugin.yaml dev-signing-key.pub envelopes README.md LICENSE CHANGELOG.md

.PHONY: all build dev build-ui build-go release clean

all: release

# Native build for local development — produces ./oembed next to plugin.yaml
# so the host can execute it via the manifest entrypoint during
# `nanite plugin install ./nanite-plugin-oembed`.
build dev:
	cd ui && npm install --no-audit --no-fund --silent && npm run build
	CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o $(PLUGIN_ID) .

build-ui:
	cd ui && npm install --no-audit --no-fund --silent && npm run build

build-go:
	@rm -rf $(STAGING_DIR)
	@mkdir -p $(STAGING_DIR)
	@for plat in $(PLATFORMS); do \
		os=$${plat%-*}; arch=$${plat#*-}; \
		if [ "$$os" = "windows" ]; then bin=$(PLUGIN_ID).exe; else bin=$(PLUGIN_ID); fi; \
		echo ">> building $$os/$$arch"; \
		mkdir -p $(STAGING_DIR)/$$plat; \
		GOOS=$$os GOARCH=$$arch CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" \
			-o $(STAGING_DIR)/$$plat/$$bin .; \
	done

release: build-ui build-go
	@mkdir -p $(ARCHIVES_DIR)
	@for plat in $(PLATFORMS); do \
		os=$${plat%-*}; arch=$${plat#*-}; \
		if [ "$$os" = "windows" ]; then bin=$(PLUGIN_ID).exe; else bin=$(PLUGIN_ID); fi; \
		stage=$(STAGING_DIR)/$$plat; \
		echo ">> assembling $$plat archive"; \
		cp -r $(ARCHIVE_CONTENTS) $$stage/; \
		mkdir -p $$stage/ui/dist; \
		cp ui/dist/index.js $$stage/ui/dist/index.js; \
		[ -f ui/dist/style.css ] && cp ui/dist/style.css $$stage/ui/dist/style.css || true; \
		archive=$(ARCHIVES_DIR)/$(PLUGIN_ID)-$(VERSION)-$$plat.tar.gz; \
		tar -C $$stage -czf $$archive .; \
		if command -v sha256sum >/dev/null 2>&1; then \
			sha256sum $$archive | awk '{print $$1}' > $$archive.sha256; \
		elif command -v shasum >/dev/null 2>&1; then \
			shasum -a 256 $$archive | awk '{print $$1}' > $$archive.sha256; \
		else \
			echo "error: neither sha256sum nor shasum is available" >&2; \
			exit 1; \
		fi; \
	done
	@if [ -n "$$OEMBED_SIGNING_KEY" ]; then \
		echo ">> signing archives"; \
		for archive in $(ARCHIVES_DIR)/*.tar.gz; do \
			OEMBED_SIGNING_KEY="$$OEMBED_SIGNING_KEY" go run ./cmd/sign $$archive > $$archive.sig; \
		done; \
	else \
		echo ">> OEMBED_SIGNING_KEY not set — skipping signing (dev build)"; \
	fi

clean:
	rm -rf $(DIST_DIR) ui/dist ui/node_modules
