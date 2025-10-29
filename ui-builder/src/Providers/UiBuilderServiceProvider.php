<?php

namespace HollisLabs\UiBuilder\Providers;

use Illuminate\Support\ServiceProvider;

class UiBuilderServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/ui-builder.php', 'ui-builder'
        );
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        $this->loadRoutesFrom(__DIR__ . '/../routes/api.php');
        $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');
        
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'ui-builder');
        
        if ($this->app->runningInConsole()) {
            $this->commands([
                \HollisLabs\UiBuilder\Console\Commands\ExportUiPages::class,
                \HollisLabs\UiBuilder\Console\Commands\MakeUiPageCommand::class,
                \HollisLabs\UiBuilder\Console\Commands\MakeUiDataSourceCommand::class,
                \HollisLabs\UiBuilder\Console\Commands\SyncUiPages::class,
            ]);
        }
        
        $this->publishes([
            __DIR__ . '/../config/ui-builder.php' => config_path('ui-builder.php'),
        ], 'ui-builder-config');
        
        $this->publishes([
            __DIR__ . '/../resources/views' => resource_path('views/vendor/ui-builder'),
        ], 'ui-builder-views');
    }
}
