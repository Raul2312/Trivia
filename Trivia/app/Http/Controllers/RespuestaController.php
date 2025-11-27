<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Respuesta;

class RespuestaController extends Controller
{
    public function index()
    {
        $data = Respuesta::with('pregunta')->get();

        return response()->json([
            "status" => "ok",
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
    'respuesta'  => 'required|string|min:2',
    'es_correcto'   => 'required|boolean',
    'pregunta_id'   => 'required|integer|exists:preguntas,id'
        ]);

        $data = Respuesta::create($validated);

        return response()->json([
            "status" => "ok",
            "message" => "Respuesta guardada correctamente",
            "data" => $data
        ]);
    }

    public function show($id)
    {
        $data = Respuesta::find($id);

        if (!$data) {
            return response()->json([
                "status" => "error",
                "message" => "Respuesta no encontrada"
            ], 404);
        }

        return response()->json([
            "status" => "ok",
            "data" => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'pregunta_id' => 'required|exists:preguntas,id',
            'respuesta'   => 'required|string|min:2',
            'es_correcto' => 'required|boolean',
        ]);

        $data = Respuesta::findOrFail($id);
        $data->update($validated);

        return response()->json([
            "status" => "ok",
            "message" => "Respuesta actualizada correctamente",
            "data" => $data
        ]);
    }

    public function destroy($id)
    {
        $data = Respuesta::find($id);

        if ($data) {
            $data->delete();
        }

        return response()->json([
            "status" => "ok",
            "message" => "Respuesta eliminada correctamente"
        ]);
    }
}
