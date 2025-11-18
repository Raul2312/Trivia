<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Respuesta;

class RespuestaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          $data = Respuesta::with(['preguntas'])->get();
        return response()->json([
            "status"=>"ok",
            "data"=>$data


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
          $validated= $request->validate([
            'pregunta_id'         => 'required|string|min:2',
            'respuesta'  => 'required|string|min:2',
            'es_correcto'  => 'required|boolean',
        ]);
        $validated['user_id']=Auth::user()->id;
        $data = Respuesta::create($validated);
         return response()->json([
            "status"=>"ok",
            "message"=>"Datos Insertado Correctamente",
            "data"=>$data

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
          $data = Respuesta::find($id);
        if($data){
            return response()->json([
            "status"=>"ok",
            "message"=>"Respuesta encontrada",
            "data"=>$data
            

        ]);
        }
         return response()->json([
            "status"=>"error",
            "message"=>"Respuesta no encontrada"
            

        ],400);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
          $validated= $request->validate([
                'pregunta_id' => 'required|string|min:2',
                'respuesta'  => 'required|string|min:2',
                'es_correcto'  => 'required|boolean',
        ]);
        $data= Respuesta::findOrFail($id);
        $data -> update($validated);
      //  $data = Account::update($validated);
         return response()->json([
            "status"=>"ok",
            "message"=>"Datos actualizados Correctamente",
            "data"=>$data

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $data = Respuesta::find($id);
        if($data){
            $data->delete();
        }
         return response()->json([
            "status"=>"ok",
            "message"=>"Datos eliminados Correctamente"
            

        ]);
    }
}
