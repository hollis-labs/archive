<?php

namespace HollisLabs\UiBuilder\Http\Controllers;

use Illuminate\Routing\Controller;
use HollisLabs\UiBuilder\Models\Page;
use Illuminate\Http\JsonResponse;

class UiPageController extends Controller
{
    public function show(string $key): JsonResponse
    {
        $page = Page::where('key', $key)->firstOrFail();

        // Get the page config
        $config = $page->config ?? [];
        
        // Validate that layout exists
        if (!isset($config['layout'])) {
            return response()->json([
                'error' => 'Invalid page configuration: missing layout'
            ], 422);
        }
        
        // Add metadata to the config
        $config['_meta'] = [
            'page_id' => $page->id,
            'hash' => $page->hash,
            'version' => $page->version,
            'enabled' => $page->enabled ?? true,
            'module_key' => $page->module_key,
            'timestamp' => $page->updated_at->toIso8601String(),
        ];

        // Return in the format expected by ShellPage
        return response()->json([
            'config' => $config,
            'featureFlags' => $page->feature_flags ?? []
        ]);
    }
}
