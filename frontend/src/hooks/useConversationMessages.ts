import { useInfiniteQuery } from "@tanstack/react-query";
import { _undefined } from "zod/v4/core/api.cjs";

import { MessageModel } from "../models/conversationModels";
import { CursorPaginationResponseModel } from "../models/paginationModels";
import { conversationMessages } from "../requests/conversationRequests";
import { handleErrors } from "../requests/handleErrors";

export function useConversationMessages(conversationId: string) {
  return useInfiniteQuery<CursorPaginationResponseModel<MessageModel>>({
    queryKey: ["conversationMessages", conversationId],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      try {
        const cursor = typeof pageParam === "string" ? pageParam : undefined;

        const response = await conversationMessages(conversationId, cursor);

        return response.data;
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursors.next;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
}
