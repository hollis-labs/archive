# UI Builder - Fluent Config Builders

**Version:** 1.0.0  
**Date:** October 29, 2025

---

## Overview

The UI Builder now includes a comprehensive fluent builder system for creating page configurations programmatically. This eliminates the need to manually craft JSON configs and provides type safety, validation, and an expressive API.

## Architecture

```
src/
├── Builders/
│   ├── Concerns/
│   │   ├── HasProps.php           # Trait for component properties
│   │   ├── HasActions.php         # Trait for component actions
│   │   └── HasValidation.php      # Trait for validation
│   ├── PageConfigBuilder.php      # Main page builder
│   ├── ComponentBuilder.php       # Generic component builder
│   ├── LayoutBuilder.php          # Layout configuration
│   ├── DataTableBuilder.php       # Specialized data table builder
│   ├── FormBuilder.php            # Specialized form builder
│   └── ActionBuilder.php          # Action configuration builder
├── DTOs/
│   ├── PageConfigDTO.php          # Immutable page config
│   ├── ComponentConfigDTO.php     # Immutable component config
│   └── ActionConfigDTO.php        # Immutable action config
├── Validators/
│   ├── PageConfigValidator.php    # Page validation (stub)
│   └── ComponentSchemaValidator.php # Component validation (stub)
└── Support/
    └── ConfigService.php          # High-level config service
```

---

## Quick Start

### 1. Simple Page with Data Table

```php
use HollisLabs\UiBuilder\Builders\PageConfigBuilder;
use HollisLabs\UiBuilder\Builders\DataTableBuilder;
use HollisLabs\UiBuilder\Builders\ActionBuilder;

$page = PageConfigBuilder::make('User Management')
    ->overlay('modal')
    ->layout('rows', function ($layout) {
        // Add search bar
        $layout->searchBar('search-users', 'Search users...', 'table-users');
        
        // Add data table
        $layout->component(
            DataTableBuilder::make('table-users')
                ->dataSource('User')
                ->columns([
                    ['key' => 'name', 'label' => 'Name', 'sortable' => true],
                    ['key' => 'email', 'label' => 'Email', 'sortable' => true],
                    ['key' => 'role', 'label' => 'Role', 'filterable' => true],
                ])
                ->onRowClick(
                    ActionBuilder::modal()
                        ->title('User Details')
                        ->url('/api/ui/datasources/User/{{row.id}}')
                )
                ->toolbar([
                    ComponentBuilder::button('btn-add-user')
                        ->icon('plus')
                        ->label('New User')
                        ->onClick(ActionBuilder::createModal('User'))
                ])
        );
    })
    ->save();
```

### 2. Sprint Manager (Your Example)

```php
$sprints = PageConfigBuilder::make('Sprint Manager')
    ->overlay('modal')
    ->module('core.sprints')
    ->layout('rows', fn($l) => $l
        ->searchBar('search-sprints', 'Search sprints...', 'table-sprints')
        ->component(
            DataTableBuilder::make('table-sprints')
                ->dataSource('Sprint')
                ->columns([
                    ['key' => 'code', 'label' => 'Code', 'sortable' => true],
                    ['key' => 'title', 'label' => 'Title', 'sortable' => true],
                    ['key' => 'status', 'label' => 'Status', 'filterable' => true],
                    ['key' => 'starts_on', 'label' => 'Start Date', 'sortable' => true],
                    ['key' => 'ends_on', 'label' => 'End Date', 'sortable' => true],
                ])
                ->onRowClick(ActionBuilder::navigate('sprint-detail'))
                ->toolbar([
                    ComponentBuilder::buttonIcon('btn-new-sprint')
                        ->icon('plus')
                        ->label('New Sprint')
                        ->onClick(ActionBuilder::createModal('Sprint'))
                ])
        )
    )
    ->save();
```

---

## CLI Tool

### Interactive Builder

```bash
php artisan ui:build-page
```

This launches an interactive wizard using Laravel Prompts:

1. **Page Information**
   - Page Name → auto-generates kebab-case ID
   - Display Type (modal/sheet/drawer/fullscreen/page)
   - Route (optional)
   - Module Key (optional)

