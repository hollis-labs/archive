# Changelog - Version 3.0.0

**Release Date:** October 29, 2025  
**Type:** Major Release (Breaking Changes)

## Overview
This release includes significant refactoring and cleanup of the UI Builder package based on a comprehensive audit. All changes are breaking and require database migrations.

---

## 🚨 Breaking Changes

### Database Schema Changes
1. **Removed unused columns:**
   - `fe_ui_components.config` (always empty)
   - `fe_ui_pages.route` (unused, key is used instead)
   - `fe_ui_pages.meta_json` (unused)
   - `fe_ui_datasources.model_class` (duplicate of handler)
   - `fe_ui_datasources.capabilities` (duplicate of capabilities_json)

2. **Removed `_json` suffixes from ALL columns:**
   - All tables now use clean column names (e.g., `config` instead of `config_json`)
   - Model casts remain the same for type safety
   - Affects: `fe_ui_components`, `fe_ui_pages`, `fe_ui_datasources`, `fe_ui_actions`, `fe_ui_modules`, `fe_ui_themes`

3. **Renamed columns:**
   - `fe_ui_datasources.handler` → `model_class` (for clarity)

### Code Changes

#### Deleted Files (Dead Code)
- `resources/js/contexts/FeatureFlagContext.tsx` (unused feature flags system)
- `resources/js/components/registerComponents.ts` (redundant with ComponentRegistry)
- `resources/js/components/modals/FormModal.tsx` (replaced by FormComponent)

#### Moved Files
- `src/UiBuilderServiceProvider.php` → `src/Providers/UiBuilderServiceProvider.php`
- Updated namespace: `HollisLabs\UiBuilder` → `HollisLabs\UiBuilder\Providers`

#### Updated Models
**All model `$fillable` and `$casts` arrays updated:**
- `Component.php` - Removed `config`, updated to use `schema`, `defaults`, `capabilities`
- `Page.php` - Removed `route`, `meta_json`, updated to use `config`, `layout`
- `Datasource.php` - Removed duplicates, updated to use clean column names
- `Action.php` - Updated to use `config`, `params`, `payload_schema`, `policy`

---

## ✨ New Features

### Configuration
- **Route Configuration:** Added `routes` config section in `config/ui-builder.php`
  - `prefix` - API route prefix (default: `ui`)
  - `page_prefix` - Page route prefix (default: `pages`)
  - Environment variables: `UI_BUILDER_ROUTE_PREFIX`, `UI_BUILDER_PAGE_PREFIX`

### Infrastructure
- **Seed JSON Structure:** Created `database/seeders/json/{components,pages,datasources,actions}/`
  - Supports version-controlled seed data
  - JSON-based seeding for factory defaults

### Commands
**All commands now registered in ServiceProvider:**
- `make:ui-page` - Create new UI pages (updated to use route config)
- `make:ui-datasource` - Create new data sources
- `ui:export-pages` - Export pages to JSON
- `ui:sync-pages` - Sync pages from JSON

---

## 🔧 Improvements

### React/TypeScript
1. **Removed FeatureFlags:**
   - Updated `ShellPage.tsx` - removed `FeatureFlagProvider` wrapper
   - Updated `app.tsx` - removed `registerComponents()` call
   - Simplified `PageData` interface

2. **Component Registry:**
   - Consolidated registration in `ComponentRegistry.ts`
   - Added missing components: `table`, `search.bar`, `detail`

3. **Action System Improvements:**
   - `DataTableComponent` now uses `useAction` hook (consistent with other components)
   - Removed inline `executeAction()` function
   - All actions go through centralized `ActionDispatcher`

4. **Button Icon Component:**
   - Removed `FormModal` dependency
   - Added placeholder for form modal implementation
   - Cleaner, more maintainable code

### PHP/Laravel
1. **DataSourceResolver Service:**
   - Updated to use new column names (no `_json` suffixes)
   - Updated to use `model_class` instead of `handler`
   - Cleaner, more readable code

2. **Service Provider:**
   - Moved to proper `Providers/` folder
   - All commands now registered
   - Follows Laravel conventions

3. **Make Commands:**
   - `MakeUiPageCommand` now uses route config from `config/ui-builder.php`
   - No more hardcoded `/v2/pages/` routes

---

## 📦 Migrations

Three new migrations included (run in order):

1. **`2025_10_29_000001_remove_unused_ui_columns.php`**
   - Removes unused columns from all tables
   - Reversible (adds columns back in `down()`)

2. **`2025_10_29_000002_remove_json_suffixes.php`**
   - Renames all `*_json` columns to remove suffix
   - Affects 6+ tables
   - Fully reversible

3. **`2025_10_29_000003_rename_handler_to_model_class.php`**
   - Renames `handler` → `model_class` in `fe_ui_datasources`
   - Reversible

---

## 🚀 Upgrade Guide

### Step 1: Backup
```bash
# Backup your database
php artisan db:backup

# Or manually export critical tables
php artisan tinker --execute="echo json_encode(DB::table('fe_ui_pages')->get(), JSON_PRETTY_PRINT);" > backup-pages.json
```

### Step 2: Update Package
```bash
composer update hollis-labs/ui-builder
```

### Step 3: Clear Caches
```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
rm bootstrap/providers.php
php artisan package:discover
```

### Step 4: Run Migrations
```bash
php artisan migrate
```

**⚠️ Warning:** Migrations are destructive! Make sure you have backups.

### Step 5: Verify
```bash
# Check pages load
php artisan route:list | grep ui/pages

# Test a page
curl http://your-app.test/ui/pages/your-page-key

# Check commands
php artisan list | grep "ui:"
```

### Step 6: Update Custom Code
If you have custom code referencing old column names:
- Search for `_json` in your codebase
- Update to use new column names
- Update model references if needed

---

## 🐛 Bug Fixes
- Fixed `ActionDispatcher` type issues
- Removed duplicate component registrations
- Fixed service provider namespace issues
- Corrected model fillable/casts mismatches

---

## 📝 Notes

### Seed Data
- JSON seed files are placeholders (`.gitkeep` files)
- Export your production data and commit to `database/seeders/json/`
- Use for fresh installs and testing

### Testing
- Test all existing pages after migration
- Verify data table actions still work
- Check form submissions
- Test custom components if any

### Rollback
If issues arise, run:
```bash
php artisan migrate:rollback --step=3
```

---

## 👥 Contributors
- System Architect: Claude (Anthropic)
- Project Lead: Chrispian Hollis

---

## 📚 Documentation
- [Audit Report](/docs/UI-BUILDER-AUDIT-CHANGES.md)
- [Migration Guide](/docs/MIGRATION-v3.md)
- [Component Architecture](/docs/component-architecture.md)

---

## 🔮 Future Plans
- [ ] Complete UI Action system documentation
- [ ] Add `make:ui-action` command
- [ ] Add `make:ui-module` command
- [ ] Add `make:ui-component` command
- [ ] Add `make:ui-theme` command
- [ ] Improve DataManagementModal (refactor to use DataTableComponent)
- [ ] Add FormComponent modal container support
