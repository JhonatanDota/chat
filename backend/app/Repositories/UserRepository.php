<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function create(array $data): User
    {
        return User::create($data);
    }

    public function find(int $id): User | null
    {
        return User::find($id);
    }

    public function findByUsername(string $username): User | null
    {
        return User::where('username', $username)->first();
    }
}
