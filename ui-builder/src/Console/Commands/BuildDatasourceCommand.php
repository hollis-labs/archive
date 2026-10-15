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

        $this->newLine();

        // Step 3: Basic Operations
        $this->info('⚡ Step 3: Basic Operations');

        $basicOperations = multiselect(
            label: 'What basic operations should this datasource support?',
            options: [
                'create' => 'Create (insert new records)',
                'update' => 'Update (modify records)',
                'delete' => 'Delete (remove records)',
            ],
            default: [],
            hint: 'Read operations (list, detail) are always enabled'
        );

        $this->newLine();

        // Step 4: Relations Configuration (needed for Step 5)
        $this->info('🔗 Step 4: Relations Configuration');

        $relations = null;
        if (confirm('Configure model relations?', false)) {
            $relations = $this->configureRelations($modelClass);
        }

        $this->newLine();

        // Step 5: Default Parameters
        $this->info('⚙️  Step 5: Default Parameters');

        if (confirm('Configure default query parameters?', true)) {
            $defaultParams = $this->configureDefaultParams($basicOperations, $modelClass, $relations);
        } else {
            $defaultParams = null;
        }

        $this->newLine();

        // Step 6: Schema Configuration
        $this->info('📐 Step 6: Schema Configuration');

        $schema = null;
        $fields = null;

        $generateMode = select(
            label: 'How would you like to configure schema and fields?',
            options: [
                'interactive' => 'Interactive (select fields with checkboxes)',
                'auto' => 'Auto-generate all fields',
                'manual' => 'Manual JSON entry',
            ],
            default: 'interactive',
            hint: 'Choose configuration method'
        );

        if ($generateMode === 'interactive') {
            $result = $this->interactiveFieldSelection($modelClass);
            $schema = $result['schema'];
            $fields = $result['fields'];

            if ($schema && $fields) {
                info("✓ Configured schema with " . count($fields) . " fields");
            }
        } elseif ($generateMode === 'auto') {
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

        // Step 7: Additional Configuration
        $this->info('🔧 Step 7: Additional Configuration');

        $config = null;
        $metadata = null;

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

        // Step 8: Review & Save
        $this->info('👀 Step 8: Review & Save');

        // Build capabilities from fields (field-level capabilities)
        $capabilities = $this->buildCapabilitiesFromFields($fields, $basicOperations);

        // Set default handler to DataSourceResolver
        $handler = 'HollisLabs\\UiBuilder\\Services\\DataSourceResolver';

        $data = [
            'alias' => $alias,
            'model_class' => $modelClass,
            'handler' => $handler,
            'capabilities' => $capabilities,
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

        // Count capabilities
        $capCount = 0;
        if ($capabilities) {
            $capCount += count($capabilities['searchable'] ?? []);
            $capCount += count($capabilities['filterable'] ?? []);
            $capCount += count($capabilities['sortable'] ?? []);
            $capCount += count(array_filter($capabilities, fn($v) => is_bool($v)));
        }

        $this->table(
            ['Property', 'Value'],
            [
                ['Alias', $alias],
                ['Model', $modelClass ?? '(none)'],
                ['Handler', 'DataSourceResolver'],
                ['Capabilities', $capCount . ' capability rules'],
                ['Fields', count($fields ?? []) . ' fields'],
                ['Relations', count($relations ?? []) . ' relations'],
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
            $this->line("  Handler: " . ($datasource->handler ?? '(none)'));
            $this->line("  Capabilities: {$capCount} rules");
            $this->line("  Fields: " . count($fields ?? []));
            $this->line("  Relations: " . count($relations ?? []));

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

    protected function configureDefaultParams(array $basicOperations, ?string $modelClass, ?array $relations): ?array
    {
        $params = [
            'with' => [],
            'scopes' => [],
        ];

        // Pagination
        $perPage = text(
            label: 'Default page size',
            default: '15',
            hint: 'Number of records per page'
        );

        if ($perPage) {
            $params['per_page'] = (int) $perPage;
        }

        // Sorting
        $sortField = text(
            label: 'Default sort field',
            placeholder: 'created_at',
            hint: 'Field to sort by default'
        );

        if ($sortField) {
            $sortOrder = select(
                label: 'Sort order',
                options: ['asc' => 'Ascending', 'desc' => 'Descending'],
                default: 'desc'
            );

            $params['default_sort'] = [$sortField, $sortOrder];
        }

        // Default filters (interactive)
        if (confirm('Add default filters?', false)) {
            $filters = $this->configureDefaultFilters($modelClass);
            if (!empty($filters)) {
                $params['filters'] = $filters;
            }
        }

        // Relations to eager load (checkbox selection from detected relations)
        if (!empty($relations) && confirm('Eager load relations by default?', false)) {
            $relationOptions = [];
            foreach ($relations as $relationName => $relationConfig) {
                $relationType = $relationConfig['type'] ?? 'Unknown';
                $relationOptions[$relationName] = "{$relationName} ({$relationType})";
            }

            $selectedRelations = multiselect(
                label: 'Select relations to eager load',
                options: $relationOptions,
                hint: 'These will be loaded automatically with every query'
            );

            if (!empty($selectedRelations)) {
                $params['with'] = $selectedRelations;
                info("✓ Will eager load: " . implode(', ', $selectedRelations));
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

    protected function interactiveFieldSelection(?string $modelClass): array
    {
        if (!$modelClass || !class_exists($modelClass)) {
            warning('Model class not found. Cannot use interactive selection.');
            return ['schema' => null, 'fields' => null];
        }

        try {
            $model = new $modelClass;
            $table = $model->getTable();
            $columns = \Schema::getColumns($table);

            info("Found " . count($columns) . " columns in table: {$table}");
            $this->newLine();

            // Build options for multiselect with all selected by default
            $columnOptions = [];
            $defaultSelected = [];

            foreach ($columns as $column) {
                $colName = $column['name'];
                $colType = $column['type_name'];
                $columnOptions[$colName] = "{$colName} ({$colType})";
                $defaultSelected[] = $colName;
            }

            // Let user select which fields to include
            $selectedFields = multiselect(
                label: 'Select fields to include',
                options: $columnOptions,
                default: $defaultSelected,
                hint: 'Uncheck fields you want to exclude. All are selected by default.',
                required: true
            );

            if (empty($selectedFields)) {
                warning('No fields selected.');
                return ['schema' => null, 'fields' => null];
            }

            $this->newLine();
            info("Configuring " . count($selectedFields) . " selected fields...");
            $this->newLine();

            // Build schema and fields for selected columns
            $schema = ['transform' => []];
            $fields = [];

            // Ask if user wants to customize field properties or use defaults
            $customizeProperties = confirm(
                'Customize field properties (searchable, sortable, etc.)?',
                false
            );

            foreach ($selectedFields as $colName) {
                // Find the column info
                $columnInfo = collect($columns)->firstWhere('name', $colName);
                $colType = $columnInfo['type_name'];
                $mappedType = $this->mapColumnType($colType);

                // Build schema transform
                if (in_array($colType, ['timestamp', 'date', 'datetime'])) {
                    $schema['transform'][$colName] = [
                        'source' => $colName,
                        'format' => 'iso8601'
                    ];
                } else {
                    $schema['transform'][$colName] = $colName;
                }

                // Build field definition with smart defaults
                $fieldDef = [
                    'name' => $colName,
                    'type' => $mappedType,
                    'label' => ucwords(str_replace('_', ' ', $colName)),
                    'searchable' => in_array($mappedType, ['string', 'text']),
                    'sortable' => !in_array($mappedType, ['text', 'json']),
                    'filterable' => in_array($mappedType, ['string', 'integer', 'boolean', 'datetime']),
                ];

                // Allow customization if requested
                if ($customizeProperties) {
                    $this->line("Field: {$colName} ({$mappedType})");

                    $customLabel = text(
                        label: '  Label',
                        default: $fieldDef['label'],
                        hint: 'Display label for this field'
                    );

                    if ($customLabel) {
                        $fieldDef['label'] = $customLabel;
                    }

                    $fieldDef['searchable'] = confirm(
                        '  Searchable?',
                        $fieldDef['searchable']
                    );

                    $fieldDef['sortable'] = confirm(
                        '  Sortable?',
                        $fieldDef['sortable']
                    );

                    $fieldDef['filterable'] = confirm(
                        '  Filterable?',
                        $fieldDef['filterable']
                    );

                    $this->newLine();
                }

                $fields[] = $fieldDef;
            }

            if (!$customizeProperties) {
                info("✓ Using smart defaults for field properties");
            }

            return [
                'schema' => $schema,
                'fields' => $fields
            ];

        } catch (\Exception $e) {
            error("Could not analyze model: {$e->getMessage()}");
            return ['schema' => null, 'fields' => null];
        }
    }

    protected function buildCapabilitiesFromFields(?array $fields, array $basicOperations): ?array
    {
        if (empty($fields)) {
            return null;
        }

        $capabilities = [
            'searchable' => [],
            'filterable' => [],
            'sortable' => [],
        ];

        // Build field-level capabilities from field definitions
        foreach ($fields as $field) {
            if (!empty($field['searchable'])) {
                $capabilities['searchable'][] = $field['name'];
            }
            if (!empty($field['filterable'])) {
                $capabilities['filterable'][] = $field['name'];
            }
            if (!empty($field['sortable'])) {
                $capabilities['sortable'][] = $field['name'];
            }
        }

        // Add basic operations (create, update, delete)
        foreach ($basicOperations as $operation) {
            $capabilities[$operation] = true;
        }

        // Remove empty arrays
        $capabilities = array_filter($capabilities, fn($v) => !empty($v));

        return !empty($capabilities) ? $capabilities : null;
    }

    protected function configureDefaultFilters(?string $modelClass): array
    {
        if (!$modelClass || !class_exists($modelClass)) {
            warning('Model class not available. Skipping default filters.');
            return [];
        }

        try {
            $model = new $modelClass;
            $table = $model->getTable();
            $columns = \Schema::getColumns($table);

            // Build list of filterable fields
            $filterableFields = [];
            foreach ($columns as $column) {
                $colName = $column['name'];
                $colType = $column['type_name'];
                $mappedType = $this->mapColumnType($colType);

                // Only show fields that make sense for filtering
                if (in_array($mappedType, ['string', 'integer', 'boolean', 'datetime'])) {
                    $filterableFields[$colName] = "{$colName} ({$mappedType})";
                }
            }

            if (empty($filterableFields)) {
                info('No filterable fields found.');
                return [];
            }

            // Let user select fields to filter
            $selectedFields = multiselect(
                label: 'Select fields to add default filters for',
                options: $filterableFields,
                hint: 'Choose fields that should have default filter values'
            );

            if (empty($selectedFields)) {
                return [];
            }

            $filters = [];

            // For each selected field, ask for the default filter value
            foreach ($selectedFields as $fieldName) {
                $columnInfo = collect($columns)->firstWhere('name', $fieldName);
                $colType = $columnInfo['type_name'];
                $mappedType = $this->mapColumnType($colType);

                $this->line("Filter for: {$fieldName} ({$mappedType})");

                if ($mappedType === 'boolean') {
                    $value = select(
                        label: '  Default value',
                        options: [
                            '1' => 'True',
                            '0' => 'False',
                            'null' => 'NULL',
                        ]
                    );
                    $filters[$fieldName] = $value === 'null' ? null : (bool) $value;
                } else {
                    $value = text(
                        label: '  Default value',
                        placeholder: 'active',
                        hint: 'Enter the filter value (leave empty for NULL)'
                    );

                    if ($value === '') {
                        $filters[$fieldName] = null;
                    } else {
                        // Try to cast appropriately
                        if ($mappedType === 'integer') {
                            $filters[$fieldName] = (int) $value;
                        } else {
                            $filters[$fieldName] = $value;
                        }
                    }
                }

                $this->newLine();
            }

            if (!empty($filters)) {
                info("✓ Added " . count($filters) . " default filters");
            }

            return $filters;

        } catch (\Exception $e) {
            warning("Could not configure filters: {$e->getMessage()}");
            return [];
        }
    }

    protected function configureRelations(?string $modelClass): ?array
    {
        if (!$modelClass || !class_exists($modelClass)) {
            warning('Model class not available. Skipping relations.');
            return null;
        }

        try {
            $model = new $modelClass;

            // Get all public methods that might be relationships
            $reflection = new \ReflectionClass($model);
            $methods = $reflection->getMethods(\ReflectionMethod::IS_PUBLIC);

            $potentialRelations = [];

            foreach ($methods as $method) {
                // Skip inherited methods from Model, HasAttributes, etc.
                if ($method->class !== $modelClass) {
                    continue;
                }

                // Skip magic methods and common non-relation methods
                $methodName = $method->getName();
                if (str_starts_with($methodName, '__') ||
                    in_array($methodName, ['boot', 'booted', 'getTable', 'getFillable', 'getCasts'])) {
                    continue;
                }

                // Check if method returns a relationship
                try {
                    $returnType = $method->getReturnType();
                    if ($returnType) {
                        $returnTypeName = $returnType->getName();

                        // Check if return type is a relationship
                        $relationshipTypes = [
                            'Illuminate\\Database\\Eloquent\\Relations\\HasOne',
                            'Illuminate\\Database\\Eloquent\\Relations\\HasMany',
                            'Illuminate\\Database\\Eloquent\\Relations\\BelongsTo',
                            'Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany',
                            'Illuminate\\Database\\Eloquent\\Relations\\MorphTo',
                            'Illuminate\\Database\\Eloquent\\Relations\\MorphOne',
                            'Illuminate\\Database\\Eloquent\\Relations\\MorphMany',
                            'Illuminate\\Database\\Eloquent\\Relations\\MorphToMany',
                        ];

                        foreach ($relationshipTypes as $relationType) {
                            if ($returnTypeName === $relationType || is_subclass_of($returnTypeName, $relationType)) {
                                // Extract just the relation type name
                                $simpleType = class_basename($returnTypeName);
                                $potentialRelations[$methodName] = "{$methodName} ({$simpleType})";
                                break;
                            }
                        }
                    }
                } catch (\Exception $e) {
                    // Skip this method if we can't determine type
                    continue;
                }
            }

            if (empty($potentialRelations)) {
                info('No relations detected in model (methods need return type hints).');

                // Fallback to manual entry
                if (confirm('Add relations manually?', false)) {
                    return $this->manualRelationsEntry();
                }

                return null;
            }

            info("Found " . count($potentialRelations) . " potential relations");
            $this->newLine();

            // Let user select which relations to include
            $selectedRelations = multiselect(
                label: 'Select relations to include in datasource',
                options: $potentialRelations,
                hint: 'Choose relations that should be available for eager loading'
            );

            if (empty($selectedRelations)) {
                return null;
            }

            $relations = [];

            // For each selected relation, ask for details
            $customizeDetails = confirm('Customize relation details?', false);

            foreach ($selectedRelations as $relationName) {
                $relationType = str_replace("{$relationName} (", '', $potentialRelations[$relationName]);
                $relationType = rtrim($relationType, ')');

                if ($customizeDetails) {
                    $this->line("Relation: {$relationName}");

                    $relatedModel = text(
                        label: '  Related model (optional)',
                        placeholder: 'App\\Models\\User',
                        hint: 'Full class name of related model'
                    );

                    $relations[$relationName] = [
                        'type' => $relationType,
                    ];

                    if ($relatedModel) {
                        $relations[$relationName]['related'] = $relatedModel;
                    }

                    $this->newLine();
                } else {
                    $relations[$relationName] = [
                        'type' => $relationType,
                    ];
                }
            }

            if (!$customizeDetails) {
                info("✓ Added " . count($relations) . " relations with defaults");
            }

            return !empty($relations) ? $relations : null;

        } catch (\Exception $e) {
            warning("Could not detect relations: {$e->getMessage()}");

            if (confirm('Add relations manually?', false)) {
                return $this->manualRelationsEntry();
            }

            return null;
        }
    }

    protected function manualRelationsEntry(): ?array
    {
        $relationsJson = textarea(
            label: 'Relations (JSON)',
            placeholder: '{"user": {"type": "BelongsTo"}, "tasks": {"type": "HasMany"}}',
            hint: 'Define model relationships'
        );

        return $relationsJson ? json_decode($relationsJson, true) : null;
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
