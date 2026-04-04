<?php

namespace Tests\Feature\Friendship;

use Tests\TestCase;

use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Friendship;
use App\Models\FriendshipRequest;

use App\Http\Resources\User\PublicUserResource;

class FriendshipListTest extends TestCase
{
    public function testTryAccessFriendshipListRouteNotLogged()
    {
        $response = $this->json('GET', 'api/friendships');

        $response->assertUnauthorized();
    }

    public function testFriendshipListWithoutFriends()
    {
        $this->actingAs($this->user);

        // Random friendship request to avoid returns data from another users
        Friendship::factory()->create();

        $response = $this->json('GET', 'api/friendships');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testFriendshipListWithFriends()
    {
        $this->actingAs($this->user);

        $friendships = Friendship::factory(2)->create([
            'user_id' => $this->user->id,
        ])->load('friend');

        $friends = $friendships->pluck('friend');

        $response = $this->json('GET', 'api/friendships');

        $response->assertOk();
        $response->assertExactJson(PublicUserResource::collection($friends)->resolve());
    }
}
