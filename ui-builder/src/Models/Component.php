<?php

namespace HollisLabs\UiBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    protected $table = 'fe_ui_components';

    protected $fillable = [
        'key',
        'type',
        'kind',
        'variant',
        'schema',
        'defaults',
        'capabilities',
        'hash',
        'version',
        'enabled',
    ];

    protected $casts = [
        'schema' => 'array',
        'defaults' => 'array',
        'capabilities' => 'array',
        'enabled' => 'boolean',
        'version' => 'integer',
    ];

    public function scopeByKind($query, string $kind)
    {
        return $query->where('kind', $kind);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
