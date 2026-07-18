<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'conversation_id' => $this->conversation_id,
            'content' => $this->content,
            'created_at' => $this->created_at,
        ];
    }
}
