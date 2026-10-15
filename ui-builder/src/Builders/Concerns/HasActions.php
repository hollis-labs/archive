<?php

namespace HollisLabs\UiBuilder\Builders\Concerns;

use HollisLabs\UiBuilder\Builders\ActionBuilder;

/**
 * HasActions Trait
 * 
 * Provides fluent methods for attaching actions to components.
 * Actions define what happens when events occur (click, submit, change, etc.)
 */
trait HasActions
{
    protected array $actions = [];

    /**
     * Add a click action
     */
    public function onClick(ActionBuilder|array $action): self
    {
        return $this->action('click', $action);
    }

    /**
     * Add a submit action
     */
    public function onSubmit(ActionBuilder|array $action): self
    {
        return $this->action('submit', $action);
    }

    /**
     * Add a change action
     */
    public function onChange(ActionBuilder|array $action): self
    {
        return $this->action('change', $action);
    }

    /**
     * Add a custom event action
     */
    public function action(string $event, ActionBuilder|array $action): self
    {
        $this->actions[$event] = $action instanceof ActionBuilder 
            ? $action->toArray() 
            : $action;
            
        return $this;
    }

    /**
     * Get all actions
     */
    public function getActions(): array
    {
        return $this->actions;
    }

    /**
     * Check if an action exists for an event
     */
    public function hasAction(string $event): bool
    {
        return array_key_exists($event, $this->actions);
    }
}
