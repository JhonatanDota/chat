<?php

namespace Tests\Feature\Friendship;

use Tests\TestCase;

use App\Models\FriendshipRequest;

use App\Enums\FriendshipRequestStatusEnum;

use App\Http\Resources\FriendshipRequestResource;

class FriendshipRequestReceivedTest extends TestCase
{
    public function testTryAccessFriendshipRequestReceivedRouteNotLogged()
    {
        $response = $this->json('GET', 'api/friendship-requests/received');

        $response->assertUnauthorized();
    }

    public function testFriendshipRequestReceivedWithoutFriendshipRequest()
    {
        $this->actingAs($this->user);

        // Random friendship request to avoid returns data from another users
        FriendshipRequest::factory()->create([
            'status' => FriendshipRequestStatusEnum::PENDING->value,
        ]);

        $response = $this->json('GET', 'api/friendship-requests/received');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testFriendshipRequestReceivedWithoutPendingFriendshipRequest()
    {
        $this->actingAs($this->user);

        FriendshipRequest::factory()->create([
            'to_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::ACCEPTED->value,
        ]);

        FriendshipRequest::factory()->create([
            'to_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::DECLINED->value,
        ]);

        $response = $this->json('GET', 'api/friendship-requests/received');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testFriendshipRequestReceivedWithPendingFriendshipRequest()
    {
        $this->actingAs($this->user);

        $friendshipRequests = FriendshipRequest::factory(2)->create([
            'to_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::PENDING->value,
        ]);

        $response = $this->json('GET', 'api/friendship-requests/received');

        $response->assertOk();
        $response->assertExactJson(
            FriendshipRequestResource::collection($friendshipRequests)->resolve()
        );
    }
}
