<?php

namespace HollisLabs\UiBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $table = 'fe_ui_actions';

    protected $fillable = [
        'key',
        'type',
        'label',
        'handler_class',
        'config',
        'params',
        'payload_schema',
        'policy',
        'enabled',
    ];

    protected $casts = [
        'config' => 'array',
        'params' => 'array',
        'payload_schema' => 'array',
        'policy' => 'array',
        'enabled' => 'boolean',
    ];

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
