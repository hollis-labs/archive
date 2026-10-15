<?php

namespace HollisLabs\UiBuilder\Builders\Concerns;

/**
 * HasProps Trait
 * 
 * Provides fluent methods for managing component properties.
 * Properties are configuration values that affect component behavior and appearance.
 */
trait HasProps
{
    protected array $props = [];

    /**
     * Set a single property value
     */
    public function prop(string $key, mixed $value): self
    {
        $this->props[$key] = $value;
        return $this;
    }

    /**
     * Merge multiple properties at once
     */
    public function props(array $props): self
    {
        $this->props = array_merge($this->props, $props);
        return $this;
    }

    /**
     * Get all properties
     */
    public function getProps(): array
    {
        return $this->props;
    }

    /**
     * Check if a property exists
     */
    public function hasProp(string $key): bool
    {
        return array_key_exists($key, $this->props);
    }

    /**
     * Get a single property value
     */
    public function getProp(string $key, mixed $default = null): mixed
    {
        return $this->props[$key] ?? $default;
    }
}
