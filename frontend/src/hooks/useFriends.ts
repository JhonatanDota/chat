import { useQuery } from "@tanstack/react-query";

import { PublicUserModel } from "../models/userModels";
import { friends } from "../requests/friendshipRequests";
import { handleErrors } from "../requests/handleErrors";

export function useFriends() {
  return useQuery<PublicUserModel[]>({
    queryKey: ["friends"],
    queryFn: async () => {
      try {
        const response = await friends();

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
