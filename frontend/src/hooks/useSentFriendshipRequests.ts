import { useQuery } from "@tanstack/react-query";

import { FriendshipRequestModel } from "../models/friendshipModels";
import { sentFriendship } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

export function useSentFriendshipRequests() {
  return useQuery<FriendshipRequestModel[]>({
    queryKey: ["sentFriendshipRequests"],
    queryFn: async () => {
      try {
        const response = await sentFriendship();

        return response.data;
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}
