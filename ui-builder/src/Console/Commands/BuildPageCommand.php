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
            'input' => $this->buildInput(),
            'select' => $this->buildSelect(),
            'textarea' => $this->buildTextarea(),
            'checkbox' => $this->buildCheckbox(),
            'switch' => $this->buildSwitch(),
            'badge' => $this->buildBadge(),
            'alert' => $this->buildAlert(),
            'separator' => $this->buildSeparator(),
            'accordion' => $this->buildAccordion(),
            'tabs' => $this->buildTabs(),
            'done', '---' => null,
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

        // Add onClick action
        if (confirm('Add onClick action?', false)) {
            $actionType = select(
                'Action type',
                [
                    'navigate' => 'Navigate to page',
                    'modal' => 'Open modal',
                    'http' => 'HTTP request',
                    'emit' => 'Emit event',
                    'command' => 'Execute command',
                ]
            );
            
            $action = match($actionType) {
                'navigate' => $this->buildNavigateAction(),
                'modal' => $this->buildModalAction(),
                'http' => $this->buildHttpAction(),
                'emit' => $this->buildEmitAction(),
                'command' => $this->buildCommandAction(),
            };
            
            if ($action) {
                $builder->onClick($action);
            }
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
        $id = text('Component ID', placeholder: 'card-1', required: true);
        $builder = ComponentBuilder::make($id, 'card');
        
        if (confirm('Add title?', true)) {
            $title = text('Card title', required: true);
            $builder->prop('title', $title);
        }
        
        if (confirm('Add description?', false)) {
            $description = text('Card description');
            $builder->prop('description', $description);
        }
        
        return $builder;
    }
    
    protected function buildInput(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'input-email', required: true);
        $builder = ComponentBuilder::make($id, 'input');
        
        $inputType = select(
            'Input type',
            ['text' => 'Text', 'email' => 'Email', 'password' => 'Password', 'number' => 'Number', 'date' => 'Date']
        );
        $builder->prop('type', $inputType);
        
        $placeholder = text('Placeholder', placeholder: 'Enter value...');
        if ($placeholder) {
            $builder->prop('placeholder', $placeholder);
        }
        
        if (confirm('Required?', false)) {
            $builder->prop('required', true);
        }
        
        return $builder;
    }
    
    protected function buildSelect(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'select-status', required: true);
        $builder = ComponentBuilder::make($id, 'select');
        
        $placeholder = text('Placeholder', default: 'Select option...');
        $builder->prop('placeholder', $placeholder);
        
        info('Add options (comma-separated)');
        $optionsInput = text('Options', placeholder: 'Active,Inactive,Pending', required: true);
        
        $options = array_map('trim', explode(',', $optionsInput));
        $formattedOptions = array_map(fn($opt) => ['value' => strtolower($opt), 'label' => $opt], $options);
        $builder->prop('options', $formattedOptions);
        
        return $builder;
    }
    
    protected function buildTextarea(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'textarea-notes', required: true);
        $builder = ComponentBuilder::make($id, 'textarea');
        
        $placeholder = text('Placeholder', placeholder: 'Enter notes...');
        if ($placeholder) {
            $builder->prop('placeholder', $placeholder);
        }
        
        $rows = text('Number of rows', default: '4');
        $builder->prop('rows', (int)$rows);
        
        return $builder;
    }
    
    protected function buildCheckbox(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'checkbox-agree', required: true);
        $builder = ComponentBuilder::make($id, 'checkbox');
        
        $label = text('Label', required: true);
        $builder->prop('label', $label);
        
        if (confirm('Checked by default?', false)) {
            $builder->prop('checked', true);
        }
        
        return $builder;
    }
    
    protected function buildSwitch(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'switch-enabled', required: true);
        $builder = ComponentBuilder::make($id, 'switch');
        
        $label = text('Label', required: true);
        $builder->prop('label', $label);
        
        if (confirm('Enabled by default?', false)) {
            $builder->prop('checked', true);
        }
        
        return $builder;
    }
    
    protected function buildBadge(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'badge-status', required: true);
        $builder = ComponentBuilder::make($id, 'badge');
        
        $text = text('Badge text', required: true);
        $builder->prop('text', $text);
        
        $variant = select(
            'Variant',
            ['default' => 'Default', 'secondary' => 'Secondary', 'destructive' => 'Destructive', 'outline' => 'Outline']
        );
        $builder->prop('variant', $variant);
        
        return $builder;
    }
    
    protected function buildAlert(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'alert-info', required: true);
        $builder = ComponentBuilder::make($id, 'alert');
        
        $title = text('Alert title');
        if ($title) {
            $builder->prop('title', $title);
        }
        
        $description = text('Alert description', required: true);
        $builder->prop('description', $description);
        
        $variant = select(
            'Variant',
            ['default' => 'Default', 'destructive' => 'Destructive']
        );
        $builder->prop('variant', $variant);
        
        return $builder;
    }
    
    protected function buildSeparator(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'separator-1', required: true);
        $builder = ComponentBuilder::make($id, 'separator');
        
        $orientation = select(
            'Orientation',
            ['horizontal' => 'Horizontal', 'vertical' => 'Vertical'],
            default: 'horizontal'
        );
        $builder->prop('orientation', $orientation);
        
        return $builder;
    }

    protected function buildGenericComponent(string $type): ComponentBuilder
    {
        $id = text(
            label: 'Component ID',
            placeholder: "{$type}-1",
            required: true,
            hint: 'Unique identifier for this component'
        );
        
        $builder = ComponentBuilder::make($id, $type);
        
        // Get component definition from database for smart defaults
        $componentDef = \DB::table('ui_components')
            ->where('type', $type)
            ->first();
        
        if (!$componentDef) {
            info("Note: No component definition found for '{$type}'. Using basic configuration.");
        }
        
        // Offer to configure common props
        if (confirm('Configure component properties?', false)) {
            $this->configureCommonProps($builder, $type);
        }
        
        return $builder;
    }
    
    protected function configureCommonProps(ComponentBuilder $builder, string $type): void
    {
        // Common props that many components use
        $commonProps = [
            'label' => ['button', 'input', 'select', 'checkbox', 'switch', 'field'],
            'placeholder' => ['input', 'textarea', 'select', 'combobox'],
            'variant' => ['button', 'badge', 'alert', 'card'],
            'size' => ['button', 'input', 'avatar', 'badge', 'spinner'],
            'disabled' => ['button', 'input', 'select', 'checkbox', 'switch'],
            'required' => ['input', 'select', 'textarea', 'checkbox'],
        ];
        
        // Check which props apply to this type
        $applicableProps = [];
        foreach ($commonProps as $prop => $types) {
            if (in_array($type, $types)) {
                $applicableProps[] = $prop;
            }
        }
        
        if (empty($applicableProps)) {
            info("No common properties available for type '{$type}'");
            return;
        }
        
        $selectedProps = multiselect(
            label: 'Select properties to configure',
            options: array_combine($applicableProps, array_map('ucfirst', $applicableProps)),
            hint: 'Choose which properties to set'
        );
        
        foreach ($selectedProps as $prop) {
            $value = match($prop) {
                'label', 'placeholder' => text(
                    label: ucfirst($prop),
                    placeholder: "Enter {$prop}"
                ),
                'variant' => select(
                    label: 'Variant',
                    options: $this->getVariantOptions($type)
                ),
                'size' => select(
                    label: 'Size',
                    options: ['sm' => 'Small', 'md' => 'Medium', 'lg' => 'Large']
                ),
                'disabled', 'required' => confirm(
                    ucfirst($prop) . '?',
                    false
                ),
                default => text(
                    label: ucfirst($prop),
                    placeholder: "Enter {$prop}"
                ),
            };
            
            if ($value !== null && $value !== '') {
                $builder->prop($prop, $value);
            }
        }
    }
    
    protected function getVariantOptions(string $type): array
    {
        return match($type) {
            'button' => [
                'default' => 'Default',
                'destructive' => 'Destructive',
                'outline' => 'Outline',
                'secondary' => 'Secondary',
                'ghost' => 'Ghost',
                'link' => 'Link',
            ],
            'badge' => [
                'default' => 'Default',
                'secondary' => 'Secondary',
                'destructive' => 'Destructive',
                'outline' => 'Outline',
            ],
            'alert' => [
                'default' => 'Default',
                'destructive' => 'Destructive',
            ],
            default => [
                'default' => 'Default',
            ],
        };
    }

    protected function getComponentOptions(): array
    {
        // Prioritize commonly used components at the top
        $priorityComponents = [
            'data-table' => $this->componentRegistry['data-table'] ?? 'Data Table',
            'search.bar' => 'Search Bar',
            'button' => $this->componentRegistry['button'] ?? 'Button',
            'form' => $this->componentRegistry['form'] ?? 'Form',
            'card' => $this->componentRegistry['card'] ?? 'Card',
            'input' => $this->componentRegistry['input'] ?? 'Input',
        ];
        
        // Add separator
        $separator = ['---' => '───────────────────'];
        
        // Add all other components
        $otherComponents = [];
        foreach ($this->componentRegistry as $type => $label) {
            if (!isset($priorityComponents[$type])) {
                $otherComponents[$type] = $label;
            }
        }
        
        // Add done option
        $done = ['done' => '✓ Done adding components'];
        
        return array_merge($priorityComponents, $separator, $otherComponents, $done);
    }

    protected function loadAvailableDataSources(): void
    {
        $this->availableDataSources = Datasource::where('enabled', true)
            ->pluck('alias', 'alias')
            ->toArray();
    }

    protected function loadComponentRegistry(): void
    {
        // Load components from database
        $components = \DB::table('ui_components')
            ->select('key', 'type', 'kind')
            ->orderBy('kind')
            ->orderBy('type')
            ->get();
        
        // Filter out layout types that aren't components
        $layoutTypes = ['rows', 'columns', 'grid'];
        
        $this->componentRegistry = $components
            ->filter(fn($comp) => !in_array($comp->type, $layoutTypes))
            ->mapWithKeys(function ($comp) {
                $label = ucwords(str_replace(['.', '-', '_'], ' ', $comp->type));
                return [$comp->type => "{$label} ({$comp->kind})"];
            })->toArray();
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

    protected function buildAccordion(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'accordion-faq', required: true);
        $builder = ComponentBuilder::make($id, 'accordion');
        
        $type = select(
            'Accordion type',
            ['single' => 'Single (one open at a time)', 'multiple' => 'Multiple (many open)'],
            default: 'single'
        );
        $builder->prop('type', $type);
        
        if ($type === 'single') {
            $collapsible = confirm('Collapsible (allow all closed)?', true);
            $builder->prop('collapsible', $collapsible);
        }
        
        // Add items
        $items = [];
        $itemCount = 1;
        
        while (confirm($itemCount === 1 ? 'Add accordion item?' : 'Add another item?', $itemCount === 1)) {
            $itemValue = text("Item {$itemCount} value", default: "item-{$itemCount}", required: true);
            $itemTitle = text("Item {$itemCount} title", required: true);
            $itemContent = textarea("Item {$itemCount} content", required: true);
            
            $items[] = [
                'value' => $itemValue,
                'title' => $itemTitle,
                'content' => $itemContent,
            ];
            
            $itemCount++;
        }
        
        if (empty($items)) {
            warning('No items added to accordion');
        } else {
            $builder->prop('items', $items);
            info("✓ Added {$itemCount} accordion items");
        }
        
        return $builder;
    }

    protected function buildTabs(): ComponentBuilder
    {
        $id = text('Component ID', placeholder: 'tabs-settings', required: true);
        $builder = ComponentBuilder::make($id, 'tabs');
        
        $defaultValue = text('Default tab value', placeholder: 'tab1');
        if ($defaultValue) {
            $builder->prop('defaultValue', $defaultValue);
        }
        
        // Add tabs
        $tabs = [];
        $tabCount = 1;
        
        while (confirm($tabCount === 1 ? 'Add tab?' : 'Add another tab?', $tabCount === 1)) {
            $tabValue = text("Tab {$tabCount} value", default: "tab{$tabCount}", required: true);
            $tabLabel = text("Tab {$tabCount} label", required: true);
            $tabContent = textarea("Tab {$tabCount} content", required: true);
            
            $tabs[] = [
                'value' => $tabValue,
                'label' => $tabLabel,
                'content' => $tabContent,
            ];
            
            $tabCount++;
        }
        
        if (empty($tabs)) {
            warning('No tabs added');
        } else {
            $builder->prop('tabs', $tabs);
            info("✓ Added {$tabCount} tabs");
        }
        
        return $builder;
    }

    protected function buildNavigateAction(): array
    {
        $pageKey = text('Page key to navigate to', required: true);
        return ActionBuilder::navigate($pageKey)->toArray();
    }

    protected function buildModalAction(): array
    {
        $title = text('Modal title', default: 'Details');
        $url = text('Data URL (optional)', placeholder: '/api/data/{id}');
        
        $action = ActionBuilder::modal()->title($title);
        
        if ($url) {
            $action->url($url);
        }
        
        return $action->toArray();
    }

    protected function buildHttpAction(): array
    {
        $url = text('Request URL', required: true);
        $method = select(
            'HTTP method',
            ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            default: 'POST'
        );
        
        $action = ActionBuilder::http($url, $method);
        
        if (confirm('Add payload data?', false)) {
            $payloadJson = textarea(
                'Payload (JSON)',
                placeholder: '{"key": "value"}'
            );
            
            if ($payloadJson) {
                $payload = json_decode($payloadJson, true);
                if ($payload) {
                    $action->payload($payload);
                }
            }
        }
        
        $refreshTarget = text('Refresh target ID (optional)', hint: 'Component to refresh after request');
        if ($refreshTarget) {
            $action->refreshTarget($refreshTarget);
        }
        
        return $action->toArray();
    }

    protected function buildEmitAction(): array
    {
        $eventName = text('Event name', required: true);
        
        $payload = [];
        if (confirm('Add event payload?', false)) {
            $payloadJson = textarea(
                'Payload (JSON)',
                placeholder: '{"key": "value"}'
            );
            
            if ($payloadJson) {
                $payload = json_decode($payloadJson, true) ?: [];
            }
        }
        
        return ActionBuilder::emit($eventName, $payload)->toArray();
    }

    protected function buildCommandAction(): array
    {
        $commandName = text('Command name', required: true);
        
        $params = [];
        if (confirm('Add command parameters?', false)) {
            $paramsJson = textarea(
                'Parameters (JSON)',
                placeholder: '{"param1": "value1"}'
            );
            
            if ($paramsJson) {
                $params = json_decode($paramsJson, true) ?: [];
            }
        }
        
        return [
            'type' => 'command',
            'command' => $commandName,
            'params' => $params,
        ];
    }
}
