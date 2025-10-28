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
        Schema::dropIfExists('fe_type_relations');
        Schema::dropIfExists('fe_type_fields');
        Schema::dropIfExists('fe_types');
    }

    public function down(): void
    {
        Schema::create('fe_types', function (Blueprint $table) {
            $table->id();
            $table->string('alias')->unique();
            $table->string('source_type');
            $table->json('config')->nullable();
            $table->json('capabilities')->nullable();
            $table->json('metadata')->nullable();
            $table->boolean('enabled')->default(true);
            $table->timestamps();
            
            $table->index('alias');
            $table->index('source_type');
            $table->index('enabled');
        });

        Schema::create('fe_type_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fe_type_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type');
            $table->string('label')->nullable();
            $table->boolean('required')->default(false);
            $table->boolean('searchable')->default(false);
            $table->boolean('sortable')->default(false);
            $table->boolean('filterable')->default(false);
            $table->json('validation')->nullable();
            $table->json('metadata')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
            
            $table->index(['fe_type_id', 'name']);
            $table->index('order');
        });

        Schema::create('fe_type_relations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fe_type_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type');
            $table->string('related_type');
            $table->string('foreign_key')->nullable();
            $table->string('local_key')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            
            $table->index(['fe_type_id', 'name']);
        });
    }
};
