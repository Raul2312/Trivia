<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trivia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TriviaController extends Controller
{
    public function index()
    {
        $trivias = Trivia::with(['user','categoria'])->get();
        return response()->json([
            "status" => "ok",
            "data" => $trivias
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'required|integer|exists:categorias,id',
            'fecha'        => 'required|date',
            'puntaje'      => 'required|numeric|min:0',
            'tiempo_total' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "errors" => $validator->errors()
            ], 422);
        }

        if (!Auth::check()) {
            return response()->json([
                "status" => "error",
                "message" => "Usuario no autenticado"
            ], 401);
        }

        try {
            $data = Trivia::create([
                'user_id' => Auth::id(),
                'categoria_id' => $request->categoria_id,
                'fecha' => $request->fecha,
                'puntaje' => $request->puntaje,
                'tiempo_total' => $request->tiempo_total
            ]);

            return response()->json([
                "status" => "ok",
                "message" => "Trivia creada correctamente",
                "data" => $data
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "Error al crear la trivia",
                "details" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'required|integer|exists:categorias,id',
            'fecha'        => 'required|date',
            'puntaje'      => 'required|numeric|min:0',
            'tiempo_total' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "errors" => $validator->errors()
            ], 422);
        }

        $trivia = Trivia::find($id);
        if (!$trivia) {
            return response()->json([
                "status" => "error",
                "message" => "Trivia no encontrada"
            ], 404);
        }

        try {
            $trivia->update([
                'categoria_id' => $request->categoria_id,
                'fecha' => $request->fecha,
                'puntaje' => $request->puntaje,
                'tiempo_total' => $request->tiempo_total
            ]);

            return response()->json([
                "status" => "ok",
                "message" => "Trivia actualizada correctamente",
                "data" => $trivia
            ]);

        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "Error al actualizar la trivia",
                "details" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $trivia = Trivia::find($id);
        if (!$trivia) {
            return response()->json([
                "status" => "error",
                "message" => "Trivia no encontrada"
            ], 404);
        }

        try {
            $trivia->delete();
            return response()->json([
                "status" => "ok",
                "message" => "Trivia eliminada correctamente"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "Error al eliminar la trivia",
                "details" => $e->getMessage()
            ], 500);
        }
    }
}

