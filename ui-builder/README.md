# UI Builder Package

Database-driven UI configuration system for building dynamic interfaces without code changes.

## Overview

The UI Builder package provides a complete system for managing UI configurations, data sources, and dynamic components through a database-driven architecture. All UI definitions, data mappings, and component registries are stored in the database, eliminating the need for code changes when adding or modifying UI elements.

## Core Architecture

### Unified DataSource System

The package centers around a **single, unified DataSource system** that handles all data operations:

```
DataSource System
├── Table: ui_datasources (single source of truth)
├── Resolver: DataSourceResolver (handles all operations)
└── Controller: TypesController (API endpoints)
```

**Key Features:**
- ✅ Full CRUD operations (query, show, create, update, delete)
- ✅ Field metadata with validation rules
- ✅ Relationship definitions
- ✅ Capabilities system (searchable, sortable, filterable)
- ✅ Transform schemas for output formatting
- ✅ Default parameters (eager loading, scopes, sorting)
- ✅ Built-in caching

## Structure

```
vendor/hollis-labs/ui-builder/
├── src/
│   ├── Http/Controllers/
│   │   ├── DataSourceController.php    # DataSource CRUD API
│   │   └── TypesController.php         # Type system API (uses DataSourceResolver)
│   ├── Models/
│   │   ├── Page.php                    # Page configurations
│   │   ├── Component.php               # Component definitions
│   │   ├── Datasource.php              # Data source configurations (unified system)
│   │   ├── Action.php                  # Action definitions
│   │   ├── Module.php                  # Module grouping
│   │   └── Theme.php                   # Theme configurations
│   └── Services/
│       └── DataSourceResolver.php      # Unified data source resolver
├── database/
│   ├── migrations/                     # Package migrations
│   └── seeders/                        # Package seeders
├── routes/
│   ├── api.php                         # API routes
│   └── web.php                         # Web routes
├── config/
│   └── ui-builder.php                  # Package configuration
└── UiBuilderServiceProvider.php        # Service provider
```

## DataSource System

### Database Schema

The `ui_datasources` table stores all data source configurations:

```sql
ui_datasources
├── alias                     # Unique identifier (e.g., 'UiPage', 'Agent')
├── model_class               # Eloquent model class
├── handler                   # Optional model override
├── resolver_class            # Resolver to use
├── capabilities_json         # {searchable, filterable, sortable, create, update, delete}
├── fields_json               # [{name, type, label, required, searchable, sortable, filterable, validation, metadata, order}]
├── relations_json            # [{name, type, related_type, foreign_key, local_key, metadata}]
├── config_json               # {table, primary_key, source_type}
├── schema_json               # {transform: {...}}
├── default_params_json       # {with, scopes, default_sort}
├── metadata_json             # {description, icon, category, display_name}
└── enabled                   # Active status
```

### DataSourceResolver API

```php
use HollisLabs\UiBuilder\Services\DataSourceResolver;

$resolver = app(DataSourceResolver::class);

// Query with filters, search, sort, pagination
$result = $resolver->query('UiPage', [
    'search' => 'dashboard',
    'filters' => ['enabled' => true],
    'sort' => ['field' => 'updated_at', 'direction' => 'desc'],
    'pagination' => ['per_page' => 15, 'page' => 1],
]);

// Get single record
$record = $resolver->show('UiPage', 1);

// Create new record
$created = $resolver->create('UiPage', ['key' => 'page.new', 'enabled' => true]);

// Update existing record
$updated = $resolver->update('UiPage', 1, ['enabled' => false]);

// Delete record
$deleted = $resolver->delete('UiPage', 1);

// Get capabilities
$capabilities = $resolver->getCapabilities('UiPage');

// Clear cache
$resolver->clearCache('UiPage');
```

### HTTP API Endpoints

```
GET    /api/ui/datasources/{alias}              # Query/list
GET    /api/ui/datasources/{alias}/{id}         # Show single
POST   /api/ui/datasources/{alias}              # Create
PUT    /api/ui/datasources/{alias}/{id}         # Update
DELETE /api/ui/datasources/{alias}/{id}         # Delete
GET    /api/ui/datasources/{alias}/capabilities # Get capabilities

GET    /api/ui/types/{alias}/query              # Query (uses DataSourceResolver)
GET    /api/ui/types/{alias}/{id}               # Show (uses DataSourceResolver)
```

## Models

All models use the `ui_*` table prefix:

