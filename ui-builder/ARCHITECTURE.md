# UI Builder Architecture

**Package:** hollis-labs/ui-builder  
**Version:** 3.0.0 (with Fluent Builders)  
**Date:** October 29, 2025

---

## Overview

The UI Builder provides a complete system for creating database-driven UI configurations without code deployments. As of v3.0, it includes a comprehensive fluent builder API for programmatic config generation.

---

## Core Concepts

### 1. Database-Driven Configuration

All UI definitions live in the database:

- **Pages** (`ui_pages`) - Complete page configurations
- **Components** (`ui_components`) - Reusable component definitions
- **DataSources** (`ui_datasources`) - Model-to-API mappings
- **Actions** (`ui_actions`) - Action handlers
- **Modules** (`ui_modules`) - Page grouping
- **Themes** (`ui_themes`) - Theme configurations

### 2. Config-Based Rendering

Frontend reads JSON configs and renders components dynamically:

```
Database Config → API → React ComponentRenderer → UI
```

### 3. Fluent Builders (New in v3.0)

Programmatic config generation using fluent API:

```
Builder Pattern → DTO → Validation → Database
```

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│ CLI Layer (Laravel Prompts)                             │
│ - BuildPageCommand                                      │
│ - Interactive wizards                                   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Builder Layer (Fluent API)                              │
│ - PageConfigBuilder                                     │
│ - ComponentBuilder                                      │
│ - DataTableBuilder, FormBuilder                         │
│ - ActionBuilder, LayoutBuilder                          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ DTO Layer (Immutable Objects)                           │
│ - PageConfigDTO                                         │
│ - ComponentConfigDTO                                    │
│ - ActionConfigDTO                                       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Service Layer                                           │
│ - ConfigService (CRUD operations)                       │
│ - DataSourceResolver (data fetching)                    │
│ - ActionAdapter (action handling)                       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Model Layer (Eloquent)                                  │
│ - Page, Component, Datasource                           │
│ - Action, Module, Theme                                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Database (PostgreSQL)                                   │
│ - ui_pages, ui_components                               │
│ - ui_datasources, ui_actions                            │
└─────────────────────────────────────────────────────────┘
```

---

## Package Structure

```
vendor/hollis-labs/ui-builder/
├── src/
│   ├── Builders/              # Fluent config builders
│   │   ├── Concerns/          # Shared traits
│   │   ├── PageConfigBuilder.php
│   │   ├── ComponentBuilder.php
│   │   ├── LayoutBuilder.php
│   │   ├── DataTableBuilder.php
│   │   ├── FormBuilder.php
│   │   └── ActionBuilder.php
│   ├── DTOs/                  # Immutable data objects
│   │   ├── PageConfigDTO.php
│   │   ├── ComponentConfigDTO.php
│   │   └── ActionConfigDTO.php
│   ├── Validators/            # Config validation (stubs)
│   │   ├── PageConfigValidator.php
│   │   └── ComponentSchemaValidator.php
│   ├── Support/               # Helper services
│   │   └── ConfigService.php
│   ├── Console/Commands/      # CLI commands
│   │   ├── BuildPageCommand.php
│   │   ├── ExportUiPages.php
│   │   └── ...
│   ├── Http/Controllers/      # API controllers
│   │   ├── DataSourceController.php
│   │   ├── UiPageController.php
│   │   └── ShellController.php
│   ├── Models/                # Eloquent models
│   │   ├── Page.php
│   │   ├── Component.php
│   │   ├── Datasource.php
│   │   └── ...
│   ├── Services/              # Core services
│   │   ├── DataSourceResolver.php
│   │   └── ActionAdapter.php
│   └── UiBuilderServiceProvider.php
├── resources/
│   ├── js/                    # React components
│   │   ├── components/        # UI components
│   │   ├── hooks/             # React hooks
│   │   └── lib/               # Utilities
│   └── views/                 # Blade templates
├── routes/
│   ├── api.php                # API routes
│   └── web.php                # Web routes
├── database/
│   ├── migrations/            # Database schema
│   └── seeders/               # Example data
├── config/
│   └── ui-builder.php         # Package configuration
├── BUILDERS.md                # Builder API docs
├── EXAMPLES.md                # Usage examples
├── ARCHITECTURE.md            # This file
└── README.md                  # Package overview
```

---

## Data Flow

### Creating a Page (Builder Flow)

```
1. Developer writes code:
   PageConfigBuilder::make('Sprint Manager')
       ->overlay('modal')
       ->layout('rows', fn($l) => ...)
       ->save()

