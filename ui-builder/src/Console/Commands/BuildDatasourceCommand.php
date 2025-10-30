<?php

namespace HollisLabs\UiBuilder\Console\Commands;

use HollisLabs\UiBuilder\Models\Datasource;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

use function Laravel\Prompts\text;
use function Laravel\Prompts\select;
use function Laravel\Prompts\multiselect;
use function Laravel\Prompts\confirm;
use function Laravel\Prompts\textarea;
use function Laravel\Prompts\info;
use function Laravel\Prompts\warning;
use function Laravel\Prompts\error;
use function Laravel\Prompts\table;

/**
 * BuildDatasourceCommand
 * 
 * Interactive CLI tool for building datasources using Laravel Prompts.
 * Creates datasource configurations for connecting UI components to data.
 * 
 * Usage:
 *   php artisan ui:build-datasource
 */
class BuildDatasourceCommand extends Command
{
    protected $signature = 'ui:build-datasource';
    protected $description = 'Interactively build a datasource configuration';

    protected array $availableModels = [];
    protected array $modelSchemas = [];

    public function handle(): int
    {
        $this->info('🗄️  Datasource Builder');
        $this->newLine();

        // Load available models
        $this->loadAvailableModels();

        // Step 1: Basic Information
        $this->info('📋 Step 1: Basic Information');
        
        $alias = text(
            label: 'Datasource Alias',
            placeholder: 'Sprint',
            required: true,
            hint: 'Unique identifier (PascalCase recommended)'
        );

        // Check if datasource already exists
        if (Datasource::where('alias', $alias)->exists()) {
            error("Datasource with alias '{$alias}' already exists!");
            
            if (!confirm('Overwrite existing datasource?', false)) {
                return 1;
            }
        }

        $this->newLine();

        // Step 2: Model Selection
        $this->info('🏗️  Step 2: Model Configuration');
        
        $modelClass = $this->selectModel();

        $handler = text(
            label: 'Handler Class (optional)',
            placeholder: 'App\\Services\\SprintDataSourceResolver',
            hint: 'Custom resolver class for complex queries'
        );

        $this->newLine();

        // Step 3: Capabilities
        $this->info('⚡ Step 3: Capabilities');
        
        $capabilities = multiselect(
            label: 'What operations should this datasource support?',
            options: [
                'list' => 'List (fetch multiple records)',
                'detail' => 'Detail (fetch single record)',
                'search' => 'Search (text search)',
                'filter' => 'Filter (complex filtering)',
                'sort' => 'Sort (column sorting)',
                'paginate' => 'Paginate (cursor/offset pagination)',
                'aggregate' => 'Aggregate (counts, sums, etc.)',
                'create' => 'Create (insert new records)',
                'update' => 'Update (modify records)',
                'delete' => 'Delete (remove records)',
            ],
            default: ['list', 'detail', 'paginate']
        );

        $this->newLine();

        // Step 4: Default Parameters
        $this->info('⚙️  Step 4: Default Parameters');
        
        if (confirm('Configure default query parameters?', true)) {
            $defaultParams = $this->configureDefaultParams($capabilities);
        } else {
            $defaultParams = null;
        }

        $this->newLine();

        // Step 5: Schema Configuration
        $this->info('📐 Step 5: Schema Configuration');
        
        $schema = null;
        $fields = null;
        
        if (confirm('Auto-generate schema and fields from model?', true)) {
            $schema = $this->generateSchemaFromModel($modelClass);
            $fields = $this->generateFieldsFromModel($modelClass);
            
            if ($schema && $fields) {
                info("✓ Auto-generated schema with " . count($fields) . " fields");
            }
        } else {
            $schemaJson = textarea(
                label: 'Schema (JSON)',
                placeholder: '{"transform": {"id": "id", "name": "name"}}',
                hint: 'Define field transform mappings'
            );
            
            $schema = $schemaJson ? json_decode($schemaJson, true) : null;
            
            $fieldsJson = textarea(
                label: 'Fields (JSON array)',
                placeholder: '[{"name":"id","type":"integer","label":"ID","searchable":false,"sortable":true}]',
                hint: 'Define field definitions'
            );
            
            $fields = $fieldsJson ? json_decode($fieldsJson, true) : null;
        }

        $this->newLine();

        // Step 6: Additional Configuration
        $this->info('🔧 Step 6: Additional Configuration');
        
        $relations = null;
        $config = null;
        $metadata = null;

        if (confirm('Configure relations to eager load?', false)) {
            $relationsJson = textarea(
                label: 'Relations (JSON)',
                placeholder: '{"user": "belongsTo", "tasks": "hasMany"}',
                hint: 'Define model relationships'
            );
            $relations = $relationsJson ? json_decode($relationsJson, true) : null;
        }

        if (confirm('Add custom configuration?', false)) {
            $configJson = textarea(
                label: 'Configuration (JSON)',
                placeholder: '{"cache_ttl": 3600, "soft_deletes": true}',
                hint: 'Additional configuration options'
            );
            $config = $configJson ? json_decode($configJson, true) : null;
        }

        if (confirm('Add metadata for documentation?', false)) {
            $metadataJson = textarea(
                label: 'Metadata (JSON)',
                placeholder: '{"description": "Sprint management datasource", "version": "1.0"}',
                hint: 'Documentation and versioning info'
            );
            $metadata = $metadataJson ? json_decode($metadataJson, true) : null;
        }

        $enabled = confirm('Enable datasource?', true);

        $this->newLine();

        // Step 7: Review & Save
        $this->info('👀 Step 7: Review & Save');
        
        $data = [
            'alias' => $alias,
            'model_class' => $modelClass,
            'handler' => $handler,
            'capabilities' => $capabilities ? ['supports' => $capabilities] : null,
            'default_params' => $defaultParams,
            'schema' => $schema,
            'fields' => $fields,
            'relations' => $relations,
            'config' => $config,
            'metadata' => $metadata,
            'enabled' => $enabled,
        ];

        // Remove null values for cleaner display
        $displayData = array_filter($data, fn($v) => $v !== null && $v !== '' && $v !== []);

        $this->line('Generated Configuration:');
        $this->line(json_encode($displayData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->newLine();

        $this->table(
            ['Property', 'Value'],
            [
                ['Alias', $alias],
                ['Model', $modelClass ?? '(none)'],
                ['Handler', $handler ?? '(default)'],
                ['Capabilities', count($capabilities) . ' operations'],
                ['Enabled', $enabled ? 'Yes' : 'No'],
            ]
        );

        $this->newLine();

        if (!confirm('Save this datasource?', true)) {
            warning('Datasource not saved.');
            return 0;
        }

        try {
            $datasource = Datasource::updateOrCreate(
                ['alias' => $alias],
                array_filter($data, fn($v) => $v !== null)
            );
            
            $this->info("✓ Datasource saved successfully!");
            $this->line("  Alias: {$datasource->alias}");
            $this->line("  Model: " . ($datasource->model_class ?? '(none)'));
            $this->line("  Capabilities: " . count($capabilities) . " operations");
            
            return 0;
        } catch (\Exception $e) {
            error("Failed to save datasource: {$e->getMessage()}");
            return 1;
        }
    }

    protected function selectModel(): ?string
    {
        if (empty($this->availableModels)) {
            warning('No models found in app/Models directory.');
            
            $manual = text(
                label: 'Model Class (manual entry)',
                placeholder: 'App\\Models\\Sprint',
                hint: 'Full class name with namespace'
            );
            
            return $manual ?: null;
        }

        $modelChoice = select(
            label: 'Select Model',
            options: array_merge(
                $this->availableModels,
                ['manual' => '✏️  Enter manually', 'none' => '⊘ No model (custom handler only)']
            ),
            hint: 'Choose the Eloquent model to use'
        );

        if ($modelChoice === 'manual') {
            return text(
                label: 'Model Class',
                placeholder: 'App\\Models\\Sprint',
                required: true
            );
        }

        if ($modelChoice === 'none') {
            return null;
        }

        return $modelChoice;
    }

    protected function configureDefaultParams(array $capabilities): ?array
    {
        $params = [];

        if (in_array('paginate', $capabilities)) {
            $perPage = text(
                label: 'Default page size',
                default: '15',
                hint: 'Number of records per page'
            );
            
            if ($perPage) {
                $params['per_page'] = (int) $perPage;
            }
        }

        if (in_array('sort', $capabilities)) {
            $sortField = text(
                label: 'Default sort field',
                placeholder: 'created_at',
                hint: 'Field to sort by default'
            );
            
            if ($sortField) {
                $params['sort_by'] = $sortField;
                
                $sortOrder = select(
                    label: 'Sort order',
                    options: ['asc' => 'Ascending', 'desc' => 'Descending'],
                    default: 'desc'
                );
                
                $params['sort_order'] = $sortOrder;
            }
        }

        if (in_array('filter', $capabilities)) {
            if (confirm('Add default filters?', false)) {
                $filtersJson = textarea(
                    label: 'Default filters (JSON)',
                    placeholder: '{"status": "active", "deleted_at": null}',
                    hint: 'Filters applied to all queries'
                );
                
                if ($filtersJson) {
                    $filters = json_decode($filtersJson, true);
                    if ($filters) {
                        $params['filters'] = $filters;
                    }
                }
            }
        }

        if (in_array('list', $capabilities) || in_array('detail', $capabilities)) {
            if (confirm('Specify default columns/relations to load?', false)) {
                $withRelations = text(
                    label: 'Load relations (comma-separated)',
                    placeholder: 'user,tasks,comments',
                    hint: 'Eager load these relationships'
                );
                
                if ($withRelations) {
                    $params['with'] = array_map('trim', explode(',', $withRelations));
                }
            }
        }

        return !empty($params) ? $params : null;
    }

    protected function generateSchemaFromModel(?string $modelClass): ?array
    {
        if (!$modelClass || !class_exists($modelClass)) {
            warning('Model class not found. Skipping schema generation.');
            return null;
        }

        try {
            $model = new $modelClass;
            $table = $model->getTable();
            
            info("Analyzing model: {$modelClass}");
            info("Table: {$table}");
            
            // Get table columns with types
            $columns = \Schema::getColumns($table);
            
            // Build transform map for schema (maps field name to database column)
            $transform = [];
            foreach ($columns as $column) {
                $colName = $column['name'];
                
                // Handle datetime fields specially with format
                if (in_array($column['type_name'], ['timestamp', 'date', 'datetime'])) {
                    $transform[$colName] = [
                        'source' => $colName,
                        'format' => 'iso8601'
                    ];
                } else {
                    $transform[$colName] = $colName;
                }
            }
            
            $schema = [
                'transform' => $transform
            ];

            info("✓ Schema generated with " . count($transform) . " field mappings");
            
            return $schema;
        } catch (\Exception $e) {
            warning("Could not analyze model: {$e->getMessage()}");
            return null;
        }
    }
    
    protected function generateFieldsFromModel(?string $modelClass): ?array
    {
        if (!$modelClass || !class_exists($modelClass)) {
            return null;
        }

        try {
            $model = new $modelClass;
            $table = $model->getTable();
            $columns = \Schema::getColumns($table);
            
            $fields = [];
            foreach ($columns as $column) {
                $colName = $column['name'];
                $type = $this->mapColumnType($column['type_name']);
                
                $fields[] = [
                    'name' => $colName,
                    'type' => $type,
                    'label' => ucwords(str_replace('_', ' ', $colName)),
                    'searchable' => in_array($type, ['string', 'text']),
                    'sortable' => !in_array($type, ['text', 'json']),
                    'filterable' => in_array($type, ['string', 'integer', 'boolean']),
                ];
            }
            
            info("✓ Generated " . count($fields) . " field definitions");
            
            return $fields;
        } catch (\Exception $e) {
            warning("Could not generate fields: {$e->getMessage()}");
            return null;
        }
    }
    
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

    protected function loadAvailableModels(): void
    {
        $modelsPath = app_path('Models');
        
        if (!File::isDirectory($modelsPath)) {
            return;
        }

        $files = File::files($modelsPath);
        
        foreach ($files as $file) {
            $className = 'App\\Models\\' . $file->getFilenameWithoutExtension();
            
            if (class_exists($className)) {
                $this->availableModels[$className] = $file->getFilenameWithoutExtension();
            }
        }
    }
}
