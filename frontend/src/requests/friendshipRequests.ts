import { AxiosResponse } from "axios";

import { FriendshipRequestStatusEnum } from "../enums/friendshipRequestEnum";
import {
  CheckFriendshipModel,
  FriendshipRequestModel,
} from "../models/friendshipModels";
import { requester } from "./config";

const FRIENDSHIP_ROUTE = "friendships";
const FRIENDSHIP_REQUEST_ROUTE = "friendship-requests";

export async function checkFriendship(
  id: number
): Promise<AxiosResponse<CheckFriendshipModel>> {
  return await requester().get(`${FRIENDSHIP_ROUTE}/check/${id}`);
}

export async function requestFriendship(
  toUserId: number
): Promise<AxiosResponse<FriendshipRequestModel>> {
  return await requester().post(FRIENDSHIP_REQUEST_ROUTE, { toUserId });
}

export function respondFriendshipRequest(
  id: number,
  status: FriendshipRequestStatusEnum
): Promise<AxiosResponse<void>> {
  return requester().post(`${FRIENDSHIP_REQUEST_ROUTE}/${id}/respond`, {
    status,
  });
}

export function sentFriendship(): Promise<
  AxiosResponse<FriendshipRequestModel[]>
> {
  return requester().get(`${FRIENDSHIP_REQUEST_ROUTE}/sent`);
}

export function receivedFriendship(): Promise<
  AxiosResponse<FriendshipRequestModel[]>
> {
  return requester().get(`${FRIENDSHIP_REQUEST_ROUTE}/received`);
}

export function removeFriendship(id: number): Promise<AxiosResponse<void>> {
  return requester().delete(`${FRIENDSHIP_REQUEST_ROUTE}/${id}`);
}
