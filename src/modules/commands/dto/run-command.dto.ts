import { z } from "zod";

export const commandAuthorSchema = z.object({
  bot: z.boolean(),
  id: z.string(),
});

export const runCommandDtoSchema = z
  .object({
    author: commandAuthorSchema,
    commandName: z.string(),
    guildId: z.string(),
    channelId: z.string(),
  })
  .strict();

export type RunCommandDto = z.infer<typeof runCommandDtoSchema>;
export type CommandAuthor = z.infer<typeof commandAuthorSchema>;
