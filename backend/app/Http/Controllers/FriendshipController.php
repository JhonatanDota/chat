<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Friendship\CreateFriendshipRequest;

use App\Repositories\FriendshipRequestRepository;

use App\Http\Resources\FriendshipRequestResource;

class FriendshipController extends Controller
{
    private FriendshipRequestRepository $friendshipRequestRepository;

    public function __construct(FriendshipRequestRepository $friendshipRequestRepository)
    {
        $this->friendshipRequestRepository = $friendshipRequestRepository;
    }

    public function request(CreateFriendshipRequest $request)
    {
        $data = [
            ...$request->validated(),
            'from_user_id' => Auth::user()->id
        ];

        $friendshipRequest = $this->friendshipRequestRepository->create($data);

        return response()->json(new FriendshipRequestResource($friendshipRequest), Response::HTTP_CREATED);
    }
}
