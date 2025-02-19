import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { PB_URL } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const unprotectedRoutes = ['/login'];
export const authorization: Handle = async ({ event, resolve }) => {
	if (!unprotectedRoutes.includes(event.url.pathname)) {
		const loggedIn = !!event.locals.pb.authStore.isValid;
		if (!loggedIn) {
			throw redirect(303, '/login');
		}
	}

	return resolve(event);
};

export const authentication: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PB_URL);

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb.authStore.record;
		}
	} catch {
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
	return response;
};

export const handle = sequence(authentication, authorization);
