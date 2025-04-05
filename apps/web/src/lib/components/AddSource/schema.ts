import { z } from 'zod';

export const addTextSchema = z.object({
	text: z.string().nonempty('Document cannot be empty')
});

export type AddTextSchema = typeof addTextSchema;
