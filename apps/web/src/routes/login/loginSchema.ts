import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	passwordConfirm: z.string().min(6).optional()
});
