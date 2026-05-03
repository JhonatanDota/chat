<?php

namespace Tests\Feature\Conversation;

use Tests\TestCase;

use App\Models\Message;
use App\Models\Friendship;

use App\Http\Resources\ConversationResource;

class ConversationListTest extends TestCase
{
    public function testTryListConversationsRouteNotLogged()
    {
        $response = $this->json('GET', 'api/conversations');

        $response->assertUnauthorized();
    }

    public function testListConversationsWithoutFriendship()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/conversations');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testListConversations()
    {
        $this->actingAs($this->user);

        $friendships = Friendship::factory(2)->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('GET', 'api/conversations');

        $response->assertOk();
        $response->assertExactJson(
            ConversationResource::collection($friendships)->response()->getData(true)
        );
    }

    public function testListConversationsLastMessage()
    {
        $this->actingAs($this->user);

        $friendship = Friendship::factory()->create([
            'user_id' => $this->user->id,
        ]);

        [$_, $secondMessage] = Message::factory(2)->create([
            'conversation_id' => $friendship->conversation_id,
            'user_id' => $this->user->id,
        ]);


        $response = $this->json('GET', 'api/conversations');
        $lastMessage = $response->json()[0]['last_message'];

        $response->assertOk();
        $this->assertEquals($lastMessage['id'], $secondMessage->id);
    }

    public function testListConversationsIsMineMessage()
    {
        $this->actingAs($this->user);

        [$firstFriendship, $secondFriendship] = Friendship::factory(2)->create([
            'user_id' => $this->user->id,
        ]);

        Message::factory()->create([
            'user_id' => $secondFriendship->friend_id,
            'conversation_id' => $secondFriendship->conversation_id,
        ]);

        Message::factory()->create([
            'user_id' => $this->user->id,
            'conversation_id' => $firstFriendship->conversation_id,
        ]);

        $response = $this->json('GET', 'api/conversations?mine=true');
        [$firstConversation, $secondConversation] = $response->json();

        $response->assertOk();

        $this->assertEquals($firstConversation['id'], $firstFriendship->conversation_id);
        $this->assertEquals($secondConversation['id'], $secondFriendship->conversation_id);

        $this->assertTrue($firstConversation['last_message']['is_mine']);
        $this->assertFalse($secondConversation['last_message']['is_mine']);
    }

    public function testListConversationsOrderedByLastMessage()
    {
        $this->actingAs($this->user);

        [$friendshipOlderMessage, $friendshipLastMessage, $friendshipWithoutMessage] = Friendship::factory(3)->create(['user_id' => $this->user->id]);

        Message::factory()->create([
            'conversation_id' => $friendshipOlderMessage->conversation_id,
        ]);

        Message::factory()->create([
            'conversation_id' => $friendshipLastMessage->conversation_id,
        ]);

        $response = $this->json('GET', 'api/conversations');
        $response->assertOk();

        $data = $response->json();

        // The first must be the conversation with the last message
        $this->assertEquals($friendshipLastMessage->conversation_id, $data[0]['id']);

        // The second must be the conversation with message older than the last
        $this->assertEquals($friendshipOlderMessage->conversation_id, $data[1]['id']);

        // The third must be the conversation with no message
        $this->assertEquals($friendshipWithoutMessage->conversation_id, $data[2]['id']);
    }
}
