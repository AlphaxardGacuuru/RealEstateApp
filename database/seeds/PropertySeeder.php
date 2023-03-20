<?php

use App\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Property::class, 10)
            ->create(["user_id" => User::all()->random()->id]);
    }
}