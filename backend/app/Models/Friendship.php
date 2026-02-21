<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'friend_id',
    ];

    // =========================================================================
    // Helpers
    // =========================================================================

    public static function makeFriends(int $userA, int $userB)
    {
        static::create([
            'user_id' => $userA,
            'friend_id' => $userB,
        ]);

        static::create([
            'user_id' => $userB,
            'friend_id' => $userA,
        ]);
    }
}
