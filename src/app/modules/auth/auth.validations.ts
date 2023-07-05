import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is Required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'RefreshToken is Required',
    }),
  }),
});

export const LoginValidation = { loginZodSchema, refreshTokenZodSchema };
