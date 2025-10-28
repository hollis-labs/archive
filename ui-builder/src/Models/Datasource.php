<?php

namespace HollisLabs\UiBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Datasource extends Model
{
    protected $table = 'fe_ui_datasources';

    protected $fillable = [
        'alias',
        'model_class',
        'handler',
        'resolver_class',
        'capabilities',
        'default_params_json',
        'capabilities_json',
        'schema_json',
        'fields_json',
        'relations_json',
        'config_json',
        'metadata_json',
        'enabled',
    ];

    protected $casts = [
        'capabilities' => 'array',
        'default_params_json' => 'array',
        'capabilities_json' => 'array',
        'schema_json' => 'array',
        'fields_json' => 'array',
        'relations_json' => 'array',
        'config_json' => 'array',
        'metadata_json' => 'array',
        'enabled' => 'boolean',
    ];

    public function scopeByAlias($query, string $alias)
    {
        return $query->where('alias', $alias);
    }
}
