import { z } from 'zod';

export const createReplySchema = z.object({
  // threadId: z.string().uuid(),
  content: z.string().max(280),
  images: z.any().optional(),
});

export type CreateReplySchemaDTO = z.infer<typeof createReplySchema>;
