<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::all();
        return response()->json([
            "status" => "ok",
            "data" => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|min:2',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        // Encriptar contraseña
        $validated['password'] = bcrypt($validated['password']);

        $data = User::create($validated);

        return response()->json([
            "status" => "ok",
            "message" => "Usuario creado correctamente",
            "data" => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = User::find($id);
        if ($data) {
            return response()->json([
                "status" => "ok",
                "message" => "Usuario encontrado",
                "data" => $data
            ]);
        }

        return response()->json([
            "status" => "error",
            "message" => "Usuario no encontrado"
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name'     => 'required|string|min:2',
            'email'    => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $data = User::findOrFail($id);
        $data->update($validated);

        return response()->json([
            "status" => "ok",
            "message" => "Usuario actualizado correctamente",
            "data" => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = User::find($id);
        if ($data) {
            $data->delete();
        }

        return response()->json([
            "status" => "ok",
            "message" => "Usuario eliminado correctamente"
        ]);
    }
}
