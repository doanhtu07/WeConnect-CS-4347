<?php

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/find-user-by-name', function (Request $request) {
    $userName = $request->input('userName');

    $sql = "select * from users 
            where `name` = '{$userName}'";

    Log::info($sql . "\n");

    $results = DB::select($sql);
    Log::info(json_encode($results, JSON_PRETTY_PRINT) . "\n");

    return response($userName);
});

Route::get('/find-user-by-name-sql-prepare', function (Request $request) {
    $userName = $request->input('userName');

    $sql = "select * from users 
            where `name` = :userName";

    $prepared = DB::getPdo()->prepare($sql);
    $prepared->execute([':userName' => $userName]);

    $results = $prepared->fetchAll();

    Log::info(json_encode($results, JSON_PRETTY_PRINT) . "\n");

    return response($userName);
});

Route::put('/change-user-name', function (Request $request) {
    Log::info(json_encode($request->input('data'), JSON_PRETTY_PRINT));

    $userName = $request->input('data')['userName'];
    $newUserName = $request->input('data')['newUserName'];

    $sql = "update users
            set `name` = '{$newUserName}'
            where `name` = '{$userName}'";

    Log::info($sql . "\n");

    DB::unprepared($sql);

    $results = DB::select("select * from users");
    Log::info(json_encode($results, JSON_PRETTY_PRINT) . "\n");

    return response($userName . " " . $newUserName);
});
