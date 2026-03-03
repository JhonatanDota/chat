import { useQuery } from "@tanstack/react-query";

import { PublicUserModel } from "../models/userModels";
import { handleErrors } from "../requests/handleErrors";
import { getUser } from "../requests/userRequests";

export function useFindUser(username?: string) {
  return useQuery<PublicUserModel>({
    queryKey: ["user", username],
    queryFn: async () => {
      try {
        const response = await getUser(username!);

        return response.data;
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    enabled: !!username,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
