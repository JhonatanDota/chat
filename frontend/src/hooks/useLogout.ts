import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeToken } from "../functions/auth";
import { logout } from "../requests/authRequests";
import { handleErrors } from "../requests/handleErrors";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await logout();
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },

    onSettled: () => {
      removeToken();
      queryClient.clear();
    },
  });
}
