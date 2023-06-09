import { z } from "zod";

export interface CreateBuilderDtoOutput {
  _id: string;
}

export const createBuilderDtoSchema = z
  .object({
    guildId: z.string(),
    commandName: z.string(),
  })
  .strict();

export type CreateBuilderDto = z.infer<typeof createBuilderDtoSchema>;
