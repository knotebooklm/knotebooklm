import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	const formData = await request.formData();
	const text = formData.get('text');

	throw redirect(303, '/');
}
