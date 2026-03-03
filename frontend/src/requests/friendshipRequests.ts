import { AxiosResponse } from "axios";

import { CheckFriendshipModel } from "../models/friendshipModels";
import { requester } from "./config";

const FRIENDSHIP_ROUTE = "friendships";

export async function checkFriendship(
  id: number
): Promise<AxiosResponse<CheckFriendshipModel>> {
  return await requester().get(`${FRIENDSHIP_ROUTE}/check/${id}`);
}
