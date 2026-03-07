import { FriendshipRequestStatusEnum } from "../enums/friendshipRequestEnum";

export type CheckFriendshipModel = {
  isFriend: boolean;
  hasPendingFriendshipRequest: boolean;
};

export type RequestFriendshipModel = {
  toUserId: number;
};

export type FriendshipRequestModel = {
  id: number;
  fromUserId: number;
  toUserId: number;
  status: FriendshipRequestStatusEnum;
  respondedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
