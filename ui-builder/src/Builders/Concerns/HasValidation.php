<?php

namespace HollisLabs\UiBuilder\Builders\Concerns;

/**
 * HasValidation Trait
 * 
 * Provides validation helpers for builders.
 * 
 * TODO: Implement validation rules for:
 * - Required fields
 * - Valid component types
 * - Valid action types
 * - DataSource existence checks
 * - Prop schema validation against component schemas
 * - Circular reference detection in layouts
 * 
 * Future enhancement: Hook into Laravel's validation or create custom validator classes
 */
trait HasValidation
{
    protected array $errors = [];

    /**
     * Add a validation error
     */
    protected function addError(string $field, string $message): void
    {
        if (!isset($this->errors[$field])) {
            $this->errors[$field] = [];
        }
        $this->errors[$field][] = $message;
    }

    /**
     * Check if there are validation errors
     */
    public function hasErrors(): bool
    {
        return !empty($this->errors);
    }

    /**
     * Get all validation errors
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * Clear all validation errors
     */
    protected function clearErrors(): void
    {
        $this->errors = [];
    }

    /**
     * Throw exception if validation errors exist
     */
    protected function throwIfErrors(): void
    {
        if ($this->hasErrors()) {
            $messages = [];
            foreach ($this->errors as $field => $fieldErrors) {
                $messages[] = "{$field}: " . implode(', ', $fieldErrors);
            }
            throw new \InvalidArgumentException(
                'Validation failed: ' . implode('; ', $messages)
            );
        }
    }
}
