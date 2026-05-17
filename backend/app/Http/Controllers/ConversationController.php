<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Repositories\MessageRepository;
use App\Repositories\FriendshipRepository;
use App\Repositories\ConversationRepository;

use App\Http\Resources\MessageResource;
use App\Http\Resources\ConversationResource;

use App\Models\Conversation;

use App\Http\Pagination\CustomPagination;

use App\Http\Requests\Message\CreateMessageRequest;

class ConversationController extends Controller
{
    use CustomPagination;

    private FriendshipRepository $friendshipRepository;
    private ConversationRepository $conversationRepository;
    private MessageRepository $messageRepository;

    public function __construct(FriendshipRepository $friendshipRepository, ConversationRepository $conversationRepository, MessageRepository $messageRepository)
    {
        $this->friendshipRepository = $friendshipRepository;
        $this->conversationRepository = $conversationRepository;
        $this->messageRepository = $messageRepository;
    }

    public function list()
    {
        $friendships = $this->friendshipRepository->getFriendshipsWithConversationLastMessage(Auth::user());

        return ConversationResource::collection($friendships);
    }

    public function messages(Conversation $conversation)
    {
        $this->authorize('view', $conversation);

        $messages = $this->conversationRepository->getPaginatedMessagesByConversation($conversation);

        return $this->cursorPaginationWithResource($messages, MessageResource::class);
    }

    public function sendMessage(CreateMessageRequest $request, Conversation $conversation)
    {
        $this->authorize('createMessage', $conversation);

        $data = $request->validated();

        $message = $this->messageRepository->create([
            'user_id' => Auth::user()->id,
            'conversation_id' => $conversation->id,
            'content' => $data['content'],
        ]);

        return MessageResource::make($message);
    }
}
