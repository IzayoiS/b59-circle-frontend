import { z } from 'zod';

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: 'Full Name must be at least 4 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  username: z
    .string()
    .min(4, { message: 'Username must contain at least 4 characters' })
    .max(12, { message: 'Username cannot be longer than 12 characters' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters long' }),
});

export type RegisterSchemaDTO = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters long' }),
});

export type LoginSchemaDTO = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
});

export type ForgotPasswordSchemaDTO = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordScema = z
  .object({
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordScemaDTO = z.infer<typeof ResetPasswordScema>;
