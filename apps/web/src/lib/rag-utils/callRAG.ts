import type { RAGRequestParams } from '$lib/types';

export async function callRAG({ url, headers = {}, method = 'POST', body }: RAGRequestParams) {
	const options: RequestInit = {
		method,
		headers: { 'content-type': 'application/json', ...headers },
		body: body ? JSON.stringify(body) : null
	};

	return fetch(url, options);
}
