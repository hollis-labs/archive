// Package plugin defines the standalone plugin contract used by Fragments Engine applications.
//
// It provides the Plugin and Host interfaces, typed CRUD/Event/UI contracts,
// and an in-memory Registry for tests and lightweight hosts. The shared
// Registry intentionally implements only a subset of Host; higher-level
// config, connector, provider, command, slot, and keybinding registration is
// expected from an out-of-tree host implementation such as Conduit Host.
//
// See example.go for a reference Plugin implementation.
package plugin
