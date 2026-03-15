<?php

namespace App\Repositories;

use App\Models\FriendshipRequest;

class FriendshipRequestRepository
{
    public function create(array $data): FriendshipRequest
    {
        return FriendshipRequest::create($data)->refresh();
    }

    public function update(FriendshipRequest $friendshipRequest, array $data)
    {
        $friendshipRequest->update($data);

        return $friendshipRequest->refresh();
    }

    public function destroy(FriendshipRequest $friendshipRequest)
    {
        return $friendshipRequest->delete();
    }
}
