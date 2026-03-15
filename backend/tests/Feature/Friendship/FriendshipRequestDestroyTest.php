<?php

namespace Tests\Feature\Friendship;

use Tests\TestCase;

use App\Enums\FriendshipRequestStatusEnum;

use App\Models\FriendshipRequest;

class FriendshipRequestDestroyTest extends TestCase
{
    public function testTryAccessDestroyFriendshipRequestRouteNotLogged()
    {
        $friendshipRequest = FriendshipRequest::factory()->create();

        $response = $this->json('DELETE', 'api/friendship-requests/' . $friendshipRequest->id);

        $response->assertUnauthorized();
    }

    public function testTryDestroyFriendshipRequestWithUnkownFriendshipRequest()
    {
        $this->actingAs($this->user);

        $response = $this->json('DELETE', 'api/friendship-requests/0');

        $response->assertNotFound();
    }

    public function testTryDestroyFriendshipRequestAsAnotherUser()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create();

        $response = $this->json('DELETE', 'api/friendship-requests/' . $friendshipRequest->id);

        $response->assertForbidden();
    }

    public function testTryDestroyFriendshipRequestAsInvitedUser()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create([
            'to_user_id' => $this->user->id
        ]);

        $response = $this->json('DELETE', 'api/friendship-requests/' . $friendshipRequest->id);

        $response->assertForbidden();
    }

    public function testTryDestroyFriendshipRequestNotPending()
    {
        $this->actingAs($this->user);

        // Declined friendship request

        $declinedFriendshipRequest = FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::DECLINED
        ]);

        $response = $this->json('DELETE', 'api/friendship-requests/' . $declinedFriendshipRequest->id);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'friendship_request' => ['A solicitação de amizade já foi respondida e não pode ser excluída.'],
        ]);

        // Accepted friendship request

        $acceptedFriendshipRequest = FriendshipRequest::factory()->accepted()->create([
            'from_user_id' => $this->user->id,
            'status' => FriendshipRequestStatusEnum::ACCEPTED,
        ]);

        $response = $this->json('DELETE', 'api/friendship-requests/' . $acceptedFriendshipRequest->id);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'friendship_request' => ['A solicitação de amizade já foi respondida e não pode ser excluída.'],
        ]);
    }

    public function testDestroyFriendshipRequestSuccessfully()
    {
        $this->actingAs($this->user);

        $friendshipRequest = FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id,
        ]);

        $response = $this->json('DELETE', 'api/friendship-requests/' . $friendshipRequest->id);

        $response->assertNoContent();

        $this->assertDatabaseMissing(FriendshipRequest::class, ['id' => $friendshipRequest->id]);
    }
}
