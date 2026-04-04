<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Friendship;;

class FriendshipRepository
{
    public function getFriendsByUser(User $user)
    {
        return $user->friends()->get();
    }

    public function makeFriends(int $userA, int $userB)
    {
        Friendship::makeFriends($userA, $userB);
    }
}
