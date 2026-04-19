<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray($request)
    {
        $isMine = $this->user_id === $request->user()->id;

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'conversation_id' => $this->conversation_id,
            'content' => $this->content,
            'is_mine' => $isMine,
            'created_at' => $this->created_at,
        ];
    }
}
