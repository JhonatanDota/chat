<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Enums\FriendshipRequestStatusEnum;

use App\Models\User;

class FriendshipRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'from_user_id' => User::factory(),
            'to_user_id' => User::factory(),
            'status' => FriendshipRequestStatusEnum::PENDING->value,
        ];
    }
}
