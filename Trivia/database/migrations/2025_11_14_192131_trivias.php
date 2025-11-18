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
        Schema::create('trivias', function (Blueprint $table) {
        $table->id();
        $table->date('fecha');
        $table->double('puntaje', 3, 2);
        $table->integer('tiempo_total');
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('categoria_id')->constrained()->onDelete('cascade');
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
