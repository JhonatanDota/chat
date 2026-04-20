import { useQuery } from "@tanstack/react-query";

import { ConversationPreviewModel } from "../models/conversationModels";
import { conversationsPreview } from "../requests/conversationRequests";
import { handleErrors } from "../requests/handleErrors";

export function useConversationsPreview() {
  return useQuery<ConversationPreviewModel[]>({
    queryKey: ["conversationsPreview"],
    queryFn: async () => {
      try {
        const response = await conversationsPreview();

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
