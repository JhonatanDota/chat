<?php

namespace App\Repositories;

use App\Models\User;

class FriendshipRepository
{
    public function getFriendsByUser(User $user)
    {
        return $user->friends()->get();
    }
}
