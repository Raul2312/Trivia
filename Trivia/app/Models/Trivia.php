<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trivia extends Model
{
    protected $table = 'trivias';

    protected $fillable = [
        'user_id',
        'categoria_id',
        'fecha',
        'puntaje',
        'tiempo_total',
    ];

    // Relación con el usuario
    public function user() {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    // Relación con la categoría
    public function categoria() {
        return $this->belongsTo(\App\Models\Categoria::class, 'categoria_id');
    }
}

