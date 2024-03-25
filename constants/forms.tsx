import { z } from "zod";

export const formSchemaBoarding = z.object({
  picture: z.string().url(),
  name: z.string().min(2).max(50),
  portfolio: z.string().url(),
});
