import { z } from "zod";

export const sendMessageSchemaData = z.object({
  content: z.string(),
});

export type SendMessageSchemaType = z.infer<typeof sendMessageSchemaData>;
