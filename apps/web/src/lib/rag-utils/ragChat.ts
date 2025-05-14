import { RAG_CHAT_PORT, RAG_URL } from '$env/static/private';
import { callRAG } from './callRAG';

const ROUTE = '/query';

export async function ragChat({
	documentIds,
	notebookId,
	userId,
	query
}: {
	documentIds: string[];
	notebookId: string;
	userId: string;
	query: string;
}) {
	const url = `${RAG_URL}:${RAG_CHAT_PORT}${ROUTE}`;
	const body = {
		doc_ids: documentIds,
		notebook_id: notebookId,
		user_id: userId,
		query
	};

	try {
		const response = await callRAG({ url, method: 'POST', body });

		if (!response.ok) {
			throw new Error(`RAG response not ok: ${response.status} ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error calling RAG:', error);
		return { answer: 'Call to chat service failed.' };
	}
}
