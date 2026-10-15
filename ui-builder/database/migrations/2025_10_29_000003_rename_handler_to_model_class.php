<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->renameColumn('handler', 'model_class');
        });
    }

    public function down(): void
    {
        Schema::table('ui_datasources', function (Blueprint $table) {
            $table->renameColumn('model_class', 'handler');
        });
    }
};
