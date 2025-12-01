<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriasTriviaController extends Controller
{
   public function categoriasConTrivias()
{
    return Categoria::all(); // SIN WITH()
}
    // 🔥 ESTE ES EL IMPORTANTE
    public function show($id)
{
    $categoria = Categoria::with('trivias.opciones')->find($id);

    if (!$categoria) {
        return response()->json(['error' => 'Categoría no encontrada'], 404);
    }

    return response()->json($categoria);
}
}