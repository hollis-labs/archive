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

// set stores value under key with TTL. Expired entries are pruned
// opportunistically on each write so the map never retains stale keys
// indefinitely — important since callers have no out-of-band way to
// invalidate per-URL cache entries.
func (c *oEmbedCache) set(key string, value *OEmbedResult) {
	c.mu.Lock()
	defer c.mu.Unlock()

	now := time.Now()
	for k, entry := range c.entries {
		if now.After(entry.expiresAt) {
			delete(c.entries, k)
		}
	}
	c.entries[key] = oEmbedCacheEntry{
		value:     value,
		expiresAt: now.Add(c.ttl),
	}
}
