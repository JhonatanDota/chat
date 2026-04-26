<?php

namespace App\Repositories;

use App\Models\Conversation;

class ConversationRepository
{
    public function getPaginatedMessagesByConversation(Conversation $conversation)
    {
        return $conversation->messages()->cursorPaginate(10);
    }
}
