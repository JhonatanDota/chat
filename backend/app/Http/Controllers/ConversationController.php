<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Repositories\FriendshipRepository;

use App\Http\Resources\ConversationResource;

class ConversationController extends Controller
{
    private FriendshipRepository $friendshipRepository;

    public function __construct(FriendshipRepository $friendshipRepository)
    {
        $this->friendshipRepository = $friendshipRepository;
    }

    public function list()
    {
        $friendships = $this->friendshipRepository->getFriendshipsWithConversationLastMessage(Auth::user());

        return ConversationResource::collection($friendships);
    }
}
