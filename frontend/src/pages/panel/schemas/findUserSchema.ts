import { z } from "zod";

export const findUserSchemaData = z.object({
  username: z.string(),
});

export type FindUserSchemaType = z.infer<typeof findUserSchemaData>;
