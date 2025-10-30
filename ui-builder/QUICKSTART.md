# UI Builder Quick Start

Get started with the fluent builder API in 5 minutes.

---

## Installation

Already installed! The package is at `vendor/hollis-labs/ui-builder`.

---

## Your First Page (30 seconds)

### Option 1: CLI Tool (Interactive)

```bash
php artisan ui:build-page
```

Follow the prompts!

### Option 2: Code (Programmatic)

```php
use HollisLabs\UiBuilder\Builders\PageConfigBuilder;
use HollisLabs\UiBuilder\Builders\DataTableBuilder;

PageConfigBuilder::make('User Manager')
    ->overlay('modal')
    ->layout('rows', fn($l) => $l
        ->searchBar('search-users', 'Search...', 'table-users')
        ->component(
            DataTableBuilder::make('table-users')
                ->dataSource('User')
                ->columns([
                    ['key' => 'name', 'label' => 'Name', 'sortable' => true],
                    ['key' => 'email', 'label' => 'Email', 'sortable' => true],
                ])
        )
    )
    ->save();
```

Done! Your page is now in the database and accessible via the UI.

---

## Common Patterns

### CRUD Modal

```php
use HollisLabs\UiBuilder\Builders\ActionBuilder;
use HollisLabs\UiBuilder\Builders\ComponentBuilder;

PageConfigBuilder::make('Products')
    ->overlay('modal')
    ->layout('rows', fn($l) => $l
        ->component(
            DataTableBuilder::make('table-products')
                ->dataSource('Product')
                ->columns([...])
                ->onRowClick(
                    ActionBuilder::modal()
                        ->title('Product Details')
                        ->url('/api/ui/datasources/Product/{{row.id}}')
                )
                ->toolbar([
                    ComponentBuilder::buttonIcon('btn-add')
                        ->icon('plus')
                        ->label('New Product')
                        ->onClick(ActionBuilder::createModal('Product'))
                ])
        )
    )
    ->save();
```

### Form Page

```php
use HollisLabs\UiBuilder\Builders\FormBuilder;

PageConfigBuilder::make('Settings')
    ->overlay('page')
    ->route('/settings')
    ->layout('rows', fn($l) => $l
        ->component(
            FormBuilder::make('form-settings')
                ->field('email', 'Email', 
                    ComponentBuilder::input('input-email')
                )
                ->field('notifications', 'Notifications',
                    ComponentBuilder::make('switch-notif', 'switch')
                )
                ->onSubmit(
                    ActionBuilder::http('/api/settings', 'PUT')
                )
        )
    )
    ->save();
```

---

## Key Classes

| Class | Purpose |
|-------|---------|
| `PageConfigBuilder` | Build complete pages |
| `ComponentBuilder` | Build generic components |
| `DataTableBuilder` | Build data tables |
| `FormBuilder` | Build forms |
| `ActionBuilder` | Build actions (click, submit, etc.) |
| `LayoutBuilder` | Configure layouts |
| `ConfigService` | High-level operations |

---

## Quick Reference

### Page Builder

```php
PageConfigBuilder::make('Name')
    ->overlay('modal|sheet|drawer|fullscreen|page')
    ->route('/optional-route')
    ->module('module.key')
    ->layout('rows|columns|grid', fn($l) => ...)
    ->guards(['auth'])
    ->enabled(true)
    ->build() // Returns DTO
    ->save()  // Saves to DB
```

### Data Table Builder

```php
DataTableBuilder::make('id')
    ->dataSource('ModelName')
    ->columns([...])
    ->onRowClick(ActionBuilder::navigate('page-key'))
    ->toolbar([...])
    ->pagination(true, 20)
    ->selection('single|multiple')
```

### Action Builder

```php
// Modal
ActionBuilder::modal()
    ->title('Title')
    ->url('/api/...')
    ->fields([...])

// Navigate
ActionBuilder::navigate('page-key')

// HTTP
ActionBuilder::http('/api/endpoint', 'POST')
    ->payload([...])
    ->refreshTarget('component-id')

// Quick helpers
ActionBuilder::createModal('DataSource')
ActionBuilder::editModal('DataSource')
```

### Component Builder

```php
ComponentBuilder::button('id')
    ->label('Click Me')
    ->icon('icon-name')
    ->variant('default|destructive|outline')
    ->onClick(ActionBuilder::emit('event'))

ComponentBuilder::searchBar('id')
    ->placeholder('Search...')
    ->target('table-id')
```

---

## CLI Commands

```bash
# Interactive page builder
php artisan ui:build-page

# Export pages to JSON
php artisan ui-builder:export-pages

# Sync pages (if using JSON files)
php artisan ui-builder:sync-pages
```

---

## Service Usage

```php
use HollisLabs\UiBuilder\Support\ConfigService;

$service = new ConfigService();

// Get page
$page = $service->getPage('page-key');

// Duplicate
$copy = $service->duplicatePage('source', 'new-key', 'New Name');

// Export
$json = $service->exportToJson('page-key', pretty: true);

// Toggle
$service->togglePage('page-key', enabled: false);
```

---

## Next Steps

1. **Read Full Docs:** See `BUILDERS.md` for complete API reference
2. **Check Examples:** See `EXAMPLES.md` for real-world patterns
3. **Try CLI Tool:** Run `php artisan ui:build-page`
4. **Build Your First Page:** Start simple, iterate
5. **Create Patterns:** Build reusable helper classes

---

## Key Changes from Old System

| Old | New |
|-----|-----|
| Manual JSON editing | Fluent builders |
| `page.model.table.modal` | `model-manager` (semantic) |
| No validation | Build-time validation |
| No helpers | ConfigService + specialized builders |
| CLI with args | Interactive prompts |

---

## Need Help?

- Full API docs: `BUILDERS.md`
- Examples: `EXAMPLES.md`
- Architecture: `ARCHITECTURE.md`
- Package overview: `README.md`

---

**Happy Building!** 🎨
