<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [];

    // =========================================================================
    // Relationships
    // =========================================================================

    public function lastMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }
}
