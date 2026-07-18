import { useQuery } from "@tanstack/react-query";

import { meQueryOptions } from "../queries/authQueries";

export function useMe() {
  return useQuery(meQueryOptions);
}
