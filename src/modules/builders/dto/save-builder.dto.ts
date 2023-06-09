import { z } from "zod";

export const saveBuilderSchema = z.object({
  nodes: z.array(z.object({})).optional(),
  edges: z.array(z.object({})).optional(),
  viewport: z.object({
    x: z.number(),
    y: z.number(),
    zoom: z.number(),
  }),
});

export interface SaveBuilderDto extends z.infer<typeof saveBuilderSchema> {
  builderId: string;
}
