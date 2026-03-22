import { useMutation } from "@tanstack/react-query";

import { FriendshipRequestStatusEnum } from "../enums/friendshipRequestEnum";
import { respondFriendshipRequest } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

type RespondFriendshipRequestArgs = {
  id: number;
  status: FriendshipRequestStatusEnum;
};

export function useRespondFriendshipRequest() {
  return useMutation({
    mutationFn: async ({ id, status }: RespondFriendshipRequestArgs) => {
      try {
        await respondFriendshipRequest(id, status);
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
  });
}
