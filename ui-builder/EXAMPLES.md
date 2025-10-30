# UI Builder Examples

Practical examples using the fluent builder API.

---

## Example 1: Simple CRUD Modal

```php
use HollisLabs\UiBuilder\Builders\PageConfigBuilder;
use HollisLabs\UiBuilder\Builders\DataTableBuilder;
use HollisLabs\UiBuilder\Builders\ComponentBuilder;
use HollisLabs\UiBuilder\Builders\ActionBuilder;

$page = PageConfigBuilder::make('Product Catalog')
    ->overlay('modal')
    ->module('ecommerce.products')
    ->layout('rows', function ($layout) {
        // Search bar
        $layout->searchBar('search-products', 'Search products...', 'table-products');
        
        // Data table
        $layout->component(
            DataTableBuilder::make('table-products')
                ->dataSource('Product')
                ->columns([
                    ['key' => 'sku', 'label' => 'SKU', 'sortable' => true],
                    ['key' => 'name', 'label' => 'Name', 'sortable' => true],
                    ['key' => 'category', 'label' => 'Category', 'filterable' => true],
                    ['key' => 'price', 'label' => 'Price', 'sortable' => true],
                    ['key' => 'stock', 'label' => 'Stock', 'sortable' => true],
                    ['key' => 'status', 'label' => 'Status', 'filterable' => true],
                ])
                ->onRowClick(
                    ActionBuilder::modal()
                        ->title('Product Details')
                        ->url('/api/ui/datasources/Product/{{row.id}}')
                        ->fields([
                            ['key' => 'sku', 'label' => 'SKU', 'type' => 'text'],
                            ['key' => 'name', 'label' => 'Name', 'type' => 'text'],
                            ['key' => 'description', 'label' => 'Description', 'type' => 'textarea'],
                            ['key' => 'price', 'label' => 'Price', 'type' => 'number'],
                            ['key' => 'stock', 'label' => 'Stock', 'type' => 'number'],
                        ])
                )
                ->toolbar([
                    ComponentBuilder::buttonIcon('btn-add-product')
                        ->icon('plus')
                        ->label('New Product')
                        ->onClick(
                            ActionBuilder::modal()
                                ->title('Add New Product')
                                ->fields([
                                    ['name' => 'sku', 'label' => 'SKU', 'type' => 'text', 'required' => true],
                                    ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                                    ['name' => 'description', 'label' => 'Description', 'type' => 'textarea'],
                                    ['name' => 'category', 'label' => 'Category', 'type' => 'select', 'options' => [
                                        ['value' => 'electronics', 'label' => 'Electronics'],
                                        ['value' => 'books', 'label' => 'Books'],
                                        ['value' => 'clothing', 'label' => 'Clothing'],
                                    ]],
                                    ['name' => 'price', 'label' => 'Price', 'type' => 'number', 'required' => true],
                                    ['name' => 'stock', 'label' => 'Initial Stock', 'type' => 'number'],
                                ])
                                ->submitUrl('/api/ui/datasources/Product')
                                ->submitMethod('POST')
                                ->submitLabel('Create Product')
                                ->refreshTarget('table-products')
                        ),
                    ComponentBuilder::button('btn-export')
                        ->icon('download')
                        ->label('Export CSV')
                        ->variant('outline')
                        ->onClick(
                            ActionBuilder::http('/api/products/export', 'GET')
                        )
                ])
                ->pagination(true, 25)
                ->selection('multiple')
                ->striped(true)
                ->hoverable(true)
        );
    })
    ->save();
```

---

## Example 2: Three-Layer Navigation (Sprint → Task → Detail)

