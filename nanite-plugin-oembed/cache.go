package main

import (
	"sync"
	"time"
)

type oEmbedCache struct {
	mu      sync.Mutex
	ttl     time.Duration
	entries map[string]oEmbedCacheEntry
}

type oEmbedCacheEntry struct {
	value     *OEmbedResult
	expiresAt time.Time
}

func newOEmbedCache(ttl time.Duration) *oEmbedCache {
	return &oEmbedCache{
		ttl:     ttl,
		entries: make(map[string]oEmbedCacheEntry),
	}
}

func (c *oEmbedCache) get(key string) (*OEmbedResult, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	entry, ok := c.entries[key]
	if !ok {
		return nil, false
	}
	if time.Now().After(entry.expiresAt) {
		delete(c.entries, key)
		return nil, false
	}
	return entry.value, true
}

func (c *oEmbedCache) set(key string, value *OEmbedResult) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.entries[key] = oEmbedCacheEntry{
		value:     value,
		expiresAt: time.Now().Add(c.ttl),
	}
}
