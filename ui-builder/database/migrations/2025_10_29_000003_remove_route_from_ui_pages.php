<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ui_pages', function (Blueprint $table) {
            $table->dropColumn('route');
        });
    }

    public function down(): void
    {
        Schema::table('ui_pages', function (Blueprint $table) {
            $table->string('route', 255)->nullable()->index();
        });
    }
};
