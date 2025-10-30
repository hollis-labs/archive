# CLI Testing Guide

## Run the Interactive Builder

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
- **Columns (JSON)**:
  ```json
  [
    {"key":"code","label":"Code","sortable":true},
    {"key":"title","label":"Title","sortable":true},
    {"key":"status","label":"Status","filterable":true}
  ]
  ```
- **Add row click action?**: `Yes`
- **Row click action**: `navigate`
- **Navigate to page key**: `sprint-detail`
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
