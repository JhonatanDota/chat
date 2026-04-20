import { AxiosResponse } from "axios";

import { ConversationPreviewModel } from "../models/conversationModels";
import { requester } from "./config";

const CONVERSATIONS: string = "conversations";

export async function conversationsPreview(): Promise<
  AxiosResponse<ConversationPreviewModel[]>
> {
  return await requester().get(CONVERSATIONS);
}
