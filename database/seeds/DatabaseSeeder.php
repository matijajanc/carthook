<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Country::insert([
            ['country_code' => 'SI', 'country_name' => 'Slovenia'],
            ['country_code' => 'US', 'country_name' => 'United States']
        ]);

        \App\PlayingPosition::insert([
            ['name' => 'Guard'],
            ['name' => 'Forward'],
            ['name' => 'Center'],
        ]);

        \App\Season::insert([
            ['season_year' => '2015-16'],
            ['season_year' => '2017-17'],
            ['season_year' => '2017-18']
        ]);


        // Fake Data
        factory(App\Player::class, 5)->create()->each(function($p) {
            $p->teams()->save(factory(App\Team::class)->make());
            $p->seasons()->attach(3);
        });

        $teams = \App\Team::get();
        foreach ($teams as $team) {
            $team->seasons()->attach(3, ['wins' => rand(0, 99), 'losses' => rand(0, 99)]);
        }
        
        $games = factory(\App\Game::class, 3)->create();
        foreach($games as $game) {
            $game->players()->attach(rand(1, 5), ['points' => rand(0, 50), 'rebounds' => rand(0, 20), 'assists' => rand(0, 20), 'blocks' => rand(0, 20), 'steals' => rand(0, 20), 'minutes' => rand(0, 20)]);
        }
    }
}
