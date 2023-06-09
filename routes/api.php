<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Auth::routes();

Route::middleware("auth:sanctum")->get("auth", "UserController@auth");

Route::apiResources([
    "users" => "UserController",
    "property" => "PropertyController",
]);

Route::post('propertyImages', 'PropertyController@propertyImages');
