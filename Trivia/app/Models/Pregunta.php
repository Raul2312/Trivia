<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
     protected $table = 'preguntas';

    protected $fillable = [
        'pregunta_id',
        'categoria_id',
        'pregunta',
    ];


   public function categoria(){
        return $this->hasOne(Categoria::class,'id','categoria_id');
    }
}
