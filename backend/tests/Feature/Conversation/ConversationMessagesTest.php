<?php

namespace Tests\Feature\Conversation;

use Tests\TestCase;

use App\Models\Message;
use App\Models\Friendship;
use App\Models\Conversation;

use App\Http\Resources\MessageResource;

class ConversationMessagesTest extends TestCase
{
    public function testTryConversationMessagesRouteNotLogged()
    {
        $conversation = Conversation::factory()->create();

        $response = $this->json('GET', 'api/conversations/' . $conversation->id . '/messages');

        $response->assertUnauthorized();
    }

    public function testTryConversationMessagesWithAnotherUser()
    {
        $this->actingAs($this->user);

        $conversation = Conversation::factory()->create();

        $response = $this->json('GET', 'api/conversations/' . $conversation->id . '/messages');

        $response->assertForbidden();
    }

    public function testConversationMessagesWithoutMessages()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('GET', 'api/conversations/' . $friendship->conversation_id . '/messages');

        $response->assertOk();
        $response->assertExactJson([
            'data' => [],
            'cursors' => [
                'next' => null,
                'prev' => null,
            ]
        ]);
    }

    public function testConversationMessagesWithMessages()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        Message::factory(2)->create([
            'conversation_id' => $friendship->conversation_id,
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('GET', 'api/conversations/' . $friendship->conversation_id . '/messages');

        $response->assertOk();

        $response->assertExactJson([
            'data' => MessageResource::collection($friendship->conversation->messages)->response()->getData(true),
            'cursors' => [
                'next' => null,
                'prev' => null,
            ]
        ]);
    }

    public function testConversationMessagesCursors()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        Message::factory(15)->create([
            'conversation_id' => $friendship->conversation_id,
            'user_id' => $this->user->id,
        ]);

        // Assert next cursor exists and prev is null
        $response = $this->json('GET', 'api/conversations/' . $friendship->conversation_id . '/messages');
        $cursors = $response->json()['cursors'];

        $this->assertNotNull($cursors['next']);
        $this->assertNull($cursors['prev']);

        // Assert prev cursor exists and next is null
        $response = $this->json('GET', 'api/conversations/' . $friendship->conversation_id . '/messages', [
            'cursor' => $cursors['next'],
        ]);
        
        $cursors = $response->json()['cursors'];

        $this->assertNull($cursors['next']);
        $this->assertNotNull($cursors['prev']);
    }
}
