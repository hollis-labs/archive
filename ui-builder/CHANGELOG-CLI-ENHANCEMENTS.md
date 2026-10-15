# CLI Enhancements Changelog

**Release Date:** October 29, 2025  
**Type:** Feature Enhancement (Non-Breaking)

## Overview
Major improvements to the CLI builder commands (`ui:build-datasource` and `ui:build-page`) with interactive field selection using checkboxes, replacing manual JSON entry with a more user-friendly experience.

---

## ✨ New Features

### Interactive Field Selection with Checkboxes

Both CLI builders now support intelligent field selection with checkboxes instead of requiring manual JSON entry.

#### BuildDatasourceCommand Enhancements

**Three Configuration Modes:**
1. **Interactive Mode** (new default) - Checkbox-based field selection
2. **Auto Mode** - Auto-generate all fields (previous default)
3. **Manual Mode** - Manual JSON entry (previous behavior)

**Interactive Mode Features:**
- Loads all columns from model's database table using `Schema::getColumns()`
- Displays multiselect checkboxes with **all fields pre-selected by default**
- Shows field name and type: e.g., `name (varchar)`, `created_at (timestamp)`
- Users uncheck unwanted fields (faster than selecting)
- Optional field property customization:
  - Label (with smart default: `ucwords(str_replace('_', ' ', $name))`)
  - Searchable (auto-detected for string/text types)
  - Sortable (auto-detected, excludes text/json types)
  - Filterable (auto-detected for string/integer/boolean/datetime types)
- Generates both `schema` (transform mappings) and `fields` (field definitions)
- Datetime fields automatically get ISO8601 format in schema transform

**New Method:**
```php
protected function interactiveFieldSelection(?string $modelClass): array
```
- Returns: `['schema' => [...], 'fields' => [...]]`
- Handles model introspection and field configuration
- Graceful error handling with fallback to manual entry

#### BuildPageCommand Enhancements

**DataTable Column Configuration:**
- Replaced textarea JSON input with `configureDataTableColumns()` helper
- Two modes: `interactive` (default) or `manual`
- Interactive mode pulls fields from:
  1. Datasource `fields` configuration (preferred)
  2. Model introspection via `Schema::getColumns()` (fallback)
- Smart field exclusion: password, remember_token, deleted_at
- Optional column property customization:
  - Label
  - Sortable (boolean)
  - Width (e.g., "200px", "20%")
  - Text alignment (left, center, right)
- Graceful fallback to manual JSON entry if datasource not found

**Detail Fields Configuration:**
- Four-mode selection for detail modal fields:
  1. **Auto** - Use table columns as-is (fastest)
  2. **Select** - Interactive checkbox selection from datasource fields
  3. **Manual** - Manual JSON entry
  4. **Skip** - No detail fields
- New `selectDetailFields()` helper with smart defaults
- Auto-selects fields matching table columns when in select mode

**New Methods:**
```php
protected function configureDataTableColumns(string $dataSourceAlias): array
protected function selectDetailFields(string $dataSourceAlias, array $tableColumns): array
protected function manualColumnEntry(): array
```

---

## 🎯 Smart Defaults

The interactive mode includes intelligent defaults based on field types:

| Field Type | Searchable | Sortable | Filterable |
|------------|-----------|----------|------------|
| string, text | ✅ | ✅ (not text) | ✅ |
| integer | ❌ | ✅ | ✅ |
| boolean | ❌ | ✅ | ✅ |
| datetime, timestamp | ❌ | ✅ | ✅ |
| json | ❌ | ❌ | ❌ |

**Security-Conscious Exclusions:**
- `password` - Auto-excluded from display
- `remember_token` - Auto-excluded from display
- `deleted_at` - Auto-excluded if using soft deletes

**Format Detection:**
- Datetime/timestamp fields automatically get `iso8601` format in schema transform
- Proper type mapping for all database column types

---

## 📖 Usage Examples

### BuildDatasourceCommand - Interactive Mode

