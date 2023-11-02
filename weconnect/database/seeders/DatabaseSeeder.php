<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // -- https://stackoverflow.com/questions/14127529/import-data-in-mysql-from-a-csv-file-using-load-data-infile
        // -- https://stackoverflow.com/questions/21307464/can-i-import-a-mysql-dump-to-a-laravel-migration
        // -- https://stackoverflow.com/questions/61193211/setting-local-infile-in-config-file-mysql-8
        // -- https://stackoverflow.com/questions/49633881/how-to-do-load-data-local-infile-in-laravel-5-4

        $file_path = database_path('sql/load.sql');
        $app_users_path = database_path('sql/data/app_users.csv');
        $posts_path = database_path('sql/data/posts.csv');
        $comments_path = database_path('sql/data/comments.csv');
        $follows_path = database_path('sql/data/follows.csv');

        $search_names = ['./data/app_users.csv', './data/posts.csv', './data/comments.csv', './data/follows.csv'];
        $replace_names = [$app_users_path, $posts_path, $comments_path, $follows_path];

        $sql_contents = file_get_contents($file_path);

        if ($sql_contents !== false) {
            for ($i = 0; $i < sizeof($search_names); $i++) {
                $sql_contents = str_replace($search_names[$i], $replace_names[$i], $sql_contents);
            }
        }

        print("Load commands: \n" . $sql_contents . "\n\n");

        $sql_cmds = explode("\n", $sql_contents);

        foreach ($sql_cmds as $key => $cmd) {
            if ($cmd === "") {
                continue;
            }
            DB::unprepared($cmd);
        }

        print("Successfully seeded the database!\n");
    }
}
