<?php

namespace Tests\Feature\Friendship;

use Tests\TestCase;

use App\Models\FriendshipRequest;

use App\Enums\FriendshipRequestStatusEnum;

use App\Http\Resources\FriendshipRequestResource;

class FriendshipRequestSentTest extends TestCase
{
    public function testTryAccessFriendshipRequestSentRouteNotLogged()
    {
        $response = $this->json('GET', 'api/friendship-requests/sent');

        $response->assertUnauthorized();
    }

    public function testFriendshipRequestSentWithoutFriendshipRequest()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/friendship-requests/sent');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testFriendshipRequestSentWithoutPendingFriendshipRequest()
    {
        $this->actingAs($this->user);

        FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::ACCEPTED->value,
        ]);

        FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::DECLINED->value,
        ]);

        $response = $this->json('GET', 'api/friendship-requests/sent');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testFriendshipRequestSentWithPendingFriendshipRequest()
    {
        $this->actingAs($this->user);

        $friendshipRequests = FriendshipRequest::factory(2)->create([
            'from_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::PENDING->value,
        ]);

        $response = $this->json('GET', 'api/friendship-requests/sent');

        $response->assertOk();
        $response->assertExactJson(FriendshipRequestResource::collection($friendshipRequests)->resolve());
    }
}
