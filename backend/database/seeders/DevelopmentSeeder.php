<?php

namespace Database\Seeders;

use App\Models\Friendship;
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
        $users[] = User::factory()->create([
            'name' => 'Juninho',
            'username' => 'junin_99',
            'email' => 'juninho@email.com',
            'password' => Hash::make('juninho99'),
        ]);

        $users[] = User::factory()->create([
            'name' => 'Jão',
            'username' => 'jao_99',
            'email' => 'jao@email.com',
            'password' => Hash::make('jaozin99'),
        ]);

        $users[] = User::factory()->create([
            'name' => 'Júlia',
            'username' => 'julia_99',
            'email' => 'julia@email.com',
            'password' => Hash::make('julia99'),
        ]);

        Friendship::makeFriends($users[0]->id, $users[1]->id);
    }
}
