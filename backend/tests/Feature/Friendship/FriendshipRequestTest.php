<?php

namespace Tests\Feature\Friendship;

use Tests\TestCase;

use App\Enums\FriendshipRequestStatusEnum;

use App\Http\Resources\FriendshipRequestResource;

use App\Models\User;
use App\Models\FriendshipRequest;

class FriendshipRequestTest extends TestCase
{
    public function testTryAccessFriendshipRequestRouteNotLogged()
    {
        $response = $this->json('POST', 'api/friendship-requests/');

        $response->assertUnauthorized();
    }

    public function testTrySendFriendshipRequestToNonexistentUser()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/friendship-requests/', [
            'to_user_id' => 0,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'to_user_id' => ['O usuário informado não existe.'],
        ]);
    }

    public function testTrySendFriendshipRequestToYourself()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/friendship-requests/', [
            'to_user_id' => $this->user->id,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'to_user_id' => ['Não é possível enviar uma solicitação de amizade para você mesmo.'],
        ]);
    }

    public function testTrySendFriendshipRequestWhenAlreadyHasPendingRequest()
    {
        $this->actingAs($this->user);

        $friendshipPendingRequest = FriendshipRequest::factory()->create([
            'from_user_id' => $this->user->id
        ]);

        $response = $this->json('POST', 'api/friendship-requests/', [
            'to_user_id' => $friendshipPendingRequest->to_user_id,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'to_user_id' => ['Você já possui uma solicitação de amizade pendente com esse usuário.'],
        ]);
    }

    public function testSendFriendshipRequestSuccessfully()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/friendship-requests/', [
            'to_user_id' => User::factory()->create()->id,
        ]);
        $responseData = $response->json();

        $response->assertCreated();
        $response->assertExactJson(FriendshipRequestResource::make(FriendshipRequest::find($responseData['id']))->resolve());
        $response->assertJson([
            'status' => FriendshipRequestStatusEnum::PENDING->value
        ]);

        $this->assertDatabaseHas(
            FriendshipRequest::class,
            ['id' => $responseData['id']]
        );
    }
}
