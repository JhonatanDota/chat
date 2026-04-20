<?php

namespace Database\Seeders;

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

        $users[] = User::factory()->withAvatar()->create([
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

        $this->command->info('Trying to make friends...');

        FriendshipRequest::factory(5)->create([
            'from_user_id' => $users[0]->id,
        ]);

        FriendshipRequest::factory(5)->create([
            'to_user_id' => $users[0]->id,
        ]);

        $this->command->info('Making friends...');

        $friendshipService = new FriendshipService();

        ['conversation' => $conversation] = $friendshipService->createFriendship($users[0]->id, $users[1]->id);
        $friendshipService->createFriendship($users[0]->id, $users[2]->id);

        $this->command->info('Sending some messages...');

        Message::factory()->create([
            'user_id' => $users[0]->id,
            'conversation_id' => $conversation->id,
        ]);

        Message::factory()->create([
            'user_id' => $users[1]->id,
            'conversation_id' => $conversation->id,
        ]);

        $this->command->warn('DONE!');
    }
}
