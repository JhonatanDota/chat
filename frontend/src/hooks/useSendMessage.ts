import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendMessage } from "../requests/conversationRequests";
import { handleErrors } from "../requests/handleErrors";

type SendMessageRequestsArgs = {
  conversationId: number;
  content: string;
};

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      content,
    }: SendMessageRequestsArgs) => {
      try {
        return await sendMessage(conversationId, content);
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    onSuccess: (response, variables) => {
      queryClient.setQueryData(
        ["conversationMessages", variables.conversationId],
        (oldData: any) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,

            pages: oldData.pages.map((page: any, index: number) => {
              if (index !== 0) {
                return page;
              }

              return {
                ...page,

                data: [response.data, ...page.data],
              };
            }),
          };
        }
      );
    },
  });
}
