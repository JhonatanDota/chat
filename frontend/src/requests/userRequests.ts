import { AxiosResponse } from "axios";

import { PublicUserModel } from "../models/userModels";
import { requester } from "./config";

const USERS_ROUTE = "users";

export async function getUser(
  identifier: number | string
): Promise<AxiosResponse<PublicUserModel>> {
  return await requester().get(`${USERS_ROUTE}/${identifier}`);
}
