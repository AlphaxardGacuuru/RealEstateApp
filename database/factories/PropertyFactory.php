<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Property;
use Faker\Generator as Faker;

$factory->define(Property::class, function (Faker $faker) {
    return [
        "images" => "property/1.jpg",
        "name" => $faker->company,
        "bedroom" => $faker->numberBetween(1, 5),
        "price" => $faker->numberBetween(10000, 50000),
        "location" => $faker->streetName(),
		"description" => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});
