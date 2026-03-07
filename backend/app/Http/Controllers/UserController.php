<?php

namespace App\Http\Controllers;


use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

use App\Repositories\UserRepository;

use App\Http\Resources\User\PublicUserResource;

class UserController extends Controller
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function show(string $identifier): JsonResponse
    {
        $user = is_numeric($identifier) ? $this->userRepository->find($identifier) : $this->userRepository->findByUsername($identifier);

        if (is_null($user) || $user->id === Auth::user()->id) {
            return response()->json(status: Response::HTTP_NOT_FOUND);
        }

        return response()->json(new PublicUserResource($user));
    }
}
