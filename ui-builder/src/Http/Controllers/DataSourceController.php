<?php

namespace HollisLabs\UiBuilder\Http\Controllers;

use App\Http\Controllers\Controller;
use HollisLabs\UiBuilder\Services\DataSourceResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DataSourceController extends Controller
{
    public function __construct(
        private DataSourceResolver $resolver
    ) {}

    public function query(Request $request, string $alias): JsonResponse
    {
        try {
            $params = [
                'search' => $request->input('search'),
                'filters' => $request->input('filters', []),
                'sort' => $request->input('sort'),
                'pagination' => [
                    'page' => $request->input('page', 1),
                    'per_page' => $request->input('per_page', 15),
                ],
            ];

            $result = $this->resolver->query($alias, $params);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function capabilities(string $alias): JsonResponse
    {
        try {
            $capabilities = $this->resolver->getCapabilities($alias);

            return response()->json([
                'capabilities' => $capabilities,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function store(Request $request, string $alias): JsonResponse
    {
        try {
            $data = $request->all();
            $result = $this->resolver->create($alias, $data);

            return response()->json($result, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(string $alias, mixed $id): JsonResponse
    {
        try {
            $result = $this->resolver->show($alias, $id);

            if (!$result) {
                return response()->json([
                    'error' => 'Record not found',
                ], 404);
            }

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function update(Request $request, string $alias, mixed $id): JsonResponse
    {
        try {
            $data = $request->all();
            $result = $this->resolver->update($alias, $id, $data);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function destroy(string $alias, mixed $id): JsonResponse
    {
        try {
            $this->resolver->delete($alias, $id);

            return response()->json([
                'success' => true,
                'message' => 'Record deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get fields for a model (used by datasource builder)
     */
    public function getModelFields(Request $request): JsonResponse
    {
        try {
            $modelClass = $request->input('model_class');
            
            if (!$modelClass || !class_exists($modelClass)) {
                return response()->json([
                    'error' => 'Invalid model class',
                ], 400);
            }

            $tableName = (new $modelClass)->getTable();
            $columns = \Illuminate\Support\Facades\Schema::getColumns($tableName);
            
            $fields = [];
            foreach ($columns as $column) {
                $mappedType = $this->mapDbTypeToUiType($column['type_name']);
                
                $fields[] = [
                    'name' => $column['name'],
                    'type' => $mappedType,
                    'label' => ucwords(str_replace('_', ' ', $column['name'])),
                    'db_type' => $column['type_name'],
                    // Suggested defaults
                    'searchable' => in_array($mappedType, ['text', 'textarea']),
                    'sortable' => !in_array($mappedType, ['textarea', 'json']),
                    'filterable' => in_array($mappedType, ['text', 'number', 'boolean', 'date', 'datetime']),
                ];
            }

            return response()->json([
                'success' => true,
                'fields' => $fields,
                'table' => $tableName,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Create a new datasource definition from the builder form
     */
    public function createFromBuilder(Request $request): JsonResponse
    {
        \Log::info('Datasource builder request', [
            'data' => $request->all(),
        ]);

        try {
            $validated = $request->validate([
                'alias' => 'required|string|unique:ui_datasources,alias',
                'model_class' => 'required|string',
                'cap_create' => 'sometimes|boolean',
                'cap_update' => 'sometimes|boolean',
                'cap_delete' => 'sometimes|boolean',
                'per_page' => 'sometimes|integer|min:1',
                'sort_field' => 'sometimes|string|nullable',
                'sort_order' => 'sometimes|in:asc,desc',
                'searchable_fields' => 'sometimes|string|nullable',
                'filterable_fields' => 'sometimes|string|nullable',
                'sortable_fields' => 'sometimes|string|nullable',
                'enabled' => 'sometimes|boolean',
            ]);

            // Get model columns for field definitions
            $modelClass = $validated['model_class'];
            if (!class_exists($modelClass)) {
                throw new \Exception("Model class {$modelClass} does not exist");
            }

            // Use Schema facade to get columns
            $tableName = (new $modelClass)->getTable();
            $columns = \Illuminate\Support\Facades\Schema::getColumns($tableName);
            
            // Parse manual field specifications
            $manualSearchable = $this->parseFieldList($validated['searchable_fields'] ?? '');
            $manualFilterable = $this->parseFieldList($validated['filterable_fields'] ?? '');
            $manualSortable = $this->parseFieldList($validated['sortable_fields'] ?? '');
            
            $useManual = !empty($manualSearchable) || !empty($manualFilterable) || !empty($manualSortable);
            
            // Build field definitions
            $fields = [];
            
            foreach ($columns as $column) {
                $mappedType = $this->mapDbTypeToUiType($column['type_name']);
                $fieldName = $column['name'];
                
                $fieldDef = [
                    'name' => $fieldName,
                    'type' => $mappedType,
                    'label' => ucwords(str_replace('_', ' ', $fieldName)),
                    'nullable' => $column['nullable'],
                    'default' => $column['default'],
                ];
                
                // Use manual specifications if provided, otherwise auto-detect
                if ($useManual) {
                    $fieldDef['searchable'] = in_array($fieldName, $manualSearchable);
                    $fieldDef['filterable'] = in_array($fieldName, $manualFilterable);
                    $fieldDef['sortable'] = in_array($fieldName, $manualSortable);
                } else {
                    // Auto-detect capabilities
                    $fieldDef['searchable'] = in_array($mappedType, ['text', 'textarea']);
                    $fieldDef['sortable'] = !in_array($mappedType, ['textarea', 'json']);
                    $fieldDef['filterable'] = in_array($mappedType, ['text', 'number', 'boolean', 'date', 'datetime']);
                }
                
                $fields[] = $fieldDef;
            }

            // Build capabilities array from fields
            $capabilities = [
                'searchable' => array_column(array_filter($fields, fn($f) => $f['searchable'] ?? false), 'name'),
                'filterable' => array_column(array_filter($fields, fn($f) => $f['filterable'] ?? false), 'name'),
                'sortable' => array_column(array_filter($fields, fn($f) => $f['sortable'] ?? false), 'name'),
            ];

            // Default params
            $defaultParams = [
                'per_page' => $validated['per_page'] ?? 15,
                'sort' => [
                    'field' => $validated['sort_field'] ?? 'created_at',
                    'order' => $validated['sort_order'] ?? 'desc',
                ],
            ];

            // Operations (create/update/delete)
            $operations = [];
            if ($validated['cap_create'] ?? false) {
                $operations[] = 'create';
            }
            if ($validated['cap_update'] ?? false) {
                $operations[] = 'update';
            }
            if ($validated['cap_delete'] ?? false) {
                $operations[] = 'delete';
            }

            // Create datasource record
            $datasource = \DB::table('ui_datasources')->insertGetId([
                'alias' => $validated['alias'],
                'handler' => 'HollisLabs\UiBuilder\Services\DataSourceResolver',
                'config' => json_encode([
                    'model' => $modelClass,
                    'fields' => $fields,
                    'capabilities' => $capabilities,
                    'operations' => $operations,
                    'default_params' => $defaultParams,
                ]),
                'enabled' => $validated['enabled'] ?? true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => "Datasource '{$validated['alias']}' created successfully",
                'datasource' => [
                    'id' => $datasource,
                    'alias' => $validated['alias'],
                ],
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Datasource builder validation failed', [
                'errors' => $e->errors(),
                'request_data' => $request->all(),
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'errors' => $e->errors(),
                'message' => 'Please check the form and try again.',
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Datasource builder error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);
            
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'message' => 'Failed to create datasource: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Parse comma-separated field list
     */
    private function parseFieldList(?string $fieldList): array
    {
        if (empty($fieldList)) {
            return [];
        }
        
        return array_map('trim', explode(',', $fieldList));
    }

    /**
     * Map database column type to UI field type
     */
    private function mapDbTypeToUiType(string $dbType): string
    {
        return match (strtolower($dbType)) {
            'int', 'integer', 'bigint', 'smallint', 'tinyint', 'int8', 'int4', 'int2' => 'number',
            'boolean', 'bool' => 'boolean',
            'date' => 'date',
            'datetime', 'timestamp' => 'datetime',
            'json', 'jsonb' => 'json',
            'text', 'longtext', 'mediumtext' => 'textarea',
            default => 'text',
        };
    }
}
