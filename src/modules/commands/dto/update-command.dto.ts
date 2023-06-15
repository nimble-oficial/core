import { DEFAULT_OPTION_VALUES } from "src/shared";
import { z } from "zod";

export const updateCommandDtoSchema = z

  .object({
    name: z
      .string({
        required_error: "Name is required.",
      })
      .min(1, {
        message: "Name is required.",
      })
      .max(20, {
        message: "Name cannot exceed 20 characters.",
      }),
    description: z
      .string()
      .max(100, {
        message: "Description cannot exceed 100 characters.",
      })
      .optional(),
    enabled: z.boolean().default(true),
    allowedChannel: z
      .object({
        id: z
          .string()
          .optional()
          .default(DEFAULT_OPTION_VALUES.allowedChannel.id),
        name: z
          .string()
          .optional()
          .default(DEFAULT_OPTION_VALUES.allowedChannel.name),
      })
      .optional()
      .default(DEFAULT_OPTION_VALUES.allowedChannel),

    allowedRole: z.object({
      id: z.string().optional().default(DEFAULT_OPTION_VALUES.allowedRole.id),
      name: z
        .string()
        .optional()
        .default(DEFAULT_OPTION_VALUES.allowedRole.name),
    }),
    commandId: z.string(),
    guildId: z.string(),
    sendCommandNotEnabledMessage: z.boolean().default(true),
    commandNotEnabledMessage: z
      .string()
      .min(1)
      .max(2000)
      .optional()
      .default("Command is not enabled."),
  })
  .strict();

export type UpdateCommandDto = z.infer<typeof updateCommandDtoSchema>;
