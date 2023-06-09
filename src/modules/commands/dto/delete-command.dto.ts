import { z } from "zod";

export const deleteCommandDtoSchema = z
  .object({
    builderId: z.string(),
    commandId: z.string(),
  })
  .strict();

export type DeleteCommandDto = z.infer<typeof deleteCommandDtoSchema>;
