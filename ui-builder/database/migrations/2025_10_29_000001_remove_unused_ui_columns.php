<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('fe_ui_components', function (Blueprint $table) {
            $table->dropColumn('config');
        });

        Schema::table('fe_ui_pages', function (Blueprint $table) {
            $table->dropColumn(['route', 'meta_json']);
        });

        Schema::table('fe_ui_datasources', function (Blueprint $table) {
            $table->dropColumn(['model_class', 'capabilities']);
        });
    }

    public function down(): void
    {
        Schema::table('fe_ui_components', function (Blueprint $table) {
            $table->json('config')->nullable();
        });

        Schema::table('fe_ui_pages', function (Blueprint $table) {
            $table->string('route')->nullable();
            $table->json('meta_json')->nullable();
        });

        Schema::table('fe_ui_datasources', function (Blueprint $table) {
            $table->string('model_class')->nullable();
            $table->json('capabilities')->nullable();
        });
    }
};
