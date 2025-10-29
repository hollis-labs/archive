<?php

return [
    /*
    |--------------------------------------------------------------------------
    | UI Builder Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the  UI Builder system
    |
    */

    'cache' => [
        // Enable/disable caching in development
        'enabled' => env('UI_BUILDER_CACHE_ENABLED', !app()->environment('local')),
        
        // Cache TTL in seconds
        'ttl' => env('UI_BUILDER_CACHE_TTL', 3600),
        
        // Cache keys
        'keys' => [
            'datasources' => 'ui-builder.datasources',
            'components' => 'ui-builder.components',
            'pages' => 'ui-builder.pages',
            'registry' => 'ui-builder.registry',
        ],
    ],

    'datasource' => [
        // Default resolver to use
        'default_resolver' => HollisLabs\UiBuilder\Http\Controllers\DataSourceController::class,
        
        // Whether to use wrapped responses
        'use_wrapped_responses' => true,
    ],

    'actions' => [
        // Supported action types
        'types' => [
            'modal' => 'Open in modal',
            'toast' => 'Show toast notification',
            'inline' => 'Update inline',
            'navigate' => 'Navigate to route',
            'command' => 'Execute command',
        ],
    ],

    'routes' => [
        // API route prefix
        'prefix' => env('UI_BUILDER_ROUTE_PREFIX', 'ui'),
        
        // Page route prefix (after API prefix)
        'page_prefix' => env('UI_BUILDER_PAGE_PREFIX', 'pages'),
    ],
];