<?php

namespace HollisLabs\UiBuilder\DTOs;

use HollisLabs\UiBuilder\Models\Page;

/**
 * PageConfigDTO
 * 
 * Immutable data transfer object for page configurations.
 * Provides a type-safe representation of a complete page config.
 */
readonly class PageConfigDTO
{
    public function __construct(
        public string $id,
        public string $name,
        public array $config,
        public ?string $moduleKey = null,
        public array $guards = [],
        public bool $enabled = true,
    ) {}

    /**
     * Convert to array for database storage
     */
    public function toArray(): array
    {
        return [
            'key' => $this->id,
            'config' => $this->config,
            'module_key' => $this->moduleKey,
            'guards' => $this->guards,
            'enabled' => $this->enabled,
        ];
    }

    /**
     * Get just the config portion as JSON
     */
    public function toJson(int $options = JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES): string
    {
        return json_encode($this->config, $options);
    }

    /**
     * Save to database (create or update)
     */
    public function save(): Page
    {
        return Page::updateOrCreate(
            ['key' => $this->id],
            $this->toArray()
        );
    }

    /**
     * Create DTO from existing Page model
     */
    public static function fromPage(Page $page): self
    {
        return new self(
            id: $page->key,
            name: $page->config['title'] ?? $page->key,
            config: $page->config,
            moduleKey: $page->module_key,
            guards: $page->guards ?? [],
            enabled: $page->enabled,
        );
    }

    /**
     * Create DTO from array
     */
    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? $data['key'],
            name: $data['name'] ?? $data['config']['title'] ?? $data['id'],
            config: $data['config'],
            moduleKey: $data['module_key'] ?? $data['moduleKey'] ?? null,
            guards: $data['guards'] ?? [],
            enabled: $data['enabled'] ?? true,
        );
    }
}
