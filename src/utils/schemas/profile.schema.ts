import { z } from 'zod';

export const editProfileSchema = z.object({
  username: z.string().min(1),
  fullName: z.string().min(1),
  bio: z.string().min(1),
  avatar: z.string().optional(),
});

export type editProfileSchemaDTO = z.infer<typeof editProfileSchema>;
