<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
    protected $table = 'preguntas';

    protected $fillable = [
        'pregunta',
        'categoria_id',
    ];

    public function categoria()
    {
        // Una pregunta pertenece a una categoría
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    public function respuestas()
    {
        // Una pregunta puede tener muchas respuestas
        return $this->hasMany(Respuesta::class);
    }
}

