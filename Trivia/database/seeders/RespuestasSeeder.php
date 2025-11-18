<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
 

class RespuestasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('respuestas')->insert([
            'pregunta_id' => 1,
            'respuesta' => '1939',
            'es_correcto' => true,
        ]);

          DB::table('respuestas')->insert([
            'pregunta_id' => 1,
            'respuesta' => '1942',
            'es_correcto' => false,
        ]);

          DB::table('respuestas')->insert([
            'pregunta_id' => 2,
            'respuesta' => 'Júpiter',
            'es_correcto' => true,
        ]);

         DB::table('respuestas')->insert([
            'pregunta_id' => 2,
            'respuesta' => 'Saturno',
            'es_correcto' => false,
        ]);
    }
}