2. **Layout**
   - Choose layout type (rows/columns/grid)

3. **Components**
   - Add components interactively
   - Configure each component with prompts
   - Specialized builders for common types (data-table, search bar, button)

4. **Review & Save**
   - Preview generated JSON
   - Confirm and save to database

---

## Builder Classes

### PageConfigBuilder

Main builder for complete page configurations.

**Methods:**
- `make(string $name)` - Create builder with user-facing name
- `id(string $id)` - Override auto-generated ID
- `overlay(string $overlay)` - Set display type
- `route(string $route)` - Set route
- `module(string $moduleKey)` - Set module
- `layout(string $type, callable $callback)` - Configure layout
- `customLayout(string $layoutId)` - Use pre-built layout
- `guards(array $guards)` - Set auth guards
- `enabled(bool $enabled)` - Set enabled status
- `meta(array $meta)` - Set metadata
- `build()` - Build PageConfigDTO
- `save()` - Build and save to database

**Example:**
```php
PageConfigBuilder::make('Dashboard')
    ->overlay('page')
    ->route('/dashboard')
    ->module('core.app')
    ->layout('rows', function($layout) {
        // Add components...
    })
    ->enabled(true)
    ->save();
```

---

### ComponentBuilder

Generic builder for all component types.

**Factory Methods:**
- `make(string $id, string $type)`
- `searchBar(string $id)`
- `button(string $id)`
- `buttonIcon(string $id)`
- `card(string $id)`
- `input(string $id)`
- `select(string $id)`
- `textarea(string $id)`
- `form(string $id)`
- `badge(string $id)`
- `alert(string $id)`
- `tabs(string $id)`
- `accordion(string $id)`

**Common Property Methods:**
- `placeholder(string $placeholder)`
- `target(string $target)`
- `icon(string $icon)`
- `label(string $label)`
- `text(string $text)`
- `variant(string $variant)`
- `size(string $size)`
- `disabled(bool $disabled)`
- `className(string $className)`
- `options(array $options)`
- `value(mixed $value)`
- `defaultValue(mixed $value)`

**Action Methods (from HasActions trait):**
- `onClick(ActionBuilder|array $action)`
- `onSubmit(ActionBuilder|array $action)`
- `onChange(ActionBuilder|array $action)`
- `action(string $event, ActionBuilder|array $action)`

**Children Methods:**
- `children(array $children)`
- `child(ComponentBuilder|array $child)`

**Example:**
```php
ComponentBuilder::button('btn-save')
    ->label('Save Changes')
    ->variant('default')
    ->icon('save')
    ->onClick(
        ActionBuilder::http('/api/save', 'POST')
            ->payload(['data' => '{{formData}}'])
            ->refreshTarget('data-table')
    );
```

---

### DataTableBuilder

Specialized builder for data tables. Extends ComponentBuilder.

**Methods:**
- `make(string $id)` - Create builder
- `dataSource(string $alias)` - Set data source
- `columns(array $columns)` - Set columns
- `onRowClick(ActionBuilder|array $action)` - Row click handler
- `toolbar(array $components)` - Add toolbar buttons
- `pagination(bool $enabled, int $pageSize)` - Configure pagination
- `selection(string $type)` - Enable selection
- `filters(array $filters)` - Add filters
- `rowAction(ActionBuilder|array $action)` - Default row action
- `loading(bool $loading)` - Set loading state
- `emptyMessage(string $message)` - Empty state message
- `sortable(bool $sortable)` - Enable sorting
- `defaultSort(string $field, string $direction)` - Default sort
- `rowActions(array $actions)` - Row action menu
- `striped(bool $striped)` - Striped rows
- `hoverable(bool $hoverable)` - Hover effects
- `density(string $density)` - Table density

**Example:**
```php
DataTableBuilder::make('table-agents')
    ->dataSource('Agent')
    ->columns([
        ['key' => 'name', 'label' => 'Name', 'sortable' => true],
        ['key' => 'status', 'label' => 'Status', 'filterable' => true],
    ])
    ->onRowClick(ActionBuilder::navigate('agent-detail'))
    ->pagination(true, 20)
    ->selection('multiple')
    ->striped(true)
    ->hoverable(true);
```