```php
// Layer 1: Sprint Manager
$sprintManager = PageConfigBuilder::make('Sprint Manager')
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
                    ['key' => 'task_count', 'label' => 'Tasks', 'sortable' => true],
                    ['key' => 'starts_on', 'label' => 'Start', 'sortable' => true],
                    ['key' => 'ends_on', 'label' => 'End', 'sortable' => true],
                ])
                ->onRowClick(ActionBuilder::navigate('sprint-detail'))
                ->toolbar([
                    ComponentBuilder::buttonIcon('btn-new-sprint')
                        ->icon('plus')
                        ->label('New Sprint')
                        ->onClick(ActionBuilder::createModal('Sprint', [
                            ['name' => 'code', 'label' => 'Sprint Code', 'type' => 'text', 'required' => true],
                            ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
                            ['name' => 'starts_on', 'label' => 'Start Date', 'type' => 'date', 'required' => true],
                            ['name' => 'ends_on', 'label' => 'End Date', 'type' => 'date', 'required' => true],
                        ]))
                ])
        )
    )
    ->save();

// Layer 2: Sprint Detail (Tasks)
$sprintDetail = PageConfigBuilder::make('Sprint Detail')
    ->overlay('modal')
    ->module('core.sprints')
    ->layout('rows', function($l) {
        // Sprint info header
        $l->component(
            ComponentBuilder::card('card-sprint-info')
                ->props([
                    'title' => '{{sprint.title}}',
                    'description' => 'Sprint {{sprint.code}} | {{sprint.starts_on}} - {{sprint.ends_on}}',
                ])
        );
        
        // Tasks table
        $l->searchBar('search-tasks', 'Search tasks...', 'table-tasks');
        $l->component(
            DataTableBuilder::make('table-tasks')
                ->dataSource('Task')
                ->columns([
                    ['key' => 'code', 'label' => 'Code', 'sortable' => true],
                    ['key' => 'name', 'label' => 'Task', 'sortable' => true],
                    ['key' => 'status', 'label' => 'Status', 'filterable' => true],
                    ['key' => 'priority', 'label' => 'Priority', 'filterable' => true],
                    ['key' => 'assigned_to', 'label' => 'Assigned', 'sortable' => true],
                ])
                ->onRowClick(ActionBuilder::navigate('task-detail'))
                ->toolbar([
                    ComponentBuilder::buttonIcon('btn-new-task')
                        ->icon('plus')
                        ->label('New Task')
                        ->onClick(ActionBuilder::createModal('Task'))
                ])
        );
    })
    ->save();

// Layer 3: Task Detail (Custom Layout)
$taskDetail = PageConfigBuilder::make('Task Detail')
    ->overlay('modal')
    ->module('core.sprints')
    ->customLayout('component.task.detail.custom')
    ->save();
```

---

## Example 3: Form-Heavy Page

```php
use HollisLabs\UiBuilder\Builders\FormBuilder;

$userProfile = PageConfigBuilder::make('User Profile')
    ->overlay('page')
    ->route('/profile')
    ->layout('rows', function($l) {
        $l->component(
            ComponentBuilder::card('card-profile')
                ->children([
                    FormBuilder::make('form-profile')
                        ->field('avatar', 'Profile Picture',
                            ComponentBuilder::make('input-avatar', 'file')
                                ->prop('accept', 'image/*')
                        )
                        ->field('name', 'Full Name',
                            ComponentBuilder::input('input-name')
                                ->placeholder('John Doe')
                        )
                        ->field('email', 'Email',
                            ComponentBuilder::input('input-email')
                                ->disabled(true) // Email can't be changed
                        )
                        ->field('bio', 'Bio',
                            ComponentBuilder::textarea('textarea-bio')
                                ->placeholder('Tell us about yourself...')
                                ->prop('rows', 5)
                        )
                        ->field('role', 'Role',
                            ComponentBuilder::select('select-role')
                                ->options([
                                    ['value' => 'admin', 'label' => 'Administrator'],
                                    ['value' => 'editor', 'label' => 'Editor'],
                                    ['value' => 'viewer', 'label' => 'Viewer'],
                                ])
                        )
                        ->field('notifications', 'Email Notifications',
                            ComponentBuilder::make('switch-notifications', 'switch')
                                ->label('Receive email notifications')
                        )
                        ->validation('name', ['required', 'min:3'])
                        ->validation('bio', ['max:500'])
                        ->onSubmit(
                            ActionBuilder::http('/api/profile', 'PUT')
                                ->payload(['{{formData}}'])
                                ->refreshTarget('card-profile')
                        )
                        ->submitButton(
                            ComponentBuilder::button('btn-save')
                                ->label('Save Changes')
                                ->variant('default')
                        )
                ])
        );
    })
    ->save();
```

---

## Example 4: Dashboard with Multiple Sections

```php
$dashboard = PageConfigBuilder::make('Dashboard')
    ->overlay('page')
    ->route('/dashboard')
    ->layout('rows', function($l) {
        // Header with stats
        $l->component(
            ComponentBuilder::card('card-stats')
                ->children([
                    // TODO: Add stat components when available
                ])
        );
        
        // Recent activity table
        $l->component(
            ComponentBuilder::card('card-activity')
                ->prop('title', 'Recent Activity')
                ->children([
                    DataTableBuilder::make('table-activity')
                        ->dataSource('Activity')
                        ->columns([
                            ['key' => 'user', 'label' => 'User'],
                            ['key' => 'action', 'label' => 'Action'],
                            ['key' => 'resource', 'label' => 'Resource'],
                            ['key' => 'timestamp', 'label' => 'When', 'sortable' => true],
                        ])
                        ->pagination(true, 10)
                        ->defaultSort('timestamp', 'desc')
                ])
        );
        
        // Quick actions
        $l->component(
            ComponentBuilder::card('card-actions')
                ->prop('title', 'Quick Actions')
                ->children([
                    ComponentBuilder::make('button-group-actions', 'button-group')
                        ->prop('buttons', [
                            ['value' => 'new-sprint', 'label' => 'New Sprint', 'icon' => 'plus'],
                            ['value' => 'new-task', 'label' => 'New Task', 'icon' => 'check'],
                            ['value' => 'new-agent', 'label' => 'New Agent', 'icon' => 'user'],
                        ])
                ])
        );
    })
    ->save();
```

