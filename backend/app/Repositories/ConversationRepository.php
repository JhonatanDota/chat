<?php

namespace App\Repositories;

use App\Models\Conversation;

class ConversationRepository
{
    public function getPaginatedMessagesByConversation(Conversation $conversation)
    {
        return $conversation->messages()->orderBy('id', 'DESC')->cursorPaginate(10);
    }
}
