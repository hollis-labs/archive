<?php

namespace HollisLabs\UiBuilder\Support;

use HollisLabs\UiBuilder\Models\Page;
use HollisLabs\UiBuilder\DTOs\PageConfigDTO;
use HollisLabs\UiBuilder\Validators\PageConfigValidator;
use Illuminate\Support\Collection;

/**
 * ConfigService
 * 
 * High-level service for common UI Builder config operations.
 * Provides a clean API for working with page configurations.
 * 
 * TODO: Future enhancements:
 * - Add caching layer for page configs
 * - Add import/export to JSON files
 * - Add config diffing/comparison
 * - Add bulk operations
 * - Add config templating
 * - Add version history tracking
 */
class ConfigService
{
    public function __construct(
        protected PageConfigValidator $validator = new PageConfigValidator()
    ) {}

    /**
     * Get a page config by key
     */
    public function getPage(string $key): ?PageConfigDTO
    {
        $page = Page::where('key', $key)->first();
        
        return $page ? PageConfigDTO::fromPage($page) : null;
    }

    /**
     * Get all enabled pages
     */
    public function getEnabledPages(): Collection
    {
        return Page::where('enabled', true)
            ->get()
            ->map(fn($page) => PageConfigDTO::fromPage($page));
    }

    /**
     * Save a page config (create or update)
     */
    public function savePage(PageConfigDTO $dto): Page
    {
        // Validate before saving
        $errors = $this->validator->validate($dto->config);
        
        if (!empty($errors)) {
            throw new \InvalidArgumentException(
                'Page config validation failed: ' . json_encode($errors)
            );
        }

        return $dto->save();
    }

    /**
     * Delete a page by key
     */
    public function deletePage(string $key): bool
    {
        $page = Page::where('key', $key)->first();
        
        return $page ? $page->delete() : false;
    }

    /**
     * Duplicate a page with a new key
     */
    public function duplicatePage(string $sourceKey, string $newKey, string $newName): PageConfigDTO
    {
        $source = $this->getPage($sourceKey);
        
        if (!$source) {
            throw new \InvalidArgumentException("Source page not found: {$sourceKey}");
        }

        $newConfig = $source->config;
        $newConfig['id'] = $newKey;
        $newConfig['title'] = $newName;

        $newDto = new PageConfigDTO(
            id: $newKey,
            name: $newName,
            config: $newConfig,
            route: null, // Don't copy route
            moduleKey: $source->moduleKey,
            guards: $source->guards,
            enabled: false, // Start disabled
        );

        $this->savePage($newDto);

        return $newDto;
    }

    /**
     * Enable/disable a page
     */
    public function togglePage(string $key, ?bool $enabled = null): Page
    {
        $page = Page::where('key', $key)->firstOrFail();
        
        $page->enabled = $enabled ?? !$page->enabled;
        $page->save();

        return $page;
    }

    /**
     * Get pages by module
     */
    public function getPagesByModule(string $moduleKey): Collection
    {
        return Page::where('module_key', $moduleKey)
            ->get()
            ->map(fn($page) => PageConfigDTO::fromPage($page));
    }

    /**
     * Export a page config to JSON string
     */
    public function exportToJson(string $key, bool $pretty = true): string
    {
        $dto = $this->getPage($key);
        
        if (!$dto) {
            throw new \InvalidArgumentException("Page not found: {$key}");
        }

        return $dto->toJson($pretty ? JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES : 0);
    }

    /**
     * Import a page config from JSON string
     * 
     * TODO: Implement JSON import with validation
     */
    public function importFromJson(string $json): PageConfigDTO
    {
        $data = json_decode($json, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \InvalidArgumentException('Invalid JSON: ' . json_last_error_msg());
        }

        $dto = PageConfigDTO::fromArray($data);
        $this->savePage($dto);

        return $dto;
    }

    /**
     * Clear page config cache
     * 
     * TODO: Implement when caching is added
     */
    public function clearCache(?string $key = null): void
    {
        // TODO: Clear Laravel cache for page configs
    }
}
