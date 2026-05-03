import { useQuery } from "@tanstack/react-query";

import { MessageModel } from "../models/conversationModels";
import { CursorPaginationResponseModel } from "../models/paginationModels";
import { conversationMessages } from "../requests/conversationRequests";
import { handleErrors } from "../requests/handleErrors";

export function useConversationMessages(conversationId: string) {
  return useQuery<CursorPaginationResponseModel<MessageModel>>({
    queryKey: ["conversationMessages", conversationId],
    queryFn: async () => {
      try {
        const response = await conversationMessages(conversationId);

        return response.data;
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
}
