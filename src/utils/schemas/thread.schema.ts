import { z } from 'zod';

export const createThreadSchema = z.object({
  content: z.string().max(280),
  images: z.any().optional(),
});

export type CreateThreadSchemaDTO = z.infer<typeof createThreadSchema>;