---

## Example 5: Using ConfigService

```php
use HollisLabs\UiBuilder\Support\ConfigService;

$service = new ConfigService();

// Get all pages in a module
$sprintPages = $service->getPagesByModule('core.sprints');

foreach ($sprintPages as $page) {
    echo "{$page->name} ({$page->id})\n";
}

// Duplicate a page
$copy = $service->duplicatePage(
    'sprint-manager',
    'archived-sprints',
    'Archived Sprints Manager'
);

// Enable the copy
$service->togglePage('archived-sprints', enabled: true);

// Export to JSON file
$json = $service->exportToJson('sprint-manager', pretty: true);
file_put_contents('sprint-manager.json', $json);

// Import from JSON
$importedJson = file_get_contents('sprint-manager.json');
$imported = $service->importFromJson($importedJson);
```

---

## Example 6: Reusable Patterns

Create helper classes for common patterns:

```php
namespace App\Support\UiPatterns;

use HollisLabs\UiBuilder\Builders\PageConfigBuilder;
use HollisLabs\UiBuilder\Builders\DataTableBuilder;
use HollisLabs\UiBuilder\Builders\ActionBuilder;
use Illuminate\Support\Str;

class CrudModalPattern
{
    public static function make(
        string $name,
        string $dataSource,
        array $columns,
        array $createFields = []
    ): PageConfigBuilder {
        $slug = Str::kebab($name);
        
        return PageConfigBuilder::make($name)
            ->overlay('modal')
            ->layout('rows', function($l) use ($slug, $dataSource, $columns, $createFields) {
                $l->searchBar("search-{$slug}", "Search {$name}...", "table-{$slug}");
                $l->component(
                    DataTableBuilder::make("table-{$slug}")
                        ->dataSource($dataSource)
                        ->columns($columns)
                        ->onRowClick(
                            ActionBuilder::modal()
                                ->title("{$dataSource} Details")
                                ->url("/api/ui/datasources/{$dataSource}/{{row.id}}")
                        )
                        ->toolbar([
                            ComponentBuilder::buttonIcon("btn-add-{$slug}")
                                ->icon('plus')
                                ->label("New {$dataSource}")
                                ->onClick(
                                    ActionBuilder::createModal($dataSource, $createFields)
                                )
                        ])
                );
            });
    }
}

// Usage:
CrudModalPattern::make(
    'Product Catalog',
    'Product',
    [
        ['key' => 'name', 'label' => 'Name', 'sortable' => true],
        ['key' => 'price', 'label' => 'Price', 'sortable' => true],
    ],
    [
        ['name' => 'name', 'label' => 'Product Name', 'type' => 'text', 'required' => true],
        ['name' => 'price', 'label' => 'Price', 'type' => 'number', 'required' => true],
    ]
)->save();
```

---

## Example 7: CLI Usage

```bash
# Start interactive builder
php artisan ui:build-page

# Follow prompts:
# Page Name: Sprint Manager
# Display Type: modal
# Route: (leave empty)
# Module Key: core.sprints
# Layout Type: rows
# 
# Add component: data-table
# Component ID: table-sprints
# Data Source: Sprint
# Columns (JSON): [{"key":"code","label":"Code","sortable":true}]
# Add row click action? Yes
# Row click action: navigate
# Navigate to page key: sprint-detail
# 
# Add another component? No
# 
# Review & Save...
```

---

## Tips

1. **Use helpers** - `searchBar()`, `dataTable()`, `createModal()` shortcuts save time
2. **Chain methods** - All builders are fluent
3. **Type safety** - Let IDE autocomplete guide you
4. **Preview first** - Use `build()` to inspect config before `save()`
5. **Modularize** - Create pattern classes for repeated structures
6. **Test incrementally** - Build small, test, then expand
7. **Use ConfigService** - High-level operations are cleaner

---

For more details, see `BUILDERS.md`.