2. Builder validates:
   - Required fields present
   - Valid overlay type
   - Layout configured

3. Builder creates DTO:
   PageConfigDTO(
       id: 'sprint-manager',
       config: [...],
       ...
   )

4. DTO saves to database:
   Page::updateOrCreate([...])

5. Database triggers:
   - Auto-hash calculation
   - Version increment

6. Result:
   Page model with version/hash
```

### Rendering a Page (Frontend Flow)

```
1. Frontend requests page:
   GET /api/ui/pages/sprint-manager

2. Controller loads from database:
   Page::where('key', 'sprint-manager')->first()

3. Returns JSON config:
   {
       "id": "sprint-manager",
       "title": "Sprint Manager",
       "overlay": "modal",
       "layout": { ... },
       "_meta": { ... }
   }

4. React renders:
   ShellPage → PageRenderer → ComponentRegistry → Components

5. Components render with props:
   DataTableComponent renders with dataSource='Sprint'

6. Data fetched via DataSource API:
   GET /api/ui/datasources/Sprint

7. DataSourceResolver handles:
   - Query building
   - Filtering, sorting, pagination
   - Transform to frontend format
```

---

## Key Design Patterns

### 1. Fluent Builder Pattern

All builders use method chaining for expressive configuration:

```php
$page = PageConfigBuilder::make('Name')
    ->overlay('modal')
    ->layout('rows', fn($l) => ...)
    ->save();
```

**Benefits:**
- Type-safe
- IDE autocomplete
- Readable
- Composable

### 2. Immutable DTOs

DTOs are readonly and immutable:

```php
readonly class PageConfigDTO {
    public function __construct(
        public string $id,
        public array $config,
        ...
    ) {}
}
```

**Benefits:**
- Thread-safe
- No accidental mutations
- Clear data contracts

### 3. Trait Composition

Builders use traits for shared behavior:

```php
class ComponentBuilder {
    use HasProps, HasActions;
}
```

**Benefits:**
- DRY code
- Consistent APIs
- Easy to extend

### 4. Service Facade

ConfigService provides high-level operations:

```php
$service = new ConfigService();
$page = $service->getPage('key');
$service->duplicatePage(...);
```

**Benefits:**
- Clean API
- Testable
- Consistent error handling

### 5. Validator Stubs

Validators prepared for future implementation:

```php
class PageConfigValidator {
    // TODO: Implement validation
    public function validate(array $config): array
}
```

**Benefits:**
- Architecture in place
- Easy to implement later
- Clear TODOs

---

## Component Registry

React components are registered dynamically:

```typescript
registry.register('data-table', DataTableComponent);
registry.register('button', ButtonComponent);
```

Configs reference components by type:

```json
{
    "type": "data-table",
    "props": { ... }
}
```

ComponentRenderer looks up and renders:

```typescript
const Component = registry.get(config.type);
return <Component config={config} />;
```

---

## DataSource System

Unified system for data operations:

```
DataSource (ui_datasources)
    ↓
DataSourceResolver
    ↓
Model Query
    ↓
Transform & Return
```

**Features:**
- CRUD operations
- Search, filter, sort
- Pagination
- Field metadata
- Validation rules
- Relationships
- Caching

**Example:**

```php
$resolver->query('Sprint', [
    'search' => 'Q4',
    'filters' => ['status' => 'active'],
    'sort' => ['field' => 'starts_on', 'direction' => 'desc'],
    'pagination' => ['per_page' => 15, 'page' => 1],
]);
```

---

## Naming Conventions

### Page IDs (Changed in v3.0)

**Old:** `page.sprint.table.modal` (dot notation)  
**New:** `sprint-manager` (kebab-case from name)

**Rationale:**
- More semantic
- Easier to read
- Less restrictive format
- User-facing name is primary

### Component IDs

Format: `{type}-{name}`

Examples:
- `table-sprints`
- `search-users`
- `btn-add-product`

### DataSource Aliases

PascalCase model names:

- `Sprint`
- `Task`
- `User`
- `Product`

---

## Validation Strategy

### Build-Time Validation (Current)

Builders validate during `build()`:

- Required fields
- Valid enum values
- Basic structure

### Runtime Validation (TODO)

Validators will implement:

- Schema validation
- DataSource existence
- Component compatibility
- Circular reference detection
- Performance checks

---

## Caching Strategy

### Current Caching

- DataSource configs cached (1 hour)
- Manual cache clearing via `clearCache()`

### Future Caching (TODO)

- Page configs cached
- Component schemas cached
- Cache invalidation on update
- Redis backend option

---

## Extension Points

### 1. Custom Builders

Create domain-specific builders:

```php
class SprintPageBuilder extends PageConfigBuilder {
    public function withTasksTable(): self {
        // Custom logic
        return $this;
    }
}
```

### 2. Custom Components

Register new component types:

```typescript
registry.register('my-custom-component', MyComponent);
```

```php
ComponentBuilder::make('id', 'my-custom-component')
    ->props([...]);
