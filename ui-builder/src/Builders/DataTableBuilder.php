<?php

namespace HollisLabs\UiBuilder\Builders;

/**
 * DataTableBuilder
 * 
 * Fluent builder for creating data table configurations.
 * Data tables display tabular data with features like sorting, filtering,
 * pagination, and row actions.
 * 
 * @example
 * DataTableBuilder::make('users-table')
 *     ->dataSource('users')
 *     ->columns([
 *         ['key' => 'name', 'label' => 'Name'],
 *         ['key' => 'email', 'label' => 'Email'],
 *     ])
 *     ->onRowClick(ActionBuilder::navigate('users/{{row.id}}'))
 *     ->pagination(true, 25)
 *     ->toolbar([
 *         ComponentBuilder::button('create-user')->text('Create User')
 *     ]);
 */
class DataTableBuilder extends ComponentBuilder
{
    /**
     * Create a new data table builder
     */
    public static function make(string $id, string $type = 'data-table'): self
    {
        $instance = new self($id, $type);
        return $instance;
    }

    /**
     * Set the data source alias
     * 
     * @param string $alias The data source alias (e.g., 'users', 'articles')
     * @return self
     */
    public function dataSource(string $alias): self
    {
        return $this->prop('dataSource', $alias);
    }

    /**
     * Set table columns
     * 
     * Each column should have at minimum:
     * - key: The data field key
     * - label: The column header text
     * 
     * Optional properties:
     * - sortable: Whether the column can be sorted (bool)
     * - width: Column width (string, e.g., '200px', '20%')
     * - align: Text alignment ('left', 'center', 'right')
     * - render: Custom render function name
     * - format: Format type ('date', 'currency', 'number', etc.)
     * 
     * @param array $columns Array of column configurations
     * @return self
     */
    public function columns(array $columns): self
    {
        return $this->prop('columns', $columns);
    }

    /**
     * Set the action when a row is clicked
     * 
     * @param ActionBuilder|array $action Action to execute (navigate, modal, etc.)
     * @return self
     */
    public function onRowClick(ActionBuilder|array $action): self
    {
        return $this->action('onRowClick', $action);
    }

    /**
     * Add toolbar components (buttons, search, filters, etc.)
     * 
     * @param array $components Array of ComponentBuilder instances or arrays
     * @return self
     */
    public function toolbar(array $components): self
    {
        $toolbar = array_map(
            fn($component) => $component instanceof ComponentBuilder 
                ? $component->toArray() 
                : $component,
            $components
        );
        
        return $this->prop('toolbar', $toolbar);
    }

    /**
     * Configure pagination settings
     * 
     * @param bool $enabled Whether pagination is enabled
     * @param int $pageSize Number of rows per page (default: 10)
     * @return self
     */
    public function pagination(bool $enabled = true, int $pageSize = 10): self
    {
        return $this->prop('pagination', [
            'enabled' => $enabled,
            'pageSize' => $pageSize,
        ]);
    }

    /**
     * Enable row selection
     * 
     * @param string $type Selection type: 'single', 'multiple', or 'none'
     * @return self
     */
    public function selection(string $type = 'multiple'): self
    {
        return $this->prop('selection', $type);
    }

    /**
     * Add filter options
     * 
     * Each filter should have:
     * - key: The field to filter on
     * - label: Display label
     * - type: Filter type ('text', 'select', 'date', 'number')
     * - options: Array of options (for select type)
     * 
     * @param array $filters Array of filter configurations
     * @return self
     */
    public function filters(array $filters): self
    {
        return $this->prop('filters', $filters);
    }

    /**
     * Set the default row action (alternative to onRowClick)
     * This is typically used for a primary action button in each row
     * 
     * @param ActionBuilder|array $action Action to execute
     * @return self
     */
    public function rowAction(ActionBuilder|array $action): self
    {
        return $this->action('rowAction', $action);
    }

    /**
     * Set whether the table is loading
     * 
     * @param bool $loading Loading state
     * @return self
     */
    public function loading(bool $loading = true): self
    {
        return $this->prop('loading', $loading);
    }

    /**
     * Set empty state message
     * 
     * @param string $message Message to display when no data
     * @return self
     */
    public function emptyMessage(string $message): self
    {
        return $this->prop('emptyMessage', $message);
    }

    /**
     * Enable or disable sorting globally
     * 
     * @param bool $enabled Whether sorting is enabled
     * @return self
     */
    public function sortable(bool $enabled = true): self
    {
        return $this->prop('sortable', $enabled);
    }

    /**
     * Set default sort configuration
     * 
     * @param string $key Column key to sort by
     * @param string $direction Sort direction ('asc' or 'desc')
     * @return self
     */
    public function defaultSort(string $key, string $direction = 'asc'): self
    {
        return $this->prop('defaultSort', [
            'key' => $key,
            'direction' => $direction,
        ]);
    }

    /**
     * Enable row actions menu (kebab menu)
     * 
     * @param array $actions Array of action configurations
     * @return self
     */
    public function rowActions(array $actions): self
    {
        $processedActions = array_map(
            fn($action) => $action instanceof ActionBuilder 
                ? $action->toArray() 
                : $action,
            $actions
        );
        
        return $this->prop('rowActions', $processedActions);
    }

    /**
     * Set whether rows are striped
     * 
     * @param bool $striped Whether rows alternate colors
     * @return self
     */
    public function striped(bool $striped = true): self
    {
        return $this->prop('striped', $striped);
    }

    /**
     * Set whether rows are hoverable
     * 
     * @param bool $hoverable Whether rows have hover effect
     * @return self
     */
    public function hoverable(bool $hoverable = true): self
    {
        return $this->prop('hoverable', $hoverable);
    }

    /**
     * Set table density/size
     * 
     * @param string $density Density: 'compact', 'normal', or 'comfortable'
     * @return self
     */
    public function density(string $density): self
    {
        return $this->prop('density', $density);
    }
}
