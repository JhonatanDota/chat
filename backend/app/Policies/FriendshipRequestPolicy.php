<?php

namespace App\Policies;

use App\Models\User;
use App\Models\FriendshipRequest;

use Illuminate\Auth\Access\HandlesAuthorization;

class FriendshipRequestPolicy
{
    use HandlesAuthorization;

    public function respond(User $user, FriendshipRequest $friendshipRequest): bool
    {
        return $user->id === $friendshipRequest->to_user_id;
    }

    public function destroy(User $user, FriendshipRequest $friendshipRequest): bool
    {
        return $user->id === $friendshipRequest->from_user_id;
    }
}
