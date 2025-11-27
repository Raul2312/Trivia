<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pregunta;

class PreguntaController extends Controller
{
    public function index()
    {
        $data = Pregunta::with('categoria')->get();

        return response()->json([
            "status" => "ok",
            "data"   => $data
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pregunta'     => 'required|string|min:2',
            'categoria_id' => 'required|integer|exists:categorias,id'
        ]);

        // NO AGREGAR user_id, la tabla no tiene ese campo
        $data = Pregunta::create($validated);

        return response()->json([
            "status"  => "ok",
            "message" => "Pregunta creada correctamente",
            "data"    => $data
        ]);
    }

    public function show($id)
    {
        $data = Pregunta::with('categoria')->find($id);

        if (!$data) {
            return response()->json([
                "status"  => "error",
                "message" => "Pregunta no encontrada"
            ], 404);
        }

        return response()->json([
            "status" => "ok",
            "data"   => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'pregunta'     => 'required|string|min:2',
            'categoria_id' => 'required|integer|exists:categorias,id'
        ]);

        $data = Pregunta::findOrFail($id);
        $data->update($validated);

        return response()->json([
            "status"  => "ok",
            "message" => "Pregunta actualizada correctamente",
            "data"    => $data
        ]);
    }

    public function destroy($id)
    {
        $data = Pregunta::find($id);

        if ($data) {
            $data->delete();
        }

        return response()->json([
            "status"  => "ok",
            "message" => "Pregunta eliminada correctamente"
        ]);
    }
}
