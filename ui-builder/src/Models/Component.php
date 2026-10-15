<?php

namespace HollisLabs\UiBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    protected $table = 'ui_components';

    protected $fillable = [
        'key',
        'type',
        'kind',
        'config',
        'variant',
        'schema',
        'defaults',
        'capabilities',
        'hash',
        'version',
    ];

    protected $casts = [
        'config' => 'array',
        'schema' => 'array',
        'defaults' => 'array',
        'capabilities' => 'array',
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
