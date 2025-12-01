<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\TriviaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoriasTriviaController;

Route::post('/login',[AuthController::class,'login']);
Route::get('/indexscreen', [CategoriasTriviaController::class, 'categoriasConTrivias']);
Route::resource('categorias',CategoriaController::class);
Route::get('/categorias/{id}', [CategoriasTriviaController::class, 'show']);
Route::resource('trivia',TriviaController::class);
Route::apiResource('trivias', TriviaController::class);
Route::middleware("jwt.auth")->group(function(){

Route::get('/users', [UserController::class, 'index']);
Route::apiResource('users', UserController::class);
Route::apiResource('respuestas', RespuestaController::class);

Route::resource('preguntas',PreguntaController::class);




});