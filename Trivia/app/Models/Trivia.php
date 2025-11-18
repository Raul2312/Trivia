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

      public function user(){
        return $this->hasOne(Categoria::class,'id','user_id');
    }

      public function categoria(){
        return $this->hasOne(Categoria::class,'id','categoria_id');
    }
}
