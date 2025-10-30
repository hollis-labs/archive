<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->json('fields')->nullable()->after('schema');
            $table->json('relations')->nullable()->after('fields');
            $table->json('config')->nullable()->after('relations');
            $table->json('metadata')->nullable()->after('config');
            $table->boolean('enabled')->default(true)->after('metadata');
        });
    }

    public function down(): void
    {
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->dropColumn(['fields', 'relations', 'config', 'metadata', 'enabled']);
        });
    }
};
