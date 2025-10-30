<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ui_components
        Schema::table('ui_components', function (Blueprint $table) {
            $table->renameColumn('schema_json', 'schema');
            $table->renameColumn('defaults_json', 'defaults');
            $table->renameColumn('capabilities_json', 'capabilities');
        });

        // ui_pages
        Schema::table('ui_pages', function (Blueprint $table) {
            $table->renameColumn('config_json', 'config');
            $table->renameColumn('layout_json', 'layout');
        });

        // ui_datasources
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->renameColumn('default_params_json', 'default_params');
            $table->renameColumn('capabilities_json', 'capabilities');
            $table->renameColumn('schema_json', 'schema');
            $table->renameColumn('fields_json', 'fields');
            $table->renameColumn('relations_json', 'relations');
            $table->renameColumn('config_json', 'config');
            $table->renameColumn('metadata_json', 'metadata');
        });

        // ui_actions
        if (Schema::hasTable('ui_actions')) {
            Schema::table('ui_actions', function (Blueprint $table) {
                if (Schema::hasColumn('ui_actions', 'config_json')) {
                    $table->renameColumn('config_json', 'config');
                }
                if (Schema::hasColumn('ui_actions', 'params_json')) {
                    $table->renameColumn('params_json', 'params');
                }
            });
        }

        // ui_modules
        if (Schema::hasTable('ui_modules')) {
            Schema::table('ui_modules', function (Blueprint $table) {
                if (Schema::hasColumn('ui_modules', 'config_json')) {
                    $table->renameColumn('config_json', 'config');
                }
            });
        }

        // ui_themes
        if (Schema::hasTable('ui_themes')) {
            Schema::table('ui_themes', function (Blueprint $table) {
                if (Schema::hasColumn('ui_themes', 'config_json')) {
                    $table->renameColumn('config_json', 'config');
                }
            });
        }
    }

    public function down(): void
    {
        Schema::table('ui_components', function (Blueprint $table) {
            $table->renameColumn('schema', 'schema_json');
            $table->renameColumn('defaults', 'defaults_json');
            $table->renameColumn('capabilities', 'capabilities_json');
        });

        Schema::table('ui_pages', function (Blueprint $table) {
            $table->renameColumn('config', 'config_json');
            $table->renameColumn('layout', 'layout_json');
        });

        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->renameColumn('default_params', 'default_params_json');
            $table->renameColumn('capabilities', 'capabilities_json');
            $table->renameColumn('schema', 'schema_json');
            $table->renameColumn('fields', 'fields_json');
            $table->renameColumn('relations', 'relations_json');
            $table->renameColumn('config', 'config_json');
            $table->renameColumn('metadata', 'metadata_json');
        });

        if (Schema::hasTable('ui_actions')) {
            Schema::table('ui_actions', function (Blueprint $table) {
                if (Schema::hasColumn('ui_actions', 'config')) {
                    $table->renameColumn('config', 'config_json');
                }
                if (Schema::hasColumn('ui_actions', 'params')) {
                    $table->renameColumn('params', 'params_json');
                }
            });
        }

        if (Schema::hasTable('ui_modules')) {
            Schema::table('ui_modules', function (Blueprint $table) {
                if (Schema::hasColumn('ui_modules', 'config')) {
                    $table->renameColumn('config', 'config_json');
                }
            });
        }

        if (Schema::hasTable('ui_themes')) {
            Schema::table('ui_themes', function (Blueprint $table) {
                if (Schema::hasColumn('ui_themes', 'config')) {
                    $table->renameColumn('config', 'config_json');
                }
            });
        }
    }
};