```

### 3. Custom Validators

Implement validation logic:

```php
class PageConfigValidator {
    public function validate(array $config): array {
        // Your validation rules
    }
}
```

### 4. Custom Actions

Add new action types:

```php
ActionBuilder::custom('my-action')
    ->config([...]);
```

---

## Testing Strategy

### Unit Tests

Test builders in isolation:

```php
it('builds valid page config', function() {
    $page = PageConfigBuilder::make('Test')
        ->overlay('modal')
        ->layout('rows')
        ->build();
        
    expect($page->config)->toHaveKey('layout');
});
```

### Integration Tests

Test full flow:

```php
it('saves page to database', function() {
    $page = PageConfigBuilder::make('Test')
        ->layout('rows')
        ->save();
        
    expect(Page::where('key', 'test')->exists())->toBeTrue();
});
```

### Frontend Tests

Test component rendering:

```typescript
test('renders data table', () => {
    const config = { type: 'data-table', props: {...} };
    render(<ComponentRenderer config={config} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
});
```

---

## Performance Considerations

### 1. Lazy Loading

Components loaded on-demand:

```typescript
import('./components/DataTableComponent').then(...)
```

### 2. Caching

DataSource configs cached to reduce DB queries.

### 3. Pagination

Always paginate large datasets:

```php
DataTableBuilder::make('table')
    ->pagination(true, 25) // Default 25 per page
```

### 4. Indexing

Database indexes on:
- `ui_pages.key`
- `ui_pages.enabled`
- `ui_datasources.alias`

---

## Security Considerations

### 1. Guards

Pages can require authentication:

```php
PageConfigBuilder::make('Admin Panel')
    ->guards(['auth', 'admin'])
```

### 2. DataSource Permissions

DataSources should implement authorization:

```php
// In DataSourceResolver
if (!$user->can('view', $model)) {
    throw UnauthorizedException();
}
```

### 3. Input Validation

All user inputs validated:

```php
FormBuilder::make('form')
    ->validation('email', ['required', 'email'])
```

### 4. XSS Protection

React auto-escapes by default. For raw HTML:

```typescript
dangerouslySetInnerHTML // Avoid if possible
```

---

## Migration Path

### From Manual JSON to Builders

1. **Read existing config:**
   ```php
   $service = new ConfigService();
   $page = $service->getPage('old-page');
   ```

2. **Recreate with builder:**
   ```php
   $new = PageConfigBuilder::make('New Page')
       ->overlay($page->config['overlay'])
       ->layout(...) // Recreate layout
       ->save();
   ```

3. **Test thoroughly**

4. **Disable old page:**
   ```php
   $service->togglePage('old-page', false);
   ```

5. **Remove old page:**
   ```php
   $service->deletePage('old-page');
   ```

---

## Future Roadmap

### v3.1 (Q1 2026)
- Implement full validation system
- Add caching layer
- Performance optimizations
- More specialized builders (ChartBuilder, CalendarBuilder)

### v3.2 (Q2 2026)
- Visual builder UI (using UI Builder to build UI Builder!)
- Template system
- Import/export workflows
- Version history

### v3.3 (Q3 2026)
- Real-time collaboration
- A/B testing support
- Analytics integration
- Advanced permissions

---

## Support & Contributing

**Internal Package:** hollis-labs/ui-builder  
**Maintained by:** Hollis Labs  
**Contact:** chrispian@hollislabs.com

---

For usage examples, see `EXAMPLES.md`.  
For builder API docs, see `BUILDERS.md`.  
For general info, see `README.md`.
