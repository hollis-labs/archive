<?php

namespace HollisLabs\UiBuilder\Console\Commands;

use HollisLabs\UiBuilder\Builders\PageConfigBuilder;
use HollisLabs\UiBuilder\Builders\ComponentBuilder;
use HollisLabs\UiBuilder\Builders\DataTableBuilder;
use HollisLabs\UiBuilder\Builders\ActionBuilder;
use HollisLabs\UiBuilder\Models\Datasource;
use HollisLabs\UiBuilder\Models\Page;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

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
 * BuildPageCommand
 * 
 * Interactive CLI tool for building UI pages using Laravel Prompts.
 * Uses the fluent builder pattern to construct page configurations step-by-step.
 * 
 * Usage:
 *   php artisan ui:build-page
 */
class BuildPageCommand extends Command
{
    protected $signature = 'ui:build-page';
    protected $description = 'Interactively build a UI page configuration';

    protected PageConfigBuilder $pageBuilder;
    protected array $availableDataSources = [];
    protected array $componentRegistry = [];

    public function handle(): int
    {
        $this->info('🎨 UI Page Builder');
        $this->newLine();

        // Load available resources
        $this->loadAvailableDataSources();
        $this->loadComponentRegistry();

        // Step 1: Page Basics
        $this->info('📋 Step 1: Page Information');
        $pageName = text(
            label: 'Page Name',
            placeholder: 'Sprint Manager',
            required: true,
            hint: 'User-facing name (will be kebab-cased for ID)'
        );

        $pageId = Str::slug($pageName);

        // Check if page already exists
        if (Page::where('key', $pageId)->exists()) {
            error("Page with ID '{$pageId}' already exists!");
            
            if (!confirm('Overwrite existing page?', false)) {
                return 1;
            }
        }

        $overlay = select(
            label: 'Display Type',
            options: [
                'modal' => 'Modal (popup overlay)',
                'sheet' => 'Sheet (slide-in panel)',
                'drawer' => 'Drawer (side panel)',
                'fullscreen' => 'Fullscreen',
                'page' => 'Full Page',
            ],
            default: 'modal'
        );

        $moduleKey = text(
            label: 'Module Key (optional)',
            placeholder: 'core.sprints',
            hint: 'Used for grouping pages'
        );

        // Initialize builder
        $this->pageBuilder = PageConfigBuilder::make($pageName)
            ->overlay($overlay);

        if ($moduleKey) {
            $this->pageBuilder->module($moduleKey);
        }

        $this->newLine();

        // Step 2: Layout Type
        $this->info('📐 Step 2: Layout');
        $layoutType = select(
            label: 'Layout Type',
            options: [
                'rows' => 'Vertical Stack (rows)',
                'columns' => 'Horizontal Stack (columns)',
                'grid' => 'Grid',
            ],
            default: 'rows'
        );

        $this->newLine();

        // Step 3: Components
        $this->info('🧩 Step 3: Add Components');
        $this->addComponents($layoutType);

        $this->newLine();

        // Step 4: Preview & Save
        $this->info('👀 Step 4: Review & Save');
        $config = $this->pageBuilder->build();

        $this->line('Generated Configuration:');
        $this->line(json_encode($config->config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->newLine();

        $this->table(
            ['Property', 'Value'],
            [
                ['ID', $config->id],
                ['Name', $config->name],
                ['Overlay', $config->config['overlay']],
                ['Module', $config->moduleKey ?? '(none)'],
            ]
        );

        $this->newLine();

        if (!confirm('Save this page?', true)) {
            warning('Page not saved.');
            return 0;
        }

        try {
            $page = $config->save();
            
            $this->info("✓ Page saved successfully!");
            $this->line("  Key: {$page->key}");
            $this->line("  Version: {$page->version}");
            $this->line("  Hash: {$page->hash}");
            
            return 0;
        } catch (\Exception $e) {
            error("Failed to save page: {$e->getMessage()}");
            return 1;
        }
    }

    protected function addComponents(string $layoutType): void
    {
        $components = [];

        $this->pageBuilder->layout($layoutType, function ($layout) use (&$components) {
            $keepAdding = true;

            while ($keepAdding) {
                $componentType = select(
                    label: 'Add component',
                    options: $this->getComponentOptions(),
                    hint: 'Select component type to add'
                );

                if ($componentType === 'done') {
                    $keepAdding = false;
                    continue;
                }

                $component = $this->buildComponent($componentType);
                
                if ($component) {
                    $layout->component($component);
                    $components[] = $component->getId();
                    
                    info("✓ Added {$componentType}: {$component->getId()}");
                }

                if (!confirm('Add another component?', false)) {
                    $keepAdding = false;
                }
            }
        });

        if (empty($components)) {
            warning('No components added. Page will be empty.');
        }
    }

    protected function buildComponent(string $type): ?ComponentBuilder
    {
        return match($type) {
            'data-table' => $this->buildDataTable(),
            'search.bar' => $this->buildSearchBar(),
            'button' => $this->buildButton(),
            'form' => $this->buildForm(),
            'card' => $this->buildCard(),
            default => $this->buildGenericComponent($type),
        };
    }

    protected function buildDataTable(): DataTableBuilder
    {
        $id = text(
            label: 'Component ID',
            placeholder: 'table-sprints',
            required: true
        );

        if (empty($this->availableDataSources)) {
            warning('No data sources available. Please create data sources first.');
            $dataSource = text('DataSource alias', required: true);
        } else {
            $dataSource = select(
                label: 'Data Source',
                options: $this->availableDataSources
            );
        }

        $builder = DataTableBuilder::make($id)->dataSource($dataSource);

        // Add columns (REQUIRED for data tables)
        $columns = $this->configureDataTableColumns($dataSource);
        
        if (empty($columns)) {
            error('Columns are required for data tables!');
            return null;
        }
        
        $builder->columns($columns);

        // Add row action
        if (confirm('Add row click action?', true)) {
            $actionType = select(
                label: 'Row click action',
                options: [
                    'modal' => 'Open detail modal',
                    'navigate' => 'Navigate to page',
                    'none' => 'No action',
                ]
            );

            if ($actionType === 'modal') {
                $modalAction = ActionBuilder::modal()
                    ->title(ucfirst($dataSource) . ' Details')
                    ->url("/api/ui/datasources/{$dataSource}/{{row.id}}");
                
                // Ask for detail fields
                $detailFieldMode = select(
                    label: 'Detail fields configuration',
                    options: [
                        'auto' => 'Use table columns',
                        'select' => 'Select from available fields',
                        'manual' => 'Manual JSON entry',
                        'skip' => 'Skip (no detail fields)',
                    ],
                    default: 'auto'
                );
                
                if ($detailFieldMode === 'auto') {
                    // Auto-generate detail fields from the columns already defined
                    $detailFields = [];
                    if (isset($columns) && is_array($columns)) {
                        foreach ($columns as $column) {
                            $detailFields[] = [
                                'key' => $column['key'],
                                'label' => $column['label'],
                                'type' => 'text', // Default to text for detail view
                            ];
                        }
                        $modalAction->fields($detailFields);
                        info("✓ Auto-generated " . count($detailFields) . " detail fields from table columns");
                    }
                } elseif ($detailFieldMode === 'select') {
                    $detailFields = $this->selectDetailFields($dataSource, $columns);
                    if (!empty($detailFields)) {
                        $modalAction->fields($detailFields);
                        info("✓ Added " . count($detailFields) . " detail fields");
                    }
                } elseif ($detailFieldMode === 'manual') {
                    $detailFieldsJson = textarea(
                        label: 'Detail fields (JSON array)',
                        placeholder: '[{"key":"id","label":"ID","type":"text"},{"key":"name","label":"Name","type":"text"}]',
                        hint: 'Fields to display in the detail modal'
                    );
                    
                    if ($detailFieldsJson) {
                        try {
                            $detailFields = json_decode($detailFieldsJson, true);
                            if (is_array($detailFields) && !empty($detailFields)) {
                                $modalAction->fields($detailFields);
                                info("✓ Added " . count($detailFields) . " detail fields");
                            }
                        } catch (\Exception $e) {
                            warning('Invalid JSON for detail fields, skipping.');
                        }
                    }
                }
                
                $builder->rowAction($modalAction);
            } elseif ($actionType === 'navigate') {
                $navPage = text('Navigate to page key', required: true);
                $builder->rowAction(ActionBuilder::navigate($navPage));
            }
        }

        return $builder;
    }

    protected function buildSearchBar(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'search-bar', required: true);
        $placeholder = text('Placeholder text', default: 'Search...');
        $target = text('Target table ID (optional)');

        $builder = ComponentBuilder::searchBar($id)
            ->placeholder($placeholder);

        if ($target) {
            $builder->target($target);
        }

        return $builder;
    }

    protected function buildButton(): ComponentBuilder
    {
        $id = text('Component ID', required: true);
        $label = text('Button Label', required: true);
        $icon = text('Icon name (optional)');
        
        $variant = select(
            'Button variant',
            ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
        );

        $builder = ComponentBuilder::button($id)
            ->label($label)
            ->variant($variant);

        if ($icon) {
            $builder->icon($icon);
        }

        return $builder;
    }

    protected function buildForm(): ComponentBuilder
    {
        info('Form builder coming soon...');
        return null;
    }

    protected function buildCard(): ComponentBuilder
    {
        info('Card builder coming soon...');
        return null;
    }

    protected function buildGenericComponent(string $type): ComponentBuilder
    {
        $id = text('Component ID', required: true);
        
        return ComponentBuilder::make($id, $type);
    }

    protected function getComponentOptions(): array
    {
        return [
            'data-table' => 'Data Table',
            'search.bar' => 'Search Bar',
            'button' => 'Button',
            'form' => 'Form (coming soon)',
            'card' => 'Card (coming soon)',
            'done' => '✓ Done adding components',
        ];
    }

    protected function loadAvailableDataSources(): void
    {
        $this->availableDataSources = Datasource::where('enabled', true)
            ->pluck('alias', 'alias')
            ->toArray();
    }

    protected function loadComponentRegistry(): void
    {
        // TODO: Load from ui_components table when component registry is populated
        $this->componentRegistry = [
            'data-table',
            'search.bar',
            'button',
            'form',
            'card',
            'input',
            'select',
            'badge',
        ];
    }

    protected function configureDataTableColumns(string $dataSourceAlias): array
    {
        $configMode = select(
            label: 'How would you like to configure columns?',
            options: [
                'interactive' => 'Interactive (select fields with checkboxes)',
                'manual' => 'Manual JSON entry',
            ],
            default: 'interactive',
            hint: 'Choose configuration method'
        );

        if ($configMode === 'manual') {
            $columnsJson = textarea(
                label: 'Columns (JSON array)',
                placeholder: '[{"key":"name","label":"Name","sortable":true}]',
                hint: 'Enter column definitions as JSON'
            );
            
            if ($columnsJson) {
                try {
                    $columns = json_decode($columnsJson, true);
                    if (is_array($columns) && !empty($columns)) {
                        return $columns;
                    }
                } catch (\Exception $e) {
                    error('Invalid JSON: ' . $e->getMessage());
                }
            }
            return [];
        }

        // Interactive mode: Get fields from datasource
        try {
            $datasource = Datasource::where('alias', $dataSourceAlias)->first();
            
            if (!$datasource) {
                warning("Datasource '{$dataSourceAlias}' not found. Using manual entry.");
                return $this->manualColumnEntry();
            }

            $availableFields = [];
            $defaultSelected = [];

            // Try to get fields from datasource configuration
            if (!empty($datasource->fields)) {
                foreach ($datasource->fields as $field) {
                    $fieldName = $field['name'];
                    $fieldLabel = $field['label'] ?? ucwords(str_replace('_', ' ', $fieldName));
                    $fieldType = $field['type'] ?? 'string';
                    
                    $availableFields[$fieldName] = "{$fieldLabel} ({$fieldType})";
                    
                    // Auto-select common display fields
                    if (!in_array($fieldName, ['password', 'remember_token', 'deleted_at'])) {
                        $defaultSelected[] = $fieldName;
                    }
                }
            } elseif ($datasource->model_class && class_exists($datasource->model_class)) {
                // Fall back to model introspection
                $model = new $datasource->model_class;
                $table = $model->getTable();
                $columns = \Schema::getColumns($table);
                
                foreach ($columns as $column) {
                    $colName = $column['name'];
                    $colType = $column['type_name'];
                    
                    $availableFields[$colName] = "{$colName} ({$colType})";
                    
                    // Auto-select common display fields
                    if (!in_array($colName, ['password', 'remember_token', 'deleted_at'])) {
                        $defaultSelected[] = $colName;
                    }
                }
            } else {
                warning("Cannot introspect datasource fields. Using manual entry.");
                return $this->manualColumnEntry();
            }

            if (empty($availableFields)) {
                warning("No fields found in datasource. Using manual entry.");
                return $this->manualColumnEntry();
            }

            info("Found " . count($availableFields) . " available fields");
            $this->newLine();

            // Let user select which columns to include
            $selectedColumns = multiselect(
                label: 'Select columns to display',
                options: $availableFields,
                default: $defaultSelected,
                hint: 'Uncheck columns you want to exclude',
                required: true
            );

            if (empty($selectedColumns)) {
                warning('No columns selected.');
                return [];
            }

            $this->newLine();
            
            // Ask if user wants to customize column properties
            $customizeProperties = confirm(
                'Customize column properties (sortable, width, etc.)?',
                false
            );

            $columns = [];
            foreach ($selectedColumns as $colName) {
                // Find field info from datasource
                $fieldInfo = null;
                if (!empty($datasource->fields)) {
                    $fieldInfo = collect($datasource->fields)->firstWhere('name', $colName);
                }

                $column = [
                    'key' => $colName,
                    'label' => $fieldInfo['label'] ?? ucwords(str_replace('_', ' ', $colName)),
                    'sortable' => $fieldInfo['sortable'] ?? true,
                ];

                if ($customizeProperties) {
                    $this->line("Column: {$colName}");
                    
                    $customLabel = text(
                        label: '  Label',
                        default: $column['label']
                    );
                    
                    if ($customLabel) {
                        $column['label'] = $customLabel;
                    }
                    
                    $column['sortable'] = confirm(
                        '  Sortable?',
                        $column['sortable']
                    );
                    
                    $width = text(
                        label: '  Width (optional)',
                        placeholder: '200px or 20%',
                        hint: 'Leave empty for auto'
                    );
                    
                    if ($width) {
                        $column['width'] = $width;
                    }
                    
                    $align = select(
                        label: '  Text alignment',
                        options: ['left', 'center', 'right'],
                        default: 'left'
                    );
                    
                    if ($align !== 'left') {
                        $column['align'] = $align;
                    }
                    
                    $this->newLine();
                }

                $columns[] = $column;
            }

            if (!$customizeProperties) {
                info("✓ Using smart defaults for column properties");
            }

            return $columns;

        } catch (\Exception $e) {
            error("Error configuring columns: {$e->getMessage()}");
            return $this->manualColumnEntry();
        }
    }

    protected function selectDetailFields(string $dataSourceAlias, array $tableColumns): array
    {
        try {
            $datasource = Datasource::where('alias', $dataSourceAlias)->first();
            
            if (!$datasource || empty($datasource->fields)) {
                // Fall back to using table columns
                $detailFields = [];
                foreach ($tableColumns as $column) {
                    $detailFields[] = [
                        'key' => $column['key'],
                        'label' => $column['label'],
                        'type' => 'text',
                    ];
                }
                return $detailFields;
            }

            $availableFields = [];
            $defaultSelected = [];

            foreach ($datasource->fields as $field) {
                $fieldName = $field['name'];
                $fieldLabel = $field['label'] ?? ucwords(str_replace('_', ' ', $fieldName));
                $fieldType = $field['type'] ?? 'string';
                
                $availableFields[$fieldName] = "{$fieldLabel} ({$fieldType})";
                
                // Auto-select fields that are in table columns
                $inTableColumns = collect($tableColumns)->firstWhere('key', $fieldName);
                if ($inTableColumns) {
                    $defaultSelected[] = $fieldName;
                }
            }

            if (empty($availableFields)) {
                // Fall back to table columns
                $detailFields = [];
                foreach ($tableColumns as $column) {
                    $detailFields[] = [
                        'key' => $column['key'],
                        'label' => $column['label'],
                        'type' => 'text',
                    ];
                }
                return $detailFields;
            }

            $selectedFields = multiselect(
                label: 'Select detail fields to display',
                options: $availableFields,
                default: $defaultSelected,
                hint: 'Choose fields for the detail modal',
                required: true
            );

            $detailFields = [];
            foreach ($selectedFields as $fieldName) {
                $fieldInfo = collect($datasource->fields)->firstWhere('name', $fieldName);
                
                $detailFields[] = [
                    'key' => $fieldName,
                    'label' => $fieldInfo['label'] ?? ucwords(str_replace('_', ' ', $fieldName)),
                    'type' => 'text', // Always use text for detail view
                ];
            }

            return $detailFields;

        } catch (\Exception $e) {
            warning("Error selecting detail fields: {$e->getMessage()}");
            
            // Fall back to table columns
            $detailFields = [];
            foreach ($tableColumns as $column) {
                $detailFields[] = [
                    'key' => $column['key'],
                    'label' => $column['label'],
                    'type' => 'text',
                ];
            }
            return $detailFields;
        }
    }

    protected function manualColumnEntry(): array
    {
        $columnsJson = textarea(
            label: 'Columns (JSON array)',
            placeholder: '[{"key":"name","label":"Name","sortable":true}]',
            hint: 'Enter column definitions as JSON'
        );
        
        if ($columnsJson) {
            try {
                $columns = json_decode($columnsJson, true);
                if (is_array($columns) && !empty($columns)) {
                    return $columns;
                }
            } catch (\Exception $e) {
                error('Invalid JSON: ' . $e->getMessage());
            }
        }
        
        return [];
    }
}
