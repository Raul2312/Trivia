<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\TriviaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/login',[AuthController::class,'login']);
Route::get('/users', [UserController::class, 'index']);
Route::apiResource('users', UserController::class);



Route::middleware("jwt.auth")->group(function(){
Route::apiResource('respuestas', RespuestaController::class);
Route::apiResource('trivias', TriviaController::class);
Route::resource('categorias',CategoriaController::class);
Route::resource('preguntas',PreguntaController::class);
Route::resource('respuestas',RespuestaController::class);
Route::resource('trivia',TriviaController::class);

});