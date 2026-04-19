<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\MessageResource;
use App\Http\Resources\User\PublicUserResource;

class ConversationResource extends JsonResource
{
    public function toArray($request)
    {
        $lastMessage = $this->conversation->lastMessage;

        return [
            'id' => $this->conversation_id,
            'user' => new PublicUserResource($this->friend),
            'last_message' => $lastMessage ? new MessageResource($lastMessage) : null,
        ];
    }
}