---

### FormBuilder

Specialized builder for forms. Extends ComponentBuilder.

**Methods:**
- `make(string $id)` - Create builder
- `field(string $name, string $label, ComponentBuilder|array $field)` - Add field
- `fields(array $fields)` - Set all fields
- `validation(string $name, array $rules)` - Add validation
- `onSubmit(ActionBuilder|array $action)` - Submit handler
- `submitButton(ComponentBuilder|array $button)` - Customize button
- `resetButton(bool $enabled)` - Enable reset button

**Example:**
```php
FormBuilder::make('form-create-user')
    ->field('name', 'Full Name', 
        ComponentBuilder::input('input-name')
            ->placeholder('John Doe')
    )
    ->field('email', 'Email',
        ComponentBuilder::input('input-email')
            ->placeholder('john@example.com')
    )
    ->validation('name', ['required', 'min:3'])
    ->validation('email', ['required', 'email'])
    ->onSubmit(
        ActionBuilder::http('/api/users', 'POST')
            ->payload(['{{formData}}'])
            ->refreshTarget('table-users')
    )
    ->submitButton(
        ComponentBuilder::button('btn-submit')
            ->label('Create User')
            ->variant('default')
    );
```

---

### LayoutBuilder

Builder for layout configurations.

**Methods:**
- `make(string $type, string $id)` - Create builder
- `rows(string $id)` - Vertical stack
- `columns(string $id)` - Horizontal stack
- `grid(string $id)` - Grid layout
- `component(ComponentBuilder|array $component)` - Add component
- `components(array $components)` - Add multiple
- `searchBar(string $id, string $placeholder, string $targetTable)` - Helper
- `dataTable(string $id)` - Helper (returns DataTableBuilder)
- `prop(string $key, mixed $value)` - Set layout prop
- `gridColumns(int $columns)` - Grid columns
- `gap(string $gap)` - Gap between items

**Example:**
```php
LayoutBuilder::rows('main-layout')
    ->searchBar('search', 'Search...', 'table-data')
    ->component(
        DataTableBuilder::make('table-data')
            ->dataSource('Model')
    )
    ->gap('4');
```

---

### ActionBuilder

Builder for action configurations.

**Factory Methods:**
- `modal()` - Create modal action
- `navigate(string $page)` - Create navigate action
- `emit(string $event)` - Create emit action
- `http(string $url, string $method)` - Create HTTP action
- `createModal(string $dataSource, array $fields)` - Quick CRUD helper
- `editModal(string $dataSource, array $fields)` - Quick edit helper

**Methods:**
- `title(string $title)` - Modal title
- `fields(array $fields)` - Modal fields
- `submitUrl(string $url)` - Form submit URL
- `submitMethod(string $method)` - HTTP method
- `submitLabel(string $label)` - Submit button label
- `refreshTarget(string $componentId)` - Component to refresh
- `url(string $url)` - Detail view URL
- `payload(array $payload)` - Request payload
- `params(array $params)` - Route params
- `modalType(string $type)` - Modal type (form/detail)

**Examples:**
```php
// Modal with form
ActionBuilder::modal()
    ->title('Create Sprint')
    ->fields([
        ['name' => 'code', 'label' => 'Code', 'type' => 'text'],
        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
    ])
    ->submitUrl('/api/ui/datasources/Sprint')
    ->submitMethod('POST')
    ->refreshTarget('table-sprints');

// Quick CRUD helper
ActionBuilder::createModal('Sprint');

// Navigate action
ActionBuilder::navigate('sprint-detail')
    ->params(['id' => '{{row.id}}']);

// HTTP action
ActionBuilder::http('/api/process', 'POST')
    ->payload(['item' => '{{row.id}}'])
    ->refreshTarget('data-table');

// Emit event
ActionBuilder::emit('dataRefreshed')
    ->params(['source' => 'table']);
```

---

## DTOs

### PageConfigDTO

Immutable page configuration.

**Properties:**
- `id` - Page key/ID
- `name` - User-facing name
- `config` - Full config array
- `route` - Optional route
- `moduleKey` - Module grouping
- `guards` - Auth guards
- `enabled` - Enabled status

