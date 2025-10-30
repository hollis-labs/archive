<?php

namespace HollisLabs\UiBuilder\Services;

use HollisLabs\UiBuilder\Models\Datasource;
use Illuminate\Support\Facades\Cache;

class DataSourceResolver
{
    public function query(string $alias, array $params = []): array
    {
        $config = $this->getConfig($alias);

        $modelClass = $config['model'];
        $query = $modelClass::query();

        if (!empty($config['with'])) {
            $query->with($config['with']);
        }

        if (!empty($config['scopes'])) {
            foreach ($config['scopes'] as $scope) {
                $query->{$scope}();
            }
        }

        if (isset($params['search']) && !empty($params['search'])) {
            $search = $params['search'];
            $searchable = $config['capabilities']['searchable'] ?? [];

            if (!empty($searchable)) {
                $query->where(function ($q) use ($searchable, $search) {
                    foreach ($searchable as $field) {
                        $q->orWhere($field, 'like', "%{$search}%");
                    }
                });
            }
        }

        if (isset($params['filters']) && is_array($params['filters'])) {
            $filterable = $config['capabilities']['filterable'] ?? [];

            foreach ($params['filters'] as $field => $value) {
                if (in_array($field, $filterable) && !empty($value)) {
                    $query->where($field, $value);
                }
            }
        }

        if (isset($params['sort']) && is_array($params['sort'])) {
            $sortField = $params['sort']['field'] ?? 'updated_at';
            $sortDirection = $params['sort']['direction'] ?? 'desc';
            $sortable = $config['capabilities']['sortable'] ?? [];

            if (in_array($sortField, $sortable)) {
                $query->orderBy($sortField, $sortDirection);
            }
        } else {
            $defaultSort = $config['default_sort'] ?? ['updated_at', 'desc'];
            $query->orderBy($defaultSort[0], $defaultSort[1]);
        }

        $perPage = $params['pagination']['per_page'] ?? 15;
        $page = $params['pagination']['page'] ?? 1;
        $paginated = $query->paginate($perPage, ['*'], 'page', $page);

        $data = $paginated->items();
        $transformedData = array_map(function ($item) use ($config) {
            return $this->transformItem($item, $config['transform']);
        }, $data);

        return [
            'data' => $transformedData,
            'meta' => [
                'total' => $paginated->total(),
                'page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'last_page' => $paginated->lastPage(),
            ],
            'hash' => hash('sha256', json_encode($transformedData)),
        ];
    }

    protected function transformItem($item, array $transform): array
    {
        $result = [];

        foreach ($transform as $outputKey => $config) {
            if (is_string($config)) {
                $value = data_get($item, $config);
                $result[$outputKey] = $this->normalizeValue($value);
            } elseif (is_array($config)) {
                $source = $config['source'] ?? $outputKey;
                $value = data_get($item, $source);

                if (isset($config['format'])) {
                    $value = $this->formatValue($value, $config['format']);
                }

                $result[$outputKey] = $this->normalizeValue($value);
            }
        }

        return $result;
    }

    protected function normalizeValue($value)
    {
        // Convert Collections to arrays for JSON serialization
        if ($value instanceof \Illuminate\Support\Collection) {
            return $value->toArray();
        }

        // Convert other objects that have toArray method
        if (is_object($value) && method_exists($value, 'toArray')) {
            return $value->toArray();
        }

        // Convert any remaining objects to arrays if possible
        if (is_object($value)) {
            return json_decode(json_encode($value), true);
        }

        return $value;
    }

    protected function formatValue($value, string $format)
    {
        return match ($format) {
            'iso8601' => $value?->toIso8601String(),
            'date' => $value?->toDateString(),
            'avatar_url' => $value ? asset("storage/{$value}") : null,
            default => $value,
        };
    }

    protected function getConfig(string $alias): array
    {
        return Cache::remember("datasource.{$alias}", 3600, function () use ($alias) {
            $datasource = Datasource::where('alias', $alias)->firstOrFail();

            return [
                'model' => $datasource->model_class,
                'with' => $datasource->default_params['with'] ?? [],
                'scopes' => $datasource->default_params['scopes'] ?? [],
                'default_sort' => $datasource->default_params['default_sort'] ?? ['updated_at', 'desc'],
                'capabilities' => $datasource->capabilities ?? [],
                'transform' => $datasource->schema['transform'] ?? [],
                'primary_key' => $datasource->config['primary_key'] ?? 'id',
                'fields' => $datasource->fields ?? [],
                'relations' => $datasource->relations ?? [],
            ];
        });
    }

    public function getCapabilities(string $alias): array
    {
        $config = $this->getConfig($alias);

        return $config['capabilities'];
    }

    public function show(string $alias, mixed $id): ?array
    {
        $config = $this->getConfig($alias);
        $modelClass = $config['model'];
        $primaryKey = $config['primary_key'] ?? 'id';

        $instance = $modelClass::where($primaryKey, $id)->first();

        if (!$instance) {
            return null;
        }

        if (!empty($config['with'])) {
            $instance->load($config['with']);
        }

        return $this->transformItem($instance, $config['transform']);
    }

    public function create(string $alias, array $data): array
    {
        $config = $this->getConfig($alias);
        $modelClass = $config['model'];

        $instance = $modelClass::create($data);

        return $this->transformItem($instance, $config['transform']);
    }

    public function update(string $alias, mixed $id, array $data): ?array
    {
        $config = $this->getConfig($alias);
        $modelClass = $config['model'];
        $primaryKey = $config['primary_key'] ?? 'id';

        $instance = $modelClass::where($primaryKey, $id)->first();

        if (!$instance) {
            return null;
        }

        $instance->update($data);
        $instance->refresh();

        return $this->transformItem($instance, $config['transform']);
    }

    public function delete(string $alias, mixed $id): bool
    {
        $config = $this->getConfig($alias);
        $modelClass = $config['model'];
        $primaryKey = $config['primary_key'] ?? 'id';

        $instance = $modelClass::where($primaryKey, $id)->first();

        if (!$instance) {
            return false;
        }

        return $instance->delete();
    }

    public function clearCache(string $alias): void
    {
        Cache::forget("datasource.{$alias}");
    }
}
