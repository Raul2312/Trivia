<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
 

class TriviasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('trivias')->insert([
            'user_id'   => 1,
            'categoria_id' => 1,
            'fecha'        => '2025-01-01',
            'puntaje'      => 8.50,
            'tiempo_total' => 120,
        ]);

         DB::table('trivias')->insert([
            'user_id'   => 2,
            'categoria_id' => 2,
            'fecha'        => '2025-01-03',
            'puntaje'      => 6.75,
            'tiempo_total' => 150,
        ]);
    }
}
