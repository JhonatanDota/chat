<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Conversation;

use Illuminate\Auth\Access\HandlesAuthorization;

class ConversationPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Conversation $conversation): bool
    {
        return $user->friendships()->where('conversation_id', $conversation->id)->exists();
    }
}
