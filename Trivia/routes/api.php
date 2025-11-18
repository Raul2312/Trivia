<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\TriviaController;
use App\Http\Controllers\AuthController;

Route::post('/login',[AuthController::class,'login']);

Route::middleware("jwt.auth")->group(function(){

Route::resource('categorias',CategoriaController::class);
Route::resource('preguntas',PreguntaController::class);
Route::resource('respuestas',RespuestaController::class);
Route::resource('trivia',TriviaController::class);

});