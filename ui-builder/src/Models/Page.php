<?php

namespace HollisLabs\UiBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $table = 'ui_pages';

    protected $fillable = [
        'key',
        'config',
        'metadata',
        'module_key',
        'guards',
        'enabled',
        'hash',
        'version',
    ];

    protected $casts = [
        'config' => 'array',
        'metadata' => 'array',
        'guards' => 'array',
        'enabled' => 'boolean',
        'version' => 'integer',
    ];

    // Add auto-hashing on save
    protected static function booted()
    {
        static::saving(function ($page) {
            $newHash = hash('sha256', json_encode($page->config, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
            if ($page->hash !== $newHash) {
                $page->hash = $newHash;
                $page->version = ($page->version ?? 0) + 1;
            }
        });
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_key', 'key');
    }

    public function scopeEnabled($query)
    {
        return $query->where('enabled', true);
    }


}
