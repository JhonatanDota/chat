<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Repositories\FriendshipRepository;
use App\Repositories\ConversationRepository;

use App\Http\Resources\MessageResource;
use App\Http\Resources\ConversationResource;

use App\Models\Conversation;

use App\Http\Pagination\CustomPagination;

class ConversationController extends Controller
{
    use CustomPagination;

    private FriendshipRepository $friendshipRepository;
    private ConversationRepository $conversationRepository;

    public function __construct(FriendshipRepository $friendshipRepository, ConversationRepository $conversationRepository)
    {
        $this->friendshipRepository = $friendshipRepository;
        $this->conversationRepository = $conversationRepository;
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
}
