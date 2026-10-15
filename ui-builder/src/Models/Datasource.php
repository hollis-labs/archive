<?php

namespace HollisLabs\UiBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Datasource extends Model
{
    protected $table = 'ui_datasources';

    protected $fillable = [
        'alias',
        'model_class',
        'handler',
        'capabilities',
        'default_params',
        'schema',
        'fields',
        'relations',
        'config',
        'metadata',
        'enabled',
    ];

    protected $casts = [
        'capabilities' => 'array',
        'default_params' => 'array',
        'schema' => 'array',
        'fields' => 'array',
        'relations' => 'array',
        'config' => 'array',
        'metadata' => 'array',
        'enabled' => 'boolean',
    ];

    public function scopeByAlias($query, string $alias)
    {
        return $query->where('alias', $alias);
    }
}
