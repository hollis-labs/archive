# CLI Testing Guide

## Interactive Builders

The package includes two interactive CLI builders:

```bash
# Build a datasource (recommended first step)
php artisan ui:build-datasource

# Build a page (uses datasources)
php artisan ui:build-page
```

---

## Testing the Datasource Builder

```bash
php artisan ui:build-datasource
```

### Step 1: Basic Information
- **Datasource Alias**: `TestAgent` (PascalCase recommended)
- **Overwrite existing?**: Choose based on your needs

### Step 2: Model Configuration
- **Select Model**: Choose from list (e.g., `Agent`) or select "Enter manually"

### Step 3: Basic Operations
Select CRUD operations (read operations are always enabled):
- ☐ Create (insert new records)
- ☑ Update (modify records)
- ☐ Delete (remove records)

**Note:** List, detail, search, filter, sort, and paginate are auto-configured from field definitions in the next step.

### Step 4: Default Parameters
- **Configure default query parameters?**: `Yes` (recommended)
- **Default page size**: `15`
- **Default sort field**: `created_at`
- **Sort order**: `desc`
- **Add default filters?**: `Yes` (optional - see interactive filter builder below)

**Interactive Filter Builder** (if you choose Yes for filters):
```
Select fields to add default filters for:
☑ status (string)
☑ enabled (boolean)
☐ created_at (datetime)

Filter for: status (string)
  Default value: active

Filter for: enabled (boolean)
  Default value: True

✓ Added 2 default filters
```

- **Specify relations to eager load?**: `Yes` (optional)
- **Load relations**: `user,profile` (comma-separated)

### Step 5: Schema Configuration
- **How would you like to configure schema and fields?**: `interactive` (recommended)

**Interactive Mode Flow:**
```
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
☐ deleted_at (timestamp)  # Auto-excluded if soft deletes

Customize field properties (searchable, sortable, etc.)? [no]
```

If you choose **No** to customize: Smart defaults are applied
- String/text fields → searchable
- Non-text/json → sortable
- String/integer/boolean/datetime → filterable

If you choose **Yes** to customize: You'll be asked for each field:
- Label (default: "Name")
- Searchable? (smart default based on type)
- Sortable? (smart default based on type)
- Filterable? (smart default based on type)

### Step 6: Additional Configuration

**Configure model relations?**: `Yes` (optional)

**Interactive Relations Builder** (if you choose Yes):
```
Found 2 potential relations

Select relations to include in datasource:
☑ agentProfile (BelongsTo)
☑ decisions (HasMany)
☐ notes (HasMany)

Customize relation details? [no]

✓ Added 2 relations with defaults
```

**How it works:**
- Scans model for public methods with relationship return types
- Detects: HasOne, HasMany, BelongsTo, BelongsToMany, Morph* relations
- Requires return type hints on relation methods (e.g., `: BelongsTo`)
- Fallback to manual JSON entry if no relations detected

**Other Configuration:**
- **Add custom configuration?**: Optional (advanced)
- **Add metadata for documentation?**: Optional (recommended for team docs)
- **Enable datasource?**: `Yes`

### Step 7: Review & Save
- Review the generated JSON
- **Save this datasource?**: `Yes`

**Expected Output:**
```
✓ Datasource saved successfully!
  Alias: TestAgent
  Model: App\Models\Agent
  Handler: HollisLabs\UiBuilder\Services\DataSourceResolver
  Capabilities: 15 rules
  Fields: 8
  Relations: 2
```

**What's Saved:**
- `handler` auto-set to `HollisLabs\UiBuilder\Services\DataSourceResolver`
- Field-level capabilities (searchable, filterable, sortable arrays)
- CRUD operation flags (create, update, delete booleans)
- Proper `default_params` structure with `with`, `scopes`, `default_sort`
- Interactive default filters (no more JSON!)
- Auto-detected relations with type information

---

## Testing the Page Builder

```bash
php artisan ui:build-page
```

## Expected Flow

### Step 1: Page Information
- **Page Name**: `Test Sprint Manager`
- **Display Type**: `modal`
- **Route**: (leave empty or `/test-sprints`)
- **Module Key**: (leave empty or `core.test`)

### Step 2: Layout
- **Layout Type**: `rows`

### Step 3: Add Components

#### First Component - Search Bar
- **Add component**: `search.bar`
- **Component ID**: `search-sprints`
- **Placeholder text**: `Search sprints...`
- **Target table ID**: `table-sprints`
- **Add another component?**: `Yes`

#### Second Component - Data Table
- **Add component**: `data-table`
- **Component ID**: `table-sprints`
- **Data Source**: Choose from available (or type `Sprint` if it exists)
- **How would you like to configure columns?**: `interactive` (or `manual` for old behavior)

**If Interactive Mode:**
- You'll see a checkbox list of all available fields from the datasource
- Most fields will be pre-selected (except sensitive ones like passwords)
- Uncheck any fields you don't want in the table
- **Customize column properties?**: Choose `no` for quick setup with smart defaults
- Example:
  ```
  Select columns to display:
  ☑ code
  ☑ title
  ☑ status
  ☑ created_at
  ☐ updated_at
  ```

**If Manual Mode:**
- **Columns (JSON)**:
  ```json
  [
    {"key":"code","label":"Code","sortable":true},
    {"key":"title","label":"Title","sortable":true},
    {"key":"status","label":"Status","filterable":true}
  ]
  ```

- **Add row click action?**: `Yes`
- **Row click action**: `modal`
- **Detail fields configuration**: `auto` (uses table columns) or `select` (interactive checkboxes)
- **Add another component?**: `No`

### Step 4: Review & Save
- Review the generated JSON
- **Save this page?**: `Yes`

## Expected Output

```
✓ Page saved successfully!
  Key: test-sprint-manager
  Version: 1
  Hash: [some hash]
```

## Verify in Database

```bash
php artisan tinker --execute="
\$page = \HollisLabs\UiBuilder\Models\Page::where('key', 'test-sprint-manager')->first();
echo json_encode(\$page->config, JSON_PRETTY_PRINT);
"
```

## Clean Up Test Page

```bash
php artisan tinker --execute="
\HollisLabs\UiBuilder\Models\Page::where('key', 'test-sprint-manager')->delete();
echo 'Test page deleted';
"
```

## Alternative: Minimal Test

If you want a quick smoke test:

```bash
php artisan ui:build-page
```

Then just:
- Page Name: `Quick Test`
- Display Type: `modal`
- Layout: `rows`
- Add component: `done` (skip components)
- Save: `Yes`

This will create an empty but valid page config.

## Troubleshooting

### No Data Sources Available
If you see "No data sources available", that's expected if your `ui_datasources` table is empty. Just type a datasource name manually like `Sprint` or `User`.

### Component Type Not Found
If a component type isn't recognized, choose `done` to finish adding components and save what you have.

### Already Exists Error
If a page with that key already exists, choose a different name or delete the existing page first.

---

**Have fun testing!** 🎨
