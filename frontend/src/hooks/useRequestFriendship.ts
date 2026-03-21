import { useMutation } from "@tanstack/react-query";

import { requestFriendship } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

export function useRequestFriendship() {
  return useMutation({
    mutationFn: async (toUserId: number) => {
      try {
        await requestFriendship(toUserId);
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
  });
}
