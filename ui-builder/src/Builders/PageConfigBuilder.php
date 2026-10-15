<?php

namespace HollisLabs\UiBuilder\Builders;

use HollisLabs\UiBuilder\DTOs\PageConfigDTO;
use HollisLabs\UiBuilder\Builders\Concerns\HasValidation;
use Illuminate\Support\Str;

/**
 * PageConfigBuilder
 * 
 * Fluent builder for creating complete page configurations.
 * Pages are the top-level UI containers that can be displayed as modals, sheets, or full pages.
 * 
 * Example usage:
 * 
 * ```php
 * $page = PageConfigBuilder::make('Sprint Manager')
 *     ->overlay('modal')
 *     ->layout('rows', function (LayoutBuilder $layout) {
 *         $layout->searchBar('search-sprints', 'Search sprints...', 'table-sprints');
 *         $layout->component(
 *             DataTableBuilder::make('table-sprints')
 *                 ->dataSource('Sprint')
 *                 ->columns([...])
 *         );
 *     })
 *     ->build();
 * 
 * $page->save();
 * ```
 */
class PageConfigBuilder
{
    use HasValidation;

    protected string $name;
    protected string $id;
    protected ?string $overlay = 'modal';
    protected ?string $moduleKey = null;
    protected ?LayoutBuilder $layout = null;
    protected array $guards = [];
    protected bool $enabled = true;
    protected ?array $meta = null;

    protected function __construct(string $name)
    {
        $this->name = $name;
        $this->id = $this->generateId($name);
    }

    /**
     * Create a new page builder
     * 
     * @param string $name User-facing page name (e.g., "Sprint Manager")
     */
    public static function make(string $name): self
    {
        return new self($name);
    }

    /**
     * Generate a kebab-case ID from the page name
     */
    protected function generateId(string $name): string
    {
        return Str::slug($name);
    }

    /**
     * Override the auto-generated ID
     */
    public function id(string $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Set display overlay type
     * 
     * @param string $overlay One of: modal, sheet, drawer, fullscreen, page
     */
    public function overlay(string $overlay): self
    {
        $this->overlay = $overlay;
        return $this;
    }

    /**
     * Set module key for grouping
     */
    public function module(string $moduleKey): self
    {
        $this->moduleKey = $moduleKey;
        return $this;
    }

    /**
     * Set layout configuration
     * 
     * @param string $type Layout type: rows, columns, grid
     * @param callable|null $callback Optional callback to configure layout
     */
    public function layout(string $type, ?callable $callback = null): self
    {
        $this->layout = LayoutBuilder::make($type, 'root-layout');
        
        if ($callback) {
            $callback($this->layout);
        }
        
        return $this;
    }

    /**
     * Set layout using a custom layout ID (for pre-built layouts)
     */
    public function customLayout(string $layoutId): self
    {
        $this->layout = LayoutBuilder::make('custom', $layoutId);
        return $this;
    }

    /**
     * Set authentication guards
     */
    public function guards(array $guards): self
    {
        $this->guards = $guards;
        return $this;
    }

    /**
     * Set enabled status
     */
    public function enabled(bool $enabled = true): self
    {
        $this->enabled = $enabled;
        return $this;
    }

    /**
     * Set metadata (for tracking, versioning, etc.)
     */
    public function meta(array $meta): self
    {
        $this->meta = $meta;
        return $this;
    }

    /**
     * Validate the configuration
     */
    protected function validate(): void
    {
        $this->clearErrors();

        if (empty($this->id)) {
            $this->addError('id', 'Page ID is required');
        }

        if (empty($this->name)) {
            $this->addError('name', 'Page name is required');
        }

        if (!$this->layout) {
            $this->addError('layout', 'Layout is required');
        }

        $validOverlays = ['modal', 'sheet', 'drawer', 'fullscreen', 'page'];
        if ($this->overlay && !in_array($this->overlay, $validOverlays)) {
            $this->addError('overlay', 'Invalid overlay type. Must be one of: ' . implode(', ', $validOverlays));
        }

        $this->throwIfErrors();
    }

    /**
     * Build the page configuration DTO
     */
    public function build(): PageConfigDTO
    {
        $this->validate();

        $config = [
            'id' => $this->id,
            'title' => $this->name,
            'overlay' => $this->overlay,
            'layout' => $this->layout->toArray(),
        ];

        // Add metadata if provided
        if ($this->meta) {
            $config['_meta'] = $this->meta;
        }

        return new PageConfigDTO(
            id: $this->id,
            name: $this->name,
            config: $config,
            moduleKey: $this->moduleKey,
            guards: $this->guards,
            enabled: $this->enabled
        );
    }

    /**
     * Build and save to database
     */
    public function save(): \HollisLabs\UiBuilder\Models\Page
    {
        $dto = $this->build();
        return $dto->save();
    }
}
