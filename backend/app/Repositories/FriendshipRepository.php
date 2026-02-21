<?php

namespace App\Repositories;

use App\Models\Friendship;;

class FriendshipRepository
{
    public function makeFriends(int $userA, int $userB)
    {
        Friendship::makeFriends($userA, $userB);
    }
}
