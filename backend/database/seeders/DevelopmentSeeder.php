<?php

namespace Database\Seeders;

use App\Models\Friendship;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Message;
use App\Models\FriendshipRequest;

use App\Services\FriendshipService;

class DevelopmentSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Creating users...');

        $password = Hash::make('user123456');

        $users[] = User::factory()->withAvatar()->create([
            'name' => 'Juninho',
            'username' => 'junin_99',
            'email' => 'juninho@email.com',
            'password' => $password,
        ]);

        $users[] = User::factory()->create([
            'name' => 'Jão',
            'username' => 'jao_99',
            'email' => 'jao@email.com',
            'password' => $password,
        ]);

        $this->command->info('Trying to make friends...');

        FriendshipRequest::factory(5)->create([
            'from_user_id' => $users[0]->id,
        ]);

        FriendshipRequest::factory(5)->create([
            'to_user_id' => $users[0]->id,
        ]);

        Friendship::factory(20)->create([
            'user_id' => $users[0]->id,
        ]);

        $this->command->info('Making friends...');

        $friendshipService = new FriendshipService();

        ['conversation' => $conversation, 'friendships' => $friendships] = $friendshipService->createFriendship($users[0]->id, $users[1]->id);

        $this->command->info('Sending some messages...');

        Message::factory(50)->create([
            'conversation_id' => $conversation->id,
            'user_id' => fn() => fake()->randomElement([
                $friendships[0]->user_id,
                $friendships[1]->user_id,
            ]),
        ]);

        $this->command->warn('DONE!');
    }
}
