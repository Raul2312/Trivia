<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pregunta;

class PreguntaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          $data = Pregunta::with(['categoria'])->get();
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
            'categoria_id'         => 'required|min:2',   
            'pregunta'  => 'required|string|min:5',
            
        ]);
        $validated['user_id']=Auth::user()->id;
        $data = Pregunta::create($validated);
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
         $data = Pregunta::find($id);
        if($data){
            return response()->json([
            "status"=>"ok",
            "message"=>"Pregunta encontrada",
            "data"=>$data
            

        ]);
        }
         return response()->json([
            "status"=>"error",
            "message"=>"Pregunta no encontrada"
            

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
            'categoria_id'         => 'required|min:2',
            'pregunta'  => 'required|string|min:5',
        ]);
        $data= Pregunta::findOrFail($id);
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
          $data = Pregunta::find($id);
        if($data){
            $data->delete();
        }
         return response()->json([
            "status"=>"ok",
            "message"=>"Datos eliminados Correctamente"
            

        ]);
    }
}
