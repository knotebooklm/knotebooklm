import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';

export const load = async () => {
	if (browser) {
		await invalidateAll();
	}
	throw redirect(303, '/login');
};
