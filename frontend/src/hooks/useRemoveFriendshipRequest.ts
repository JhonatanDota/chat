import { useMutation } from "@tanstack/react-query";

import { FriendshipRequestModel } from "../models/friendshipModels";
import { removeFriendship } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

export function useRemoveFriendshipRequest() {
  return useMutation({
    mutationFn: async (friendshipRequest: FriendshipRequestModel) => {
      try {
        await removeFriendship(friendshipRequest.id);
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
  });
}
