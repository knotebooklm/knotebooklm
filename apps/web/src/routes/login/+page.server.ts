import { fail, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';
import { loginSchema } from './loginSchema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	login: async ({ locals, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);
			locals.user = locals.pb.authStore.record;
		} catch {
			return message(form, 'Invalid email or password', { status: 401 });
		}

		throw redirect(303, '/');
	},
	register: async ({ locals, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		form.data.passwordConfirm = form.data.password;

		try {
			await locals.pb.collection('users').create(form.data);
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);
		} catch {
			return setError(form, 'email', 'Cannot create account. Email address already registered.');
		}

		throw redirect(303, '/');
	}
};
