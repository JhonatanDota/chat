<?php

namespace App\Policies;

use App\Models\User;
use App\Models\FriendshipRequest;

use Illuminate\Auth\Access\HandlesAuthorization;

class FriendshipRequestPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can respond a friendship request.
     * Only the user that received the request can respond.
     * 
     * @param  \App\Models\User $user
     * @param  \App\Models\FriendshipRequest $friendshipRequest
     * @return bool
     */
    public function respond(User $user, FriendshipRequest $friendshipRequest): bool
    {
        return $user->id === $friendshipRequest->to_user_id;
    }
}