**Methods:**
- `toArray()` - Convert to array
- `toJson(int $options)` - Convert to JSON
- `save()` - Save to database
- `fromPage(Page $page)` - Create from model
- `fromArray(array $data)` - Create from array

---

### ComponentConfigDTO

Immutable component configuration.

**Properties:**
- `id` - Component ID
- `type` - Component type
- `props` - Properties
- `actions` - Actions
- `children` - Child components

**Methods:**
- `toArray()` - Convert to array
- `toJson(int $options)` - Convert to JSON
- `fromArray(array $data)` - Create from array

---

### ActionConfigDTO

Immutable action configuration.

**Properties:**
- `type` - Action type
- `config` - Action config

**Methods:**
- `toArray()` - Convert to array
- `toJson(int $options)` - Convert to JSON
- `fromArray(array $data)` - Create from array
- `isModal()` - Check if modal type
- `isNavigate()` - Check if navigate type
- `isHttp()` - Check if HTTP type
- `isEmit()` - Check if emit type

---

## ConfigService

High-level service for config operations.

**Methods:**
- `getPage(string $key)` - Get page by key
- `getEnabledPages()` - Get all enabled pages
- `savePage(PageConfigDTO $dto)` - Save with validation
- `deletePage(string $key)` - Delete page
- `duplicatePage(string $sourceKey, string $newKey, string $newName)` - Duplicate
- `togglePage(string $key, ?bool $enabled)` - Enable/disable
- `getPagesByModule(string $moduleKey)` - Get by module
- `exportToJson(string $key, bool $pretty)` - Export to JSON
- `importFromJson(string $json)` - Import from JSON
- `clearCache(?string $key)` - Clear cache

**Example:**
```php
use HollisLabs\UiBuilder\Support\ConfigService;

$service = new ConfigService();

// Get a page
$page = $service->getPage('user-management');

// Duplicate
$copy = $service->duplicatePage(
    'user-management',
    'admin-users',
    'Admin Users'
);

// Export
$json = $service->exportToJson('user-management', pretty: true);

// Toggle
$service->togglePage('user-management', enabled: false);
```

---

## Naming Convention Change

**Old Format:** `page.sprint.table.modal`  
**New Format:** User-facing name → kebab-case ID

**Examples:**
- "Sprint Manager" → `sprint-manager`
- "User Management" → `user-management`
- "Task Detail View" → `task-detail-view`

This eliminates the rigid dot-notation structure and focuses on semantic naming.

---

## Using with Existing Pages

### Load and Modify

```php
use HollisLabs\UiBuilder\Support\ConfigService;
use HollisLabs\UiBuilder\DTOs\PageConfigDTO;

$service = new ConfigService();
$existingPage = $service->getPage('sprint-manager');

// Modify config array
$config = $existingPage->config;
$config['layout']['children'][] = [
    'id' => 'new-component',
    'type' => 'button',
    'props' => ['label' => 'New Button'],
];

// Save updated config
$updated = new PageConfigDTO(
    id: $existingPage->id,
    name: $existingPage->name,
    config: $config,
    route: $existingPage->route,
    moduleKey: $existingPage->moduleKey,
    guards: $existingPage->guards,
    enabled: $existingPage->enabled
);

$service->savePage($updated);
```

---

## Validators (Coming Soon)

Validators are stubbed for future implementation:

- **PageConfigValidator** - Validates complete page configs
- **ComponentSchemaValidator** - Validates components against schemas

TODO items are documented in each validator class.

---

## Next Steps

1. **Use the CLI tool** to create your first page interactively
2. **Use builders in seeders** to replace manual JSON
3. **Create custom builders** for domain-specific patterns
4. **Implement validators** as needed
5. **Build Option 1** - Use the CLI to create the UI Builder meta-tool

---

## Examples

See `EXAMPLES.md` for more usage examples including:
- CRUD modals
- Multi-layer navigation (Sprint → Task → Detail)
- Custom form layouts
- Complex data tables
- Action chains

---

**Questions? Issues?** Check the inline PHPDoc comments in each builder class.
