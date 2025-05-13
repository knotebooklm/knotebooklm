import { RAG_ADD_DOCUMENT_PORT, RAG_URL } from '$env/static/private';
import { callRAG } from './callRAG';

const ROUTE = '/new';

export async function ragAddDocument({
	documentId,
	notebookId,
	userId,
	text
}: {
	documentId: string;
	notebookId: string;
	userId: string;
	text: string;
}) {
	const url = `${RAG_URL}:${RAG_ADD_DOCUMENT_PORT}${ROUTE}`;
	const body = {
		doc_id: documentId,
		notebook_id: notebookId,
		user_id: userId,
		text
	};

	try {
		const response = await callRAG({ url, method: 'POST', body });

		if (!response.ok) {
			throw new Error(`RAG response not ok: ${response.status} ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error calling RAG:', error);
		return { summary: 'Failed to generate summary. Sorry.' };
	}
}
