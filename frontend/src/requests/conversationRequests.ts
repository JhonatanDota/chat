import { AxiosResponse } from "axios";

import {
  ConversationPreviewModel,
  MessageModel,
} from "../models/conversationModels";
import { CursorPaginationResponseModel } from "../models/paginationModels";
import { requester } from "./config";

const CONVERSATIONS: string = "conversations";

export async function conversationsPreview(): Promise<
  AxiosResponse<ConversationPreviewModel[]>
> {
  return await requester().get(CONVERSATIONS);
}

export async function conversationMessages(
  conversationId: string,
  cursor?: string
): Promise<AxiosResponse<CursorPaginationResponseModel<MessageModel>>> {
  return await requester().get(`${CONVERSATIONS}/${conversationId}/messages`, {
    params: {
      cursor,
    },
  });
}