```bash
$ php artisan ui:build-datasource

🗄️  Datasource Builder

📋 Step 1: Basic Information
Datasource Alias: Agent

🏗️  Step 2: Model Configuration
Select Model: Agent

⚡ Step 3: Capabilities
[Select: list, detail, search, sort, paginate]

📐 Step 5: Schema Configuration
How would you like to configure schema and fields?
> Interactive (select fields with checkboxes)
  Auto-generate all fields
  Manual JSON entry

Found 9 columns in table: agents

Select fields to include:
☑ id (uuid)
☑ name (varchar)
☑ designation (varchar)
☑ avatar_path (varchar)
☑ agent_profile_id (uuid)
☑ status (varchar)
☑ created_at (timestamp)
☑ updated_at (timestamp)
☐ deleted_at (timestamp)

Customize field properties? [no]

✓ Configured schema with 8 fields
```

### BuildPageCommand - Interactive Column Selection

```bash
$ php artisan ui:build-page

[... Basic setup ...]

Add component: data-table
Component ID: table-agents
Data Source: Agent

How would you like to configure columns?
> Interactive (select fields with checkboxes)
  Manual JSON entry

Found 8 available fields

Select columns to display:
☑ name (string)
☑ designation (string)
☑ status (string)
☑ created_at (datetime)
☐ updated_at (datetime)
☐ agent_profile_id (uuid)

Customize column properties? [no]

✓ Using smart defaults for column properties

Add row click action? [yes]
Row click action: modal

Detail fields configuration:
> Use table columns
  Select from available fields
  Manual JSON entry
  Skip (no detail fields)

✓ Auto-generated 4 detail fields from table columns
```

---

## 🔄 Backward Compatibility

✅ **Fully backward compatible** - All previous workflows still supported:
- Manual JSON entry available in all prompts
- Auto-generation mode preserved
- No breaking changes to existing commands or APIs
- Interactive mode is opt-in via selection prompt

---

## 🛠️ Technical Details

### Dependencies
- Requires Laravel Prompts v0.3.7+ (already installed)
- Uses `multiselect()` function for checkbox UI
- Uses `Schema::getColumns()` for database introspection

### Field Type Mapping
```php
protected function mapColumnType(string $dbType): string
{
    return match(true) {
        str_contains($dbType, 'int') => 'integer',
        str_contains($dbType, 'bool') => 'boolean',
        str_contains($dbType, 'timestamp') || str_contains($dbType, 'date') => 'datetime',
        str_contains($dbType, 'text') => 'text',
        str_contains($dbType, 'json') => 'json',
        str_contains($dbType, 'float') || str_contains($dbType, 'decimal') => 'decimal',
        default => 'string',
    };
}
```

### Error Handling
- Graceful fallback to manual entry if model not found
- Graceful fallback if datasource not found or has no fields
- Try-catch blocks around all model introspection
- Clear error messages with context

---

## 📚 Documentation Updates

Updated files:
- `QUICKSTART.md` - Added "Interactive Field Selection" section with examples
- `CLI-TEST.md` - Updated with interactive mode testing flows
- `CHANGELOG-CLI-ENHANCEMENTS.md` - This file (comprehensive changelog)

---

## 🎉 Benefits

1. **Faster Workflow** - No need to type JSON by hand
2. **Fewer Errors** - Checkbox selection eliminates JSON syntax errors
3. **Better Defaults** - Smart type detection and sensible defaults
4. **Discoverable** - See all available fields instead of guessing
5. **Flexible** - Quick defaults or deep customization, your choice
6. **Visual** - Clear display of field types helps decision-making
7. **Safe** - Auto-excludes sensitive fields like passwords

---

## 🔮 Future Enhancements

Potential future improvements:
- Batch field property editing (set multiple fields at once)
- Field templates (e.g., "timestamp fields", "user fields")
- Visual preview of generated schema
- Import/export field selection presets
- Integration with FormBuilder for comprehensive CRUD scaffolding

---

## 🐛 Bug Fixes (October 29, 2025)

### Fixed Data Structure Inconsistencies

**Issue:** `ui_datasources` table had two different formats for the same columns depending on whether datasources were created via CLI or manually/seeded.

