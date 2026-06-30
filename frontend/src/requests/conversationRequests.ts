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
  conversationId: number,
  cursor?: string
): Promise<AxiosResponse<CursorPaginationResponseModel<MessageModel>>> {
  return await requester().get(`${CONVERSATIONS}/${conversationId}/messages`, {
    params: {
      cursor,
    },
  });
}

export async function sendMessage(
  conversationId: number,
  content: string
): Promise<AxiosResponse<MessageModel>> {
  return await requester().post(`${CONVERSATIONS}/${conversationId}/messages`, {
    content,
  });
}
