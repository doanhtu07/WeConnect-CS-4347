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

Route::post('/make-post', function (Request $request) {
    $requestData = $request->input('data');

    if ($requestData && is_array($requestData) && isset($requestData['id'], $requestData['title'], $requestData['content'])) {
        $authorId = intval($requestData['id']);
        $title = $requestData['title'];
        $content = $requestData['content'];
        $sql = "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)";
    
        Log::info($request . "HERE \n");
        Log::info($sql . "\n");

        $results = DB::insert($sql, [$title, $content, $authorId]);

        Log::info(json_encode($results, JSON_PRETTY_PRINT) . "\n");

        return response()->json(['success' => true]);
    } else {
        return response()->json(['error' => 'Invalid or missing data'], 400);
    }
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

Route::get('/get-all-posts', function () {
    $sql = "select posts.id AS postId, users.id AS authorId, users.name AS authorName, title, content
            from weconnect.posts JOIN weconnect.users ON posts.authorId = users.id";

    Log::info($sql . "\n");

    $results = DB::select($sql);
    for ($i = 0; $i < count($results); $i++) {
        $results[$i]->comments = DB::select("select users.name AS authorName, comments.content from comments
                                                    JOIN users ON comments.userId = users.id
                                                    where comments.postId = {$results[$i]->postId}");
    }

    Log::info(json_encode($results, JSON_PRETTY_PRINT) . "\n");
    return response(json_encode($results, JSON_PRETTY_PRINT));
});
