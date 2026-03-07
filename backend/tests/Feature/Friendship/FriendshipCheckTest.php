<?php

namespace Tests\Feature\Friendship;

use Tests\TestCase;

use App\Models\User;
use App\Models\Friendship;
use App\Models\FriendshipRequest;

class FriendshipCheckTest extends TestCase
{
    public function testTryCheckFriendshipRouteNotLogged()
    {
        $user = User::factory()->create();

        $response = $this->json('GET', 'api/friendships/check/' . $user->id);

        $response->assertUnauthorized();
    }

    public function testTryCheckFriendshipWithUnknownUser()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/friendships/check/' . 0);

        $response->assertNotFound();
    }

    public function testCheckFriendshipWithNotFriend()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        $response = $this->json('GET', 'api/friendships/check/' . $user->id);

        $response->assertJson([
            'is_friend' => false,
        ]);
    }

    public function testCheckFriendshipWithFriend()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        Friendship::makeFriends($this->user->id, $user->id);

        $response = $this->json('GET', 'api/friendships/check/' . $user->id);

        $response->assertJson([
            'is_friend' => true,
        ]);
    }

    public function testCheckFriendshipWithPendingFriendshipRequestSent()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id,
            'to_user_id' => $user->id,
        ]);

        $response = $this->json('GET', 'api/friendships/check/' . $user->id);

        $response->assertJson([
            'has_pending_friendship_request' => true,
        ]);
    }

    public function testCheckFriendshipWithPendingFriendshipRequestReceived()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        FriendshipRequest::factory()->create([
            'from_user_id' => $user->id,
            'to_user_id' => $this->user->id,
        ]);

        $response = $this->json('GET', 'api/friendships/check/' . $user->id);

        $response->assertJson([
            'has_pending_friendship_request' => true,
        ]);
    }
}
