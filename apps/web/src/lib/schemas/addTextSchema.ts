import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const addTextSchema = z.object({
	text: z.string().nonempty('Document cannot be empty')
});

export const addTextSchemaAdapter = zod(addTextSchema);

export type AddTextSchema = typeof addTextSchema;
