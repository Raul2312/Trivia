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

      public function preguntas(){
        return $this->hasOne(Pregunta::class,'id','pregunta_id');
    }
}
