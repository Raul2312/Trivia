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
        Schema::create('respuestas', function (Blueprint $table) {
        $table->id();
        $table->string('respuesta', 100);
        $table->boolean('es_correcto');
        $table->foreignId('pregunta_id')->constrained()->onDelete('cascade');
        $table->timestamps();
        
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
