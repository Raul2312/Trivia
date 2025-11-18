<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
 

class PreguntasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('preguntas')->insert([
            'categoria_id' => 1,
            'pregunta' => '¿En qué año inició la Segunda Guerra Mundial?',
        ]);

          DB::table('preguntas')->insert([
            'categoria_id' => 2,
            'pregunta' => '¿Cuál es el planeta más grande del sistema solar?',
        ]);

    }
}
