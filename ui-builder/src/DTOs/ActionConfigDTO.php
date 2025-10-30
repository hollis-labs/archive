<?php

namespace HollisLabs\UiBuilder\DTOs;

/**
 * ActionConfigDTO
 * 
 * Immutable data transfer object for action configurations.
 * 
 * TODO: Future enhancements:
 * - Add validation for required fields per action type
 * - Add type-specific subclasses (ModalActionDTO, NavigateActionDTO, etc.)
 * - Add helpers for URL interpolation ({{row.id}}, {{params.x}})
 */
readonly class ActionConfigDTO
{
    public function __construct(
        public string $type,
        public array $config = [],
    ) {}

    /**
     * Convert to array for JSON serialization
     */
    public function toArray(): array
    {
        return array_merge(['type' => $this->type], $this->config);
    }

    /**
     * Create DTO from array
     */
    public static function fromArray(array $data): self
    {
        $type = $data['type'];
        unset($data['type']);
        
        return new self(
            type: $type,
            config: $data,
        );
    }

    /**
     * Get JSON representation
     */
    public function toJson(int $options = JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES): string
    {
        return json_encode($this->toArray(), $options);
    }

    /**
     * Check if action is a modal type
     */
    public function isModal(): bool
    {
        return $this->type === 'modal';
    }

    /**
     * Check if action is a navigate type
     */
    public function isNavigate(): bool
    {
        return $this->type === 'navigate';
    }

    /**
     * Check if action is an HTTP type
     */
    public function isHttp(): bool
    {
        return $this->type === 'http';
    }

    /**
     * Check if action is an emit type
     */
    public function isEmit(): bool
    {
        return $this->type === 'emit';
    }
}
