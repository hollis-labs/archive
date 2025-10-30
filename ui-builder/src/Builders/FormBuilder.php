<?php

namespace HollisLabs\UiBuilder\Builders;

/**
 * FormBuilder
 * 
 * Specialized builder for creating form components with field management,
 * validation rules, and submit handling.
 * 
 * Provides fluent methods for:
 * - Adding and managing form fields
 * - Setting validation rules per field
 * - Configuring submit and reset actions
 * - Customizing submit buttons
 * 
 * Example usage:
 * ```php
 * FormBuilder::make('user-form')
 *     ->field('name', 'Full Name', ComponentBuilder::input('name'))
 *     ->validation('name', ['required', 'min:3'])
 *     ->field('email', 'Email', ComponentBuilder::input('email')->prop('type', 'email'))
 *     ->validation('email', ['required', 'email'])
 *     ->onSubmit(ActionBuilder::http('/api/users', 'POST'))
 *     ->submitButton(ComponentBuilder::button('submit')->text('Create User'))
 *     ->resetButton(true);
 * ```
 */
class FormBuilder extends ComponentBuilder
{
    protected array $fields = [];
    protected array $customComponents = [];
    protected array $validationRules = [];
    protected array|ActionBuilder|null $submitAction = null;
    protected array|ComponentBuilder|null $submitButtonConfig = null;
    protected bool $resetButtonEnabled = false;

    /**
     * Create a new form builder instance
     */
    public static function make(string $id, string $type = 'form'): self
    {
        $instance = new self($id, $type);
        return $instance;
    }

    /**
     * Add a single form field
     * 
     * @param string $name The field name (used for form data)
     * @param string $label The field label displayed to users
     * @param ComponentBuilder|array $field The field component configuration
     * @return self
     */
    public function field(string $name, string $label, ComponentBuilder|array $field): self
    {
        $fieldConfig = $field instanceof ComponentBuilder ? $field->toArray() : $field;
        
        // Ensure the field has a name prop for form binding
        if (!isset($fieldConfig['props']['name'])) {
            $fieldConfig['props'] = array_merge($fieldConfig['props'] ?? [], ['name' => $name]);
        }
        
        $this->fields[$name] = [
            'name' => $name,
            'label' => $label,
            'field' => $fieldConfig,
        ];

        return $this;
    }

    /**
     * Set all form fields at once
     * 
     * @param array $fields Array of field configurations, keyed by field name
     * @return self
     */
    public function fields(array $fields): self
    {
        foreach ($fields as $name => $fieldConfig) {
            if (isset($fieldConfig['label'], $fieldConfig['field'])) {
                $this->field($name, $fieldConfig['label'], $fieldConfig['field']);
            }
        }

        return $this;
    }

    /**
     * Add a custom component to the form (not a field, just a component)
     * This is useful for adding informational components, dividers, or complex
     * interactive components like the field capability table.
     * 
     * @param ComponentBuilder|array $component The component to add
     * @param int|null $position Optional position index (null = append to end)
     * @return self
     */
    public function component(ComponentBuilder|array $component, ?int $position = null): self
    {
        $componentConfig = $component instanceof ComponentBuilder ? $component->toArray() : $component;
        
        if ($position !== null) {
            array_splice($this->customComponents, $position, 0, [$componentConfig]);
        } else {
            $this->customComponents[] = $componentConfig;
        }

        return $this;
    }

    /**
     * Add validation rules to a specific field
     * 
     * TODO: Integrate with Laravel validation rules for server-side validation
     * and automatic client-side validation generation. Consider supporting:
     * - Laravel rule objects (Rule::unique(), etc.)
     * - Closure-based validation rules
     * - Custom error messages per rule
     * - Real-time validation triggers (onChange, onBlur)
     * 
     * @param string $name The field name
     * @param array $rules Array of validation rules (e.g., ['required', 'email', 'min:3'])
     * @return self
     */
    public function validation(string $name, array $rules): self
    {
        $this->validationRules[$name] = $rules;

        return $this;
    }

    /**
     * Set the form submit action
     * 
     * @param ActionBuilder|array $action The action to execute on form submission
     * @return self
     */
    public function onSubmit(ActionBuilder|array $action): self
    {
        $this->submitAction = $action instanceof ActionBuilder ? $action->toArray() : $action;

        return $this;
    }

    /**
     * Customize the submit button
     * 
     * @param ComponentBuilder|array $button Custom submit button configuration
     * @return self
     */
    public function submitButton(ComponentBuilder|array $button): self
    {
        $this->submitButtonConfig = $button instanceof ComponentBuilder ? $button->toArray() : $button;

        return $this;
    }

    /**
     * Enable or disable the reset button
     * 
     * @param bool $enabled Whether the reset button should be shown
     * @return self
     */
    public function resetButton(bool $enabled = true): self
    {
        $this->resetButtonEnabled = $enabled;

        return $this;
    }

    /**
     * Convert the form builder to array configuration
     * 
     * @return array
     */
    public function toArray(): array
    {
        $config = parent::toArray();

        // Add form-specific props
        $formProps = [];

        if (!empty($this->fields)) {
            $formProps['fields'] = array_values($this->fields);
        }

        if (!empty($this->customComponents)) {
            $formProps['customComponents'] = array_values($this->customComponents);
        }

        if (!empty($this->validationRules)) {
            $formProps['validation'] = $this->validationRules;
        }

        if ($this->submitAction !== null) {
            $formProps['onSubmit'] = $this->submitAction;
        }

        if ($this->submitButtonConfig !== null) {
            $formProps['submitButton'] = $this->submitButtonConfig;
        }

        if ($this->resetButtonEnabled) {
            $formProps['resetButton'] = true;
        }

        // Merge form props with existing props
        if (!empty($formProps)) {
            $config['props'] = array_merge($config['props'] ?? [], $formProps);
        }

        return $config;
    }
}
