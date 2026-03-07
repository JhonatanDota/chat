<?php

namespace Tests\Feature\Friendship;

use App\Enums\FriendshipRequestStatusEnum;
use Tests\TestCase;

use App\Models\FriendshipRequest;

class FriendshipRespondTest extends TestCase
{
    public function testTryAccessRespondFriendshipRequestRouteNotLogged()
    {
        $friendshipRequest = FriendshipRequest::factory()->create();

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/');

        $response->assertUnauthorized();
    }

    public function testTryRespondFriendshipRequestAsAnotherUser()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create();

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/');

        $response->assertForbidden();
    }

    public function testTryRespondFriendshipRequestAsRequester()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id
        ]);

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/');

        $response->assertForbidden();
    }

    public function testTryRespondFriendshipRequestAlreadyResponded()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->accepted()->create([
            'to_user_id' => $this->user->id,
        ]);

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/', [
            'status' => FriendshipRequestStatusEnum::ACCEPTED->value,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'to_user_id' => ['Essa solicitação de amizade já foi respondida.'],
        ]);
    }

    public function testTryRespondFriendshipRequestWithoutStatusField()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create([
            'to_user_id' => $this->user->id
        ]);

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/');

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'status' => ['O campo status é obrigatório.'],
        ]);
    }

    public function testRespondFriendshipRequestWithDeclinedStatus()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create([
            'to_user_id' => $this->user->id
        ]);

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/', [
            'status' => FriendshipRequestStatusEnum::DECLINED->value,
        ]);

        $response->assertNoContent();

        // When responded as DECLINED, the friendship should not be created

        $this->assertDatabaseMissing('friendships', [
            'user_id' => $friendshipRequest->to_user_id,
            'friend_id' => $friendshipRequest->from_user_id,
        ]);

        $this->assertDatabaseMissing('friendships', [
            'user_id' => $friendshipRequest->from_user_id,
            'friend_id' => $friendshipRequest->to_user_id,
        ]);
    }

    public function testRespondFriendshipRequestWithAcceptedStatus()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create([
            'to_user_id' => $this->user->id
        ]);

        $response = $this->json('POST', 'api/friendship-requests/' . $friendshipRequest->id . '/respond/', [
            'status' => FriendshipRequestStatusEnum::ACCEPTED->value,
        ]);

        $response->assertNoContent();

        // When responded as ACCEPTED, the friendship should be created

        $this->assertDatabaseHas('friendships', [
            'user_id' => $friendshipRequest->to_user_id,
            'friend_id' => $friendshipRequest->from_user_id,
        ]);

        $this->assertDatabaseHas('friendships', [
            'user_id' => $friendshipRequest->from_user_id,
            'friend_id' => $friendshipRequest->to_user_id,
        ]);
    }
}