- **Page** - UI page configurations (`ui_pages`)
- **Component** - Reusable component definitions (`ui_components`)
- **Datasource** - Model-to-API mappings (`ui_datasources`)
- **Action** - Action handlers (`ui_actions`)
- **Module** - Module grouping (`ui_modules`)
- **Theme** - Theme configurations (`ui_themes`)

## Key Concepts

### 1. Alias-Based Routing
Every data source has a unique alias (e.g., 'UiPage', 'Agent', 'Model'). Frontend code references data sources by alias, never by class name:

```javascript
// Fetch UI pages
fetch('/api/ui/datasources/UiPage')

// Get specific agent
fetch('/api/ui/types/Agent/123')
```

### 2. Field Definitions
Fields define structure, behavior, and validation:

```json
{
  "name": "key",
  "type": "string",
  "label": "Page Key",
  "required": true,
  "searchable": true,
  "sortable": true,
  "filterable": true,
  "validation": ["required", "unique:ui_pages,key"],
  "metadata": {"placeholder": "page.example.key"},
  "order": 1
}
```

### 3. Transform Schemas
Define how data is formatted for API responses:

```json
{
  "transform": {
    "id": "id",
    "key": "key",
    "created_at": {
      "source": "created_at",
      "format": "iso8601"
    }
  }
}
```

### 4. Capabilities System
Control what operations are available:

```json
{
  "searchable": ["key", "route", "module_key"],
  "filterable": ["enabled", "module_key"],
  "sortable": ["key", "version", "updated_at"]
}
```

## Migration History

### October 2025: System Consolidation & Cleanup

**Type System Consolidation:**
Previously, the package had two parallel systems:
- **FeType System** (3 tables: `fe_types`, `fe_type_fields`, `fe_type_relations`)
- **DataSource System** (1 table: `ui_datasources`)

These were **consolidated into a single DataSource system** by:
1. Extending `ui_datasources` with fields from FeType
2. Enhancing `DataSourceResolver` with show/update/delete methods
3. Migrating data from fe_types → ui_datasources
4. Removing FeType models, TypeRegistry, TypeResolver
5. Dropping fe_types tables

**Unused Feature Removal:**
Removed scaffolding that was never wired into application logic:
- Dropped `ui_registry` table (component catalog - never used)
- Dropped `ui_feature_flags` table (feature flags - never used)
- Removed Registry and FeatureFlag models
- Removed RegistryItem and FeatureFlagDTO (zero usage)

**Result:** Simpler architecture with one table, one resolver, no unused code.

## Usage Examples

### Registering a New Data Source

```php
use HollisLabs\UiBuilder\Models\Datasource;

Datasource::create([
    'alias' => 'Product',
    'model_class' => App\Models\Product::class,
    'handler' => App\Models\Product::class,
    'resolver_class' => HollisLabs\UiBuilder\Services\DataSourceResolver::class,
    'capabilities_json' => [
        'searchable' => ['name', 'sku', 'description'],
        'filterable' => ['category_id', 'status'],
        'sortable' => ['name', 'price', 'created_at'],
    ],
    'fields_json' => [
        [
            'name' => 'name',
            'type' => 'string',
            'label' => 'Product Name',
            'required' => true,
            'searchable' => true,
            'sortable' => true,
            'filterable' => false,
            'validation' => ['required', 'max:255'],
            'metadata' => [],
            'order' => 1,
        ],
        // ... more fields
    ],
    'config_json' => [
        'table' => 'products',
        'primary_key' => 'id',
        'source_type' => 'eloquent',
    ],
    'schema_json' => [
        'transform' => [
            'id' => 'id',
            'name' => 'name',
            'price' => 'price',
        ],
    ],
    'default_params_json' => [
        'with' => ['category'],
        'scopes' => [],
        'default_sort' => ['created_at', 'desc'],
    ],
    'metadata_json' => [
        'description' => 'Product catalog',
        'icon' => 'shopping-cart',
        'category' => 'ecommerce',
    ],
    'enabled' => true,
]);
```

### Querying from Frontend

```javascript
// React component example
const { data, meta } = await fetch('/api/ui/datasources/Product', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    search: 'laptop',
    filters: { category_id: 5 },
    sort: { field: 'price', direction: 'asc' },
    pagination: { per_page: 20, page: 1 }
  })
}).then(r => r.json());
```

## Installation

The package is automatically loaded via Laravel's package discovery. Configuration and migrations are included.

## License

Proprietary - Hollis Labs
