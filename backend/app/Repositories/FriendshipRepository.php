<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Message;

class FriendshipRepository
{
    public function getFriendsByUser(User $user)
    {
        return $user->friends()->get();
    }

    public function getFriendshipsWithConversationLastMessage(User $user)
    {
        return $user->friendships()
            ->with(['friend', 'conversation.lastMessage'])
            ->orderByDesc(
                Message::select('id')
                    ->whereColumn('conversation_id', 'friendships.conversation_id')
                    ->latest()
                    ->limit(1)
            )
            ->get();
    }
}
