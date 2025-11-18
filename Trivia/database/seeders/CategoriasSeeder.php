<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('categorias')->insert([
            'name' => 'Historia',
            'descripcion' => 'Preguntas relacionadas con historia universal',
        ]);

         DB::table('categorias')->insert([
            'name' => 'Ciencia',
            'descripcion' => 'Preguntas de ciencia general',
        ]);
         DB::table('categorias')->insert([
            'name' => 'Deportes',
            'descripcion' => 'Preguntas relacionadas con deportes',
        ]);
    }
}
