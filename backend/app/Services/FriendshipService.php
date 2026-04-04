<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

use App\Models\Friendship;
use App\Models\Conversation;

class FriendshipService
{
    public function createFriendship(int $userA, int $userB)
    {
        DB::transaction(function () use ($userA, $userB) {
            $conversation = Conversation::create();

            Friendship::create([
                'user_id' => $userA,
                'friend_id' => $userB,
                'conversation_id' => $conversation->id,
            ]);

            Friendship::create([
                'user_id' => $userB,
                'friend_id' => $userA,
                'conversation_id' => $conversation->id,
            ]);
        });
    }
}
