import { AxiosResponse } from "axios";

import {
  CheckFriendshipModel,
  FriendshipRequestModel,
  RequestFriendshipModel,
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
  data: RequestFriendshipModel
): Promise<AxiosResponse<FriendshipRequestModel>> {
  return await requester().post(FRIENDSHIP_REQUEST_ROUTE, data);
}

export function sentFriendship(): Promise<
  AxiosResponse<FriendshipRequestModel[]>
> {
  return requester().get(`${FRIENDSHIP_REQUEST_ROUTE}/sent`);
}

export function removeFriendship(id: number): Promise<AxiosResponse<void>> {
  return requester().delete(`${FRIENDSHIP_REQUEST_ROUTE}/${id}`);
}
