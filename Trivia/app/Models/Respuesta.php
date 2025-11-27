<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Respuesta extends Model
{
    protected $table = 'respuestas';

    protected $fillable = [
        'pregunta_id',
        'respuesta',
        'es_correcto',
    ];

    public function pregunta()
    {
        // Una respuesta pertenece a una pregunta
        return $this->belongsTo(Pregunta::class, 'pregunta_id');
    }
}

