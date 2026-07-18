import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setToken } from "../functions/auth";
import { AuthModel } from "../models/authModels";
import { meQueryOptions } from "../queries/authQueries";
import { auth } from "../requests/authRequests";
import { handleErrors } from "../requests/handleErrors";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AuthModel) => {
      try {
        return await auth(data);
      } catch (error) {
        handleErrors(error);
        throw error;
      }
    },

    onSuccess: async (response) => {
      setToken(response.data.token);

      await queryClient.fetchQuery(meQueryOptions);
    },
  });
}
