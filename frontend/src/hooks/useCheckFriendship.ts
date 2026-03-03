import { useQuery } from "@tanstack/react-query";

import { CheckFriendshipModel } from "../models/friendshipModels";
import { checkFriendship } from "../requests/friendshipRequests";

export function useCheckFriendship(id: number) {
  return useQuery<CheckFriendshipModel>({
    queryKey: ["checkFriendship", id],
    queryFn: async () => {
      const response = await checkFriendship(id);

      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}
