<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trivia;

class TriviaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $data = Trivia::with(['user','categoria'])->get();
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
            'user_id'=> 'required|string|min:2',
            'categoria_id'  => 'required|string|min:2',
            'fecha'  => 'required|date',
            'puntaje'  => 'required|numeric|min:1',
            'tiempo_total'  => 'required|integer|min:1',
        ]);
        $validated['user_id']=Auth::user()->id;
        $data = Trivia::create($validated);
         return response()->json([
            "status"=>"ok",
            "message"=>"Datos Insertados Correctamente",
            "data"=>$data

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
      $data = Trivia::find($id);
        if($data){
            return response()->json([
            "status"=>"ok",
            "message"=>"Trivia encontrada",
            "data"=>$data
            

        ]);
        }
         return response()->json([
            "status"=>"error",
            "message"=>"Trivia no encontrada"
            

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
            'user_id'=> 'required|string|min:2',
            'categoria_id'  => 'required|string|min:2',
            'fecha'  => 'required|date',
            'puntaje'  => 'required|numeric|min:1',
            'tiempo_total'  => 'required|integer|min:1',
        ]);
        $data= Trivia::findOrFail($id);
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
            $data = Trivia::find($id);
        if($data){
            $data->delete();
        }
         return response()->json([
            "status"=>"ok",
            "message"=>"Datos eliminados Correctamente"
            

        ]);
    }
}
