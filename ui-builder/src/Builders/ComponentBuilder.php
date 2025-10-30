<?php

namespace HollisLabs\UiBuilder\Builders;

use HollisLabs\UiBuilder\Builders\Concerns\HasProps;
use HollisLabs\UiBuilder\Builders\Concerns\HasActions;

/**
 * ComponentBuilder
 * 
 * Fluent builder for creating component configurations.
 * Components are the building blocks of UI pages.
 * 
 * Supports all UI Builder component types:
 * - Primitives: button, input, label, badge, etc.
 * - Layouts: card, scroll-area, collapsible, accordion
 * - Navigation: tabs, breadcrumb, sidebar
 * - Composites: dialog, popover, sheet, drawer
 * - Advanced: data-table, chart, carousel
 * - Forms: form, input-group, date-picker, etc.
 */
class ComponentBuilder
{
    use HasProps, HasActions;

    protected string $id;
    protected string $type;
    protected array $children = [];
    protected ?array $result = null;

    protected function __construct(string $id, string $type)
    {
        $this->id = $id;
        $this->type = $type;
    }

    /**
     * Create a new component builder
     */
    public static function make(string $id, string $type): self
    {
        return new self($id, $type);
    }

    // ==========================================
    // Static Factory Methods for Common Components
    // ==========================================

    public static function searchBar(string $id): self
    {
        return self::make($id, 'search.bar');
    }

    public static function button(string $id): self
    {
        return self::make($id, 'button');
    }

    public static function buttonIcon(string $id): self
    {
        return self::make($id, 'button.icon');
    }

    public static function card(string $id): self
    {
        return self::make($id, 'card');
    }

    public static function input(string $id): self
    {
        return self::make($id, 'input');
    }

    public static function select(string $id): self
    {
        return self::make($id, 'select');
    }

    public static function textarea(string $id): self
    {
        return self::make($id, 'textarea');
    }

    public static function form(string $id): self
    {
        return self::make($id, 'form');
    }

    public static function badge(string $id): self
    {
        return self::make($id, 'badge');
    }

    public static function alert(string $id): self
    {
        return self::make($id, 'alert');
    }

    public static function tabs(string $id): self
    {
        return self::make($id, 'tabs');
    }

    public static function accordion(string $id): self
    {
        return self::make($id, 'accordion');
    }

    // ==========================================
    // Chainable Property Setters (Common Props)
    // ==========================================

    public function placeholder(string $placeholder): self
    {
        return $this->prop('placeholder', $placeholder);
    }

    public function target(string $target): self
    {
        $this->result = ['target' => $target, 'open' => 'inline'];
        return $this;
    }

    public function result(array $result): self
    {
        $this->result = $result;
        return $this;
    }

    public function icon(string $icon): self
    {
        return $this->prop('icon', $icon);
    }

    public function label(string $label): self
    {
        return $this->prop('label', $label);
    }

    public function text(string $text): self
    {
        return $this->prop('text', $text);
    }

    public function variant(string $variant): self
    {
        return $this->prop('variant', $variant);
    }

    public function size(string $size): self
    {
        return $this->prop('size', $size);
    }

    public function disabled(bool $disabled = true): self
    {
        return $this->prop('disabled', $disabled);
    }

    public function className(string $className): self
    {
        return $this->prop('className', $className);
    }

    public function options(array $options): self
    {
        return $this->prop('options', $options);
    }

    public function value(mixed $value): self
    {
        return $this->prop('value', $value);
    }

    public function defaultValue(mixed $value): self
    {
        return $this->prop('defaultValue', $value);
    }

    // ==========================================
    // Children Management
    // ==========================================

    /**
     * Add child components (for container components)
     */
    public function children(array $children): self
    {
        $this->children = $children;
        return $this;
    }

    /**
     * Add a single child component
     */
    public function child(ComponentBuilder|array $child): self
    {
        $this->children[] = $child instanceof self ? $child->toArray() : $child;
        return $this;
    }

    // ==========================================
    // Build & Export
    // ==========================================

    /**
     * Get the component ID
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * Get the component type
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * Convert to array configuration
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

        // Merge actions into props for proper frontend rendering
        if (!empty($this->actions)) {
            if (!isset($config['props'])) {
                $config['props'] = [];
            }
            $config['props'] = array_merge($config['props'], $this->actions);
        }

        // Result goes at root level (for search bars, etc.)
        if ($this->result !== null) {
            $config['result'] = $this->result;
        }

        if (!empty($this->children)) {
            $config['children'] = array_map(
                fn($child) => $child instanceof self ? $child->toArray() : $child,
                $this->children
            );
        }

        return $config;
    }
}
