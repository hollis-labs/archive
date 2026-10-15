<?php

namespace HollisLabs\UiBuilder\Builders;

use Illuminate\Support\Str;

/**
 * ActionBuilder
 * 
 * Fluent builder for creating action configurations.
 * Actions define what happens when events occur in the UI.
 * 
 * Supported action types:
 * - modal: Open a modal dialog
 * - navigate: Navigate to a different page/route
 * - emit: Emit a custom event
 * - http: Make an HTTP request
 * - command: Execute a command (future)
 */
class ActionBuilder
{
    protected string $type;
    protected array $config = [];

    protected function __construct(string $type)
    {
        $this->type = $type;
    }

    /**
     * Create a modal action
     */
    public static function modal(): self
    {
        return new self('modal');
    }

    /**
     * Create a navigation action
     */
    public static function navigate(string $page): self
    {
        $instance = new self('navigate');
        $instance->config['page'] = $page;
        return $instance;
    }

    /**
     * Create an emit action
     */
    public static function emit(string $event): self
    {
        $instance = new self('emit');
        $instance->config['event'] = $event;
        return $instance;
    }

    /**
     * Create an HTTP action
     */
    public static function http(string $url, string $method = 'POST'): self
    {
        $instance = new self('http');
        $instance->config['url'] = $url;
        $instance->config['method'] = $method;
        return $instance;
    }

    /**
     * Create a quick CRUD modal action (helper)
     */
    public static function createModal(string $dataSource, array $fields = []): self
    {
        $slug = Str::kebab($dataSource);
        return self::modal()
            ->title("Create {$dataSource}")
            ->fields($fields)
            ->submitUrl("/api/ui/datasources/{$dataSource}")
            ->submitMethod('POST')
            ->submitLabel("Create {$dataSource}")
            ->refreshTarget("component.table.{$slug}");
    }

    /**
     * Create a quick edit modal action (helper)
     */
    public static function editModal(string $dataSource, array $fields = []): self
    {
        $slug = Str::kebab($dataSource);
        return self::modal()
            ->title("Edit {$dataSource}")
            ->fields($fields)
            ->submitUrl("/api/ui/datasources/{$dataSource}/{{row.id}}")
            ->submitMethod('PUT')
            ->submitLabel("Update {$dataSource}")
            ->refreshTarget("component.table.{$slug}");
    }

    /**
     * Set modal title
     */
    public function title(string $title): self
    {
        $this->config['title'] = $title;
        return $this;
    }

    /**
     * Set modal form fields
     */
    public function fields(array $fields): self
    {
        $this->config['fields'] = $fields;
        return $this;
    }

    /**
     * Set submit URL for forms
     */
    public function submitUrl(string $url): self
    {
        $this->config['submitUrl'] = $url;
        return $this;
    }

    /**
     * Set submit HTTP method
     */
    public function submitMethod(string $method): self
    {
        $this->config['submitMethod'] = $method;
        return $this;
    }

    /**
     * Set submit button label
     */
    public function submitLabel(string $label): self
    {
        $this->config['submitLabel'] = $label;
        return $this;
    }

    /**
     * Set component ID to refresh after action
     */
    public function refreshTarget(string $componentId): self
    {
        $this->config['refreshTarget'] = $componentId;
        return $this;
    }

    /**
     * Set URL for detail view modals
     */
    public function url(string $url): self
    {
        $this->config['url'] = $url;
        return $this;
    }

    /**
     * Set payload for HTTP actions
     */
    public function payload(array $payload): self
    {
        $this->config['payload'] = $payload;
        return $this;
    }

    /**
     * Set route parameters
     */
    public function params(array $params): self
    {
        $this->config['params'] = $params;
        return $this;
    }

    /**
     * Set modal type (form or detail)
     */
    public function modalType(string $type): self
    {
        $this->config['modal'] = $type;
        return $this;
    }

    /**
     * Convert to array
     */
    public function toArray(): array
    {
        return array_merge(['type' => $this->type], $this->config);
    }
}
