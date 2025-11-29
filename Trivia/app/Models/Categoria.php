<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
      protected $table = 'categorias';

    protected $fillable = [
        'name',
        'descripcion',
    ];

    public function trivias()
{
    return $this->hasMany(Trivia::class);
}
}
