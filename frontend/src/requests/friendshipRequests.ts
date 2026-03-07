import { AxiosResponse } from "axios";

import {
  CheckFriendshipModel,
  FriendshipRequestModel,
  RequestFriendshipModel,
} from "../models/friendshipModels";
import { requester } from "./config";

const FRIENDSHIP_ROUTE = "friendships";

export async function checkFriendship(
  id: number
): Promise<AxiosResponse<CheckFriendshipModel>> {
  return await requester().get(`${FRIENDSHIP_ROUTE}/check/${id}`);
}

export async function requestFriendship(
  data: RequestFriendshipModel
): Promise<AxiosResponse<FriendshipRequestModel>> {
  return await requester().post(`${FRIENDSHIP_ROUTE}/request`, data);
}
