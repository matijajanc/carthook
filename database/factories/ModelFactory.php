<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(App\Player::class, function ($faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'date_of_birth' => $faker->dateTimeThisCentury->format('Y-m-d'),
        'playing_position_id' => $faker->numberBetween(1, 3),
        'weight' => $faker->numberBetween(170, 300),
        'height' => $faker->numberBetween(170, 240),
        'country_id' => $faker->numberBetween(1, 2)
    ];
});

$factory->define(App\Team::class, function ($faker) {
    return [
        'name' => 'Team '.$faker->firstName,
        'country_id' => $faker->numberBetween(1, 2)
    ];
});

function randomNum(int $min = 1, int $max = 5, int $skipID): int {
    $num = rand($min, $max);
    return ($num === $skipID) ? randomNum($min, $max, $skipID) : $num;
}

$factory->define(App\Game::class, function ($faker) {
    $team1 = $faker->numberBetween(1, 5);
    return [
        'date' => $faker->date('Y-m-d'),
        'team_1_id' => $team1,
        'team_1_score' => $faker->numberBetween(50, 120),
        'team_2_id' => randomNum(1, 5, $team1),
        'team_2_score' => $faker->numberBetween(50, 120)
    ];
});