<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\FriendshipRequest;

use App\Http\Requests\Friendship\CreateFriendshipRequest;
use App\Http\Requests\Friendship\FriendshipRespondRequest;

use App\Repositories\FriendshipRepository;
use App\Repositories\FriendshipRequestRepository;

use App\Http\Resources\FriendshipRequestResource;

use App\Enums\FriendshipRequestStatusEnum;

class FriendshipController extends Controller
{
    private FriendshipRepository $friendshipRepository;
    private FriendshipRequestRepository $friendshipRequestRepository;

    public function __construct(FriendshipRepository $friendshipRepository, FriendshipRequestRepository $friendshipRequestRepository)
    {
        $this->friendshipRepository = $friendshipRepository;
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

    public function respond(
        FriendshipRespondRequest $request,
        FriendshipRequest $friendshipRequest
    ) {
        $status = $request->validated()['status'];

        $data = [
            'status' => $status,
            'responded_at' => now(),
        ];

        if ($status == FriendshipRequestStatusEnum::ACCEPTED->value) {
            $this->friendshipRepository->makeFriends($friendshipRequest->from_user_id, $friendshipRequest->to_user_id);
        }

        $this->friendshipRequestRepository->update($friendshipRequest, $data);

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }

    public function check(User $user)
    {
        /** @var \App\Models\User $authUser */
        $authUser = Auth::user();

        $isFriend = $authUser->friends()->where('friend_id', $user->id)->exists();
        $hasPendingFriendshipRequestSent = $authUser->pendingSendedFriendshipRequests()->where('to_user_id', $user->id)->exists();
        $hasPendingFriendshipRequestReceived = $user->pendingSendedFriendshipRequests()->where('to_user_id', $authUser->id)->exists();

        return response()->json([
            'is_friend' => $isFriend,
            'has_pending_friendship_request' => $hasPendingFriendshipRequestSent || $hasPendingFriendshipRequestReceived,
        ]);
    }

    public function sent()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $sendedPendingRequests = $user->pendingSendedFriendshipRequests()->get();

        return response()->json(FriendshipRequestResource::collection($sendedPendingRequests));
    }
}
