import { useQuery } from "@tanstack/react-query";

import { PublicUserModel } from "../models/userModels";
import { handleErrors } from "../requests/handleErrors";
import { getUser } from "../requests/userRequests";

export function useFindUser(identifier?: string | number) {
  return useQuery<PublicUserModel>({
    queryKey: ["findUser", identifier],
    queryFn: async () => {
      try {
        const response = await getUser(identifier!);

        return response.data;
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },
    enabled: !!identifier,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