**Affected Columns:**
1. **capabilities** - CLI used `{"supports": [...]}` format instead of proper field-level format
2. **default_params** - Missing `scopes` array for consistency
3. **resolver_class** - Not being set, causing datasources to use wrong resolver

**Fixes Applied:**

1. **Capabilities Structure Fix**
   - Changed from generic `{"supports": ["list", "detail", ...]}` format
   - To field-level format: `{"searchable": [...], "filterable": [...], "sortable": [...]}`
   - Now built automatically from field definitions during interactive selection
   - Includes boolean flags for CRUD operations (create, update, delete)
   - New method: `buildCapabilitiesFromFields()`

2. **Default Params Enhancement**
   - Added `with: []` and `scopes: []` arrays by default for consistency
   - Changed `sort_by`/`sort_order` to `default_sort: [field, direction]` format
   - Better alignment with manual/seeded datasource format

3. **Interactive Filter Builder**
   - Replaced JSON textarea with checkbox-based field selection
   - Shows only filterable fields (string, integer, boolean, datetime)
   - Type-aware value input (boolean gets True/False/NULL select, others get text input)
   - Proper type casting (integers auto-cast, NULL support)
   - New method: `configureDefaultFilters()`

4. **Auto-set Resolver Class**
   - Automatically sets `resolver_class` to `HollisLabs\UiBuilder\Services\DataSourceResolver`
   - Only skips if custom handler is provided
   - Ensures consistent resolver usage across all datasources

**Before:**
```json
{
  "capabilities": {
    "supports": ["list", "detail", "search"]
  },
  "default_params": {
    "per_page": 15,
    "sort_by": "created_at",
    "sort_order": "desc"
  }
}
```

**After:**
```json
{
  "capabilities": {
    "searchable": ["name", "email"],
    "filterable": ["status"],
    "sortable": ["name", "created_at"],
    "create": true,
    "update": true
  },
  "default_params": {
    "with": [],
    "scopes": [],
    "per_page": 15,
    "default_sort": ["created_at", "desc"],
    "filters": {"status": "active"}
  },
  "resolver_class": "HollisLabs\\UiBuilder\\Services\\DataSourceResolver"
}
```

**Impact:**
- ✅ Consistent data structure across all datasources
- ✅ Proper field-level capability detection
- ✅ Better frontend integration (UI knows which fields are searchable/sortable)
- ✅ DataSourceResolver compatibility guaranteed
- ✅ No more JSON syntax errors in filter configuration

---

## 🔧 Additional Improvements (October 29, 2025)

### Simplified Handler Configuration

1. **Removed manual `handler` input** from CLI builder
   - No longer prompts user for handler class
   - Automatically sets to `HollisLabs\UiBuilder\Services\DataSourceResolver`
   - Simplifies configuration (one less step)
   - Users don't need to know resolver class names

2. **Removed `resolver_class` reference**
   - Column doesn't exist in `ui_datasources` table
   - Was causing SQL errors
   - Handler field is sufficient for resolver configuration

### Interactive Relations Builder

**Problem:** Relations still required manual JSON entry.

**Solution:**
- Created `configureRelations()` method with relationship detection
- Uses PHP Reflection to scan model for public methods with relationship return types
- Detects all Eloquent relationship types: HasOne, HasMany, BelongsTo, BelongsToMany, Morph*
- Shows checkbox list of detected relations
- Optional customization of relation details
- Fallback to manual JSON entry if no relations detected

**Requirements:**
- Relationship methods MUST have return type hints (e.g., `: BelongsTo`)
- Example:
  ```php
  public function user(): BelongsTo
  {
      return $this->belongsTo(User::class);
  }
  ```

**Example Flow:**
```
Configure model relations? [yes]

Found 3 potential relations

Select relations to include in datasource:
☑ user (BelongsTo)
☑ tasks (HasMany)
☐ comments (HasMany)

Customize relation details? [no]

✓ Added 2 relations with defaults
```

**Benefits:**
- ✅ No more JSON syntax errors
- ✅ Auto-discovery of relations
- ✅ Type-safe (requires return type hints)
- ✅ Fast selection with smart defaults
- ✅ Encourages proper type hinting in models

---

**Happy Building!** 🎨
