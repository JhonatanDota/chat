<?php

namespace Tests\Feature\Conversation;

use Tests\TestCase;

use App\Models\Message;
use App\Models\Friendship;
use App\Models\Conversation;

use App\Rules\Fields\MessageRules;

use App\Http\Resources\MessageResource;

class ConversationCreateMessageTest extends TestCase
{
    public function testTryCreateMessageRouteNotLogged()
    {
        $conversation = Conversation::factory()->create();

        $response = $this->json('POST', 'api/conversations/' . $conversation->id . '/messages');

        $response->assertUnauthorized();
    }

    public function testTryCreateMessageWithAnotherUser()
    {
        $this->actingAs($this->user);

        $conversation = Conversation::factory()->create();

        $response = $this->json('POST', 'api/conversations/' . $conversation->id . '/messages', [
            'content' => $this->faker->sentence(),
        ]);

        $response->assertForbidden();
    }

    public function testSendMessageWithoutContent()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('POST', 'api/conversations/' . $friendship->conversation_id . '/messages');

        $response->assertJsonValidationErrors([
            'content' => 'O campo content é obrigatório.',
        ]);
    }

    public function testSendMessageWithTooShortContent()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('POST', 'api/conversations/' . $friendship->conversation_id . '/messages', [
            'content' => $this->faker->sentence(MessageRules::MIN_LENGTH - 1),
        ]);

        $response->assertJsonValidationErrors([
            'content' => 'O campo content é obrigatório.',
        ]);
    }

    public function testSendMessageWithTooLongContent()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('POST', 'api/conversations/' . $friendship->conversation_id . '/messages', [
            'content' => $this->faker->sentence(MessageRules::MAX_LENGTH + 1),
        ]);

        $response->assertJsonValidationErrors([
            'content' => 'O campo content não pode ter mais que ' . MessageRules::MAX_LENGTH . ' caracteres.',
        ]);
    }

    public function testSendMessageSuccessfully()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('POST', 'api/conversations/' . $friendship->conversation_id . '/messages', [
            'content' => $this->faker->sentence(),
        ]);

        $response->assertCreated();

        $response->assertExactJson(
            MessageResource::make(Message::find($response->json()['id']))->resolve()
        );
    }
}
