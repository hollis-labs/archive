<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->json('fields_json')->nullable()->after('capabilities_json');
            $table->json('relations_json')->nullable()->after('fields_json');
            $table->json('config_json')->nullable()->after('relations_json');
            $table->json('metadata_json')->nullable()->after('config_json');
            $table->boolean('enabled')->default(true)->after('metadata_json');
        });
    }

    public function down(): void
    {
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->dropColumn([
                'fields_json',
                'relations_json',
                'config_json',
                'metadata_json',
                'enabled',
            ]);
        });
    }
};
