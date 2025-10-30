# Upgrading to UI Builder v3.0.0

**🚨 THIS IS A MAJOR BREAKING RELEASE 🚨**

Version 3.0.0 includes database schema changes that are **irreversible** without backups. Please follow this guide carefully.

---

## What Changed?

### 📊 Database Changes
- **5 columns removed** (unused/duplicate data)
- **ALL `_json` suffixes removed** from column names (affects 20+ columns)
- **1 column renamed** (`handler` → `model_class`)

### 🗑️ Code Cleanup
- **3 files deleted** (dead code)
- **Service provider moved** to proper location
- **4 models updated** with new column names
- **All services updated** to use new schema

### ✨ New Features
- Route configuration in `config/ui-builder.php`
- JSON-based seed structure
- All commands properly registered

---

## Pre-Upgrade Checklist

- [ ] **Backup database** (critical!)
- [ ] Review CHANGELOG-v3.0.0.md
- [ ] Test in development environment first
- [ ] Note any custom code referencing `*_json` columns
- [ ] Verify you have Laravel 11+ (required)

---

## Upgrade Steps

### 1. Backup Your Database

**Option A: Full backup**
```bash
php artisan db:backup
# or
mysqldump -u user -p database > backup-$(date +%Y%m%d).sql
```

**Option B: Export critical tables**
```bash
php artisan tinker --execute="file_put_contents('backup-pages.json', json_encode(DB::table('ui_pages')->get(), JSON_PRETTY_PRINT));"
php artisan tinker --execute="file_put_contents('backup-components.json', json_encode(DB::table('ui_components')->get(), JSON_PRETTY_PRINT));"
php artisan tinker --execute="file_put_contents('backup-datasources.json', json_encode(DB::table('ui_datasources')->get(), JSON_PRETTY_PRINT));"
```

### 2. Update the Package

If installed via Composer:
```bash
composer update hollis-labs/ui-builder
```

If using local vendor folder:
```bash
# Your process - sync from git repo
```

### 3. Clear All Caches

```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
rm -f bootstrap/providers.php
rm -rf bootstrap/cache/*.php
composer dump-autoload
```

### 4. Update bootstrap/providers.php

**Before:**
```php
HollisLabs\UiBuilder\UiBuilderServiceProvider::class,
```

**After:**
```php
HollisLabs\UiBuilder\Providers\UiBuilderServiceProvider::class,
```

Or just delete `bootstrap/providers.php` and let Laravel regenerate it:
```bash
rm bootstrap/providers.php
php artisan package:discover
```

### 5. Run Migrations

**⚠️ CRITICAL: These migrations are destructive!**

```bash
# Review migrations first
ls vendor/hollis-labs/ui-builder/database/migrations/2025_10_29_*

# Run migrations
php artisan migrate

# You should see:
# - 2025_10_29_000001_remove_unused_ui_columns
# - 2025_10_29_000002_remove_json_suffixes  
# - 2025_10_29_000003_rename_handler_to_model_class
```

### 6. Verify Installation

```bash
# Check service provider loaded
php artisan about | grep -A 5 "Service Providers"

# Check commands available
php artisan list | grep "ui:"

# Should show:
# - make:ui-page
# - make:ui-datasource  
# - ui:export-pages
# - ui:sync-pages

# Test a page endpoint
curl http://localhost/ui/pages/your-page-key
```

### 7. Update Custom Code

If you have custom code referencing old columns, update it:

**Find references:**
```bash
grep -r "_json" app/ resources/
grep -r "handler" app/ | grep -i datasource
```

**Update patterns:**
```php
// BEFORE
$page->config_json
$datasource->handler
$component->schema_json

// AFTER
$page->config
$datasource->model_class
$component->schema
```

### 8. Test Everything

**Critical paths to test:**
- [ ] Load all existing pages
- [ ] Data table rendering
- [ ] Row click actions
- [ ] Button click actions
- [ ] Form submissions
- [ ] Data source queries
- [ ] Custom components (if any)

---

## Rollback Plan

If something goes wrong:

### Option 1: Rollback Migrations
```bash
php artisan migrate:rollback --step=3
```

This reverses the 3 new migrations and restores old schema.

### Option 2: Restore from Backup
```bash
# Restore full backup
mysql -u user -p database < backup-YYYYMMDD.sql

# Or restore specific tables
mysql -u user -p database < backup-pages.sql
```

### Option 3: Downgrade Package
```bash
composer require hollis-labs/ui-builder:^2.0
php artisan migrate:rollback --step=3
php artisan config:clear
```

---

## Common Issues

### Issue: Class "UiBuilderServiceProvider" not found

**Solution:**
```bash
rm bootstrap/providers.php
php artisan package:discover
composer dump-autoload
```

### Issue: Column not found: config_json

**Cause:** Old code referencing old column names.

**Solution:** Update your code to use new column names (remove `_json` suffix).

### Issue: Pages not loading

**Check:**
1. Migrations ran successfully: `php artisan migrate:status`
2. Config cached: `php artisan config:clear`
3. Routes registered: `php artisan route:list | grep ui/pages`

### Issue: Undefined property: handler

**Cause:** Code still referencing old `handler` column.

**Solution:** Update to use `model_class`:
```php
// BEFORE
$model = $datasource->handler;

// AFTER
$model = $datasource->model_class;
```

---

## Post-Upgrade Tasks

### Optional: Export Seed Data

Export your production data for version control:

```bash
php artisan tinker --execute="file_put_contents('vendor/hollis-labs/ui-builder/database/seeders/json/pages/pages.json', json_encode(DB::table('ui_pages')->get(), JSON_PRETTY_PRINT));"

php artisan tinker --execute="file_put_contents('vendor/hollis-labs/ui-builder/database/seeders/json/components/components.json', json_encode(DB::table('ui_components')->get(), JSON_PRETTY_PRINT));"

php artisan tinker --execute="file_put_contents('vendor/hollis-labs/ui-builder/database/seeders/json/datasources/datasources.json', json_encode(DB::table('ui_datasources')->get(), JSON_PRETTY_PRINT));"
```

### Optional: Update Routes Config

Add to your `.env`:
```env
UI_BUILDER_ROUTE_PREFIX=ui
UI_BUILDER_PAGE_PREFIX=pages
```

---

## Getting Help

**Issues?**
1. Check CHANGELOG-v3.0.0.md for details
2. Review database/migrations for schema changes
3. Check logs: `tail -f storage/logs/laravel.log`
4. Open issue on GitHub with error details

**Success?**
✅ All pages load  
✅ Actions work  
✅ Data sources query  
✅ Forms submit  

You're good to go! 🎉

---

## Summary

**What you did:**
- ✅ Backed up database
- ✅ Updated package
- ✅ Cleared caches
- ✅ Ran 3 migrations
- ✅ Verified installation
- ✅ Tested all features

**What changed:**
- 🗑️ Removed 5 unused columns
- 🔄 Renamed 20+ columns (removed `_json`)
- 📁 Moved service provider
- 🧹 Deleted dead code
- ✨ Added route configuration

**Time to complete:** ~15-30 minutes (including verification)
