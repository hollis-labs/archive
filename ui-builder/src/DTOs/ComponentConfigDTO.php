<?php

namespace HollisLabs\UiBuilder\DTOs;

/**
 * ComponentConfigDTO
 * 
 * Immutable data transfer object for component configurations.
 * 
 * TODO: Future enhancements:
 * - Add validation against component schema
 * - Add type-specific subclasses (DataTableDTO, FormDTO, etc.)
 * - Add helpers for common transformations
 */
readonly class ComponentConfigDTO
{
    public function __construct(
        public string $id,
        public string $type,
        public array $props = [],
        public array $actions = [],
        public array $children = [],
    ) {}

    /**
     * Convert to array for JSON serialization
     */
    public function toArray(): array
    {
        $config = [
            'id' => $this->id,
            'type' => $this->type,
        ];

        if (!empty($this->props)) {
            $config['props'] = $this->props;
        }

        if (!empty($this->actions)) {
            $config['actions'] = $this->actions;
        }

        if (!empty($this->children)) {
            $config['children'] = $this->children;
        }

        return $config;
    }

    /**
     * Create DTO from array
     */
    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            type: $data['type'],
            props: $data['props'] ?? [],
            actions: $data['actions'] ?? [],
            children: $data['children'] ?? [],
        );
    }

    /**
     * Get JSON representation
     */
    public function toJson(int $options = JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES): string
    {
        return json_encode($this->toArray(), $options);
    }
}
