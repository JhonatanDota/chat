<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DevelopmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Juninho',
            'username' => 'junin_99',
            'email' => 'juninho@email.com',
            'password' => Hash::make('juninho99'),
        ]);
    }
}
