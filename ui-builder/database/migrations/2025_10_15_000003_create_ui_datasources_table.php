<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ui_datasources', function (Blueprint $table) {
            $table->id();
            $table->string('alias')->unique();
            $table->string('model_class')->nullable();
            $table->string('handler')->nullable();
            $table->json('default_params')->nullable();
            $table->json('capabilities')->nullable();
            $table->json('schema')->nullable();
            $table->json('fields')->nullable();
            $table->json('relations')->nullable();
            $table->json('config')->nullable();
            $table->json('metadata')->nullable();
            $table->boolean('enabled')->default(true);
            $table->timestamps();
            
            $table->index('alias');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ui_datasources');
    }
};
