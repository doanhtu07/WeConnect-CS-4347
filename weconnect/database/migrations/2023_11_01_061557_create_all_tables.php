<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // NOTE: Default password for users are "asdf"

        $file_path = database_path('sql/create.sql');

        if (file_exists($file_path)) {
            DB::unprepared(
                file_get_contents($file_path)
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('fk_author');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('fk_user');
            $table->dropForeign('fk_post');
        });

        Schema::table('follows', function (Blueprint $table) {
            $table->dropForeign('fk_follower');
            $table->dropForeign('fk_followee');
        });

        Schema::dropIfExists('users');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('follows');
    }
};
