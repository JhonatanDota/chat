import { useQuery } from "@tanstack/react-query";

import { CheckFriendshipModel } from "../models/friendshipModels";
import { checkFriendship } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

export function useCheckFriendship(id: number) {
  return useQuery<CheckFriendshipModel>({
    queryKey: ["checkFriendship", id],
    queryFn: async () => {
      try {
        const response = await checkFriendship(id);

        return response.data;
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}
