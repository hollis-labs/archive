<?php

namespace HollisLabs\UiBuilder\Builders;

/**
 * LayoutBuilder
 * 
 * Fluent builder for creating layout configurations.
 * Layouts organize components spatially (rows, columns, grid, etc.)
 */
class LayoutBuilder
{
    protected string $type;
    protected string $id;
    protected array $children = [];
    protected array $props = [];

    protected function __construct(string $type, string $id)
    {
        $this->type = $type;
        $this->id = $id;
    }

    /**
     * Create a new layout builder
     */
    public static function make(string $type, string $id = 'root-layout'): self
    {
        return new self($type, $id);
    }

    /**
     * Create a rows layout (vertical stack)
     */
    public static function rows(string $id = 'root-layout'): self
    {
        return new self('rows', $id);
    }

    /**
     * Create a columns layout (horizontal stack)
     */
    public static function columns(string $id = 'root-layout'): self
    {
        return new self('columns', $id);
    }

    /**
     * Create a grid layout
     */
    public static function grid(string $id = 'root-layout'): self
    {
        return new self('grid', $id);
    }

    /**
     * Add a component to this layout
     */
    public function component(ComponentBuilder|array $component): self
    {
        $this->children[] = $component instanceof ComponentBuilder 
            ? $component->toArray() 
            : $component;
        return $this;
    }

    /**
     * Add multiple components
     */
    public function components(array $components): self
    {
        foreach ($components as $component) {
            $this->component($component);
        }
        return $this;
    }

    /**
     * Add a search bar component (helper)
     */
    public function searchBar(string $id, string $placeholder = 'Search...', string $targetTable = null): self
    {
        $builder = ComponentBuilder::searchBar($id)->placeholder($placeholder);
        
        if ($targetTable) {
            $builder->target($targetTable);
        }
        
        return $this->component($builder);
    }

    /**
     * Add a data table component (helper)
     */
    public function dataTable(string $id): DataTableBuilder
    {
        $builder = DataTableBuilder::make($id);
        $this->children[] = $builder;
        return $builder;
    }

    /**
     * Set layout-specific properties
     */
    public function prop(string $key, mixed $value): self
    {
        $this->props[$key] = $value;
        return $this;
    }

    /**
     * Set grid columns (for grid layout)
     */
    public function gridColumns(int $columns): self
    {
        return $this->prop('columns', $columns);
    }

    /**
     * Set gap between items
     */
    public function gap(string $gap): self
    {
        return $this->prop('gap', $gap);
    }

    /**
     * Convert to array
     */
    public function toArray(): array
    {
        $config = [
            'type' => $this->type,
            'id' => $this->id,
            'children' => array_map(function ($child) {
                if ($child instanceof ComponentBuilder || $child instanceof DataTableBuilder) {
                    return $child->toArray();
                }
                return $child;
            }, $this->children),
        ];

        if (!empty($this->props)) {
            $config['props'] = $this->props;
        }

        return $config;
    }
}
