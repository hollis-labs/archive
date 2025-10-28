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
        Schema::dropIfExists('fe_ui_registry');
        Schema::dropIfExists('fe_ui_feature_flags');
    }

    public function down(): void
    {
        Schema::create('fe_ui_feature_flags', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_enabled')->default(false);
            $table->integer('percentage')->nullable();
            $table->json('conditions')->nullable();
            $table->json('metadata')->nullable();
            $table->string('environment')->nullable();
            $table->timestamps();
        });

        Schema::create('fe_ui_registry', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('version')->default('1.0.0');
            $table->string('reference_type')->nullable();
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->json('metadata')->nullable();
            $table->string('hash')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('type');
            $table->index('is_active');
            $table->index(['reference_type', 'reference_id']);
        });
    }
};
