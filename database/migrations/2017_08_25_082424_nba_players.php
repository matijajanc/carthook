<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NbaPlayers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('country_code', 2);
            $table->string('country_name', 100);
            $table->timestamps();
        });

        Schema::create('playing_positions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('players', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name')->index();
            $table->string('last_name')->index();
            $table->date('date_of_birth');
            $table->integer('playing_position_id')->unsigned();
            $table->float('weight', 5, 2);
            $table->float('height', 5, 2);
            $table->integer('country_id')->unsigned();
            $table->timestamps();

            // Foreign Keys
            $table->foreign('playing_position_id')
                ->references('id')
                ->on('playing_positions');

            $table->foreign('country_id')
                ->references('id')
                ->on('countries');
        });

        Schema::create('teams', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->index();
            $table->integer('country_id')->unsigned();
            $table->timestamps();

            // Foreign Keys
            $table->foreign('country_id')
                ->references('id')
                ->on('countries');
        });

        // Pivot Table
        Schema::create('player_team', function (Blueprint $table) {
            $table->integer('player_id')->unsigned();
            $table->integer('team_id')->unsigned();
            $table->timestamps();

            // Foreign Keys
            $table->foreign('player_id')
                ->references('id')
                ->on('players')
                ->onDelete('cascade');

            $table->foreign('team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade');
        });

        Schema::create('seasons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('season_year');
            $table->timestamps();
        });

        // Pivot Table
        Schema::create('season_team', function (Blueprint $table) {
            $table->integer('season_id')->unsigned();
            $table->integer('team_id')->unsigned();
            $table->integer('wins');
            $table->integer('losses');
            $table->timestamps();

            // Foreign Keys
            $table->foreign('season_id')
                ->references('id')
                ->on('seasons')
                ->onDelete('cascade');

            $table->foreign('team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade');
        });

        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date')->index();
            $table->integer('team_1_id')->unsigned();
            $table->integer('team_1_score');
            $table->integer('team_2_id')->unsigned();
            $table->integer('team_2_score');
            $table->timestamps();

            // Foreign Keys
            $table->foreign('team_1_id')
                ->references('id')
                ->on('teams');

            $table->foreign('team_2_id')
                ->references('id')
                ->on('teams');
        });

        // Pivot Table
        Schema::create('game_player', function (Blueprint $table) {
            $table->integer('player_id')->unsigned();
            $table->integer('game_id')->unsigned();
            $table->integer('points');
            $table->integer('rebounds');
            $table->integer('assists');
            $table->integer('blocks');
            $table->integer('steals');
            $table->integer('minutes');
            $table->timestamps();

            // Foreign Keys
            $table->foreign('player_id')
                ->references('id')
                ->on('players')
                ->onDelete('cascade');

            $table->foreign('game_id')
                ->references('id')
                ->on('games')
                ->onDelete('cascade');
        });

        // Pivot Table
        Schema::create('player_season', function (Blueprint $table) {
            $table->integer('player_id')->unsigned();
            $table->integer('season_id')->unsigned();

            // Foreign Keys
            $table->foreign('player_id')
                ->references('id')
                ->on('players')
                ->onDelete('cascade');

            $table->foreign('season_id')
                ->references('id')
                ->on('seasons')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('players', function(Blueprint $table) {
            $table->dropForeign('players_playing_position_id_foreign');
            $table->dropForeign('players_country_id_foreign');
        });

        Schema::table('teams', function(Blueprint $table) {
            $table->dropForeign('teams_country_id_foreign');
        });

        Schema::table('player_team', function(Blueprint $table) {
            $table->dropForeign('player_team_player_id_foreign');
            $table->dropForeign('player_team_team_id_foreign');
        });

        Schema::table('season_team', function(Blueprint $table) {
            $table->dropForeign('season_team_season_id_foreign');
            $table->dropForeign('season_team_team_id_foreign');
        });

        Schema::table('games', function(Blueprint $table) {
            $table->dropForeign('games_team_1_id_foreign');
            $table->dropForeign('games_team_2_id_foreign');
        });

        Schema::table('game_player', function(Blueprint $table) {
            $table->dropForeign('game_player_player_id_foreign');
            $table->dropForeign('game_player_game_id_foreign');
        });

        Schema::table('player_season', function(Blueprint $table) {
            $table->dropForeign('player_season_player_id_foreign');
            $table->dropForeign('player_season_season_id_foreign');
        });

        Schema::drop('countries');
        Schema::drop('playing_positions');
        Schema::drop('players');
        Schema::drop('teams');
        Schema::drop('player_team');
        Schema::drop('seasons');
        Schema::drop('season_team');
        Schema::drop('games');
        Schema::drop('game_player');
        Schema::drop('player_season');
    }
}
