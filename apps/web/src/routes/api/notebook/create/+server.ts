import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST({ locals, request }: RequestEvent): Promise<Response> {
	if (!locals.user) {
		return json({ status: 401, message: 'Unauthorized' });
	}

	const { title } = await request.json();

	const record = await locals.pb.collection('notebooks').create({ title, user: locals.user.id });

	return json({
		status: 200,
		message: 'success',
		data: { id: record.id, title: record.title, user: record.user }
	});
}
