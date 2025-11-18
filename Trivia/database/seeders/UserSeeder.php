<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
 
class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Luis Valverde',
            'email' => 'luis@valverde.com',
            'password' => Hash::make('123456'),
        ]);
          DB::table('users')->insert([
            'name' => 'Raul Madrid',
            'email' => 'raulmadridflores202@gmail.com',
            'password' => Hash::make('123'),
        ]);
           DB::table('users')->insert([
            'name' => 'Sebastian Flores',
            'email' => 'sebastian@flores',
            'password' => Hash::make('123456'),
        ]);
    }
}