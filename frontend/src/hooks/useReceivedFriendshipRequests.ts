import { useQuery } from "@tanstack/react-query";

import { FriendshipRequestModel } from "../models/friendshipModels";
import { receivedFriendship } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

export function useReceivedFriendshipRequests() {
  return useQuery<FriendshipRequestModel[]>({
    queryKey: ["receivedFriendshipRequests"],
    queryFn: async () => {
      try {
        const response = await receivedFriendship();

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
