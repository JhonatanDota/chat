import { useQuery } from "@tanstack/react-query";

import { PublicUserModel } from "../models/userModels";
import { getUser } from "../requests/userRequests";

export function useFindUser(username?: string) {
  return useQuery<PublicUserModel>({
    queryKey: ["user", username],
    queryFn: async () => {
      const response = await getUser(username!);

      return response.data;
    },
    enabled: !!username,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
