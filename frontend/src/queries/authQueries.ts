import { queryOptions } from "@tanstack/react-query";

import { me } from "../requests/authRequests";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: me,
  staleTime: Infinity,
});
