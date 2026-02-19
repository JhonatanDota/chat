<?php

namespace App\Repositories;

use App\Models\FriendshipRequest;

class FriendshipRequestRepository
{
    public function create(array $data): FriendshipRequest
    {
        return FriendshipRequest::create($data)->refresh();
    }
}
