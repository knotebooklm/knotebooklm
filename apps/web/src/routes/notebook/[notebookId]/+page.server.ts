import { error } from '@sveltejs/kit';
import type { DocumentRecord, NotebookRecord } from '$lib/types';
import { makeDocument, makeNotebook } from '$lib/generators';
import { ragAddDocument, ragChat } from '$lib/rag-utils';
import { generatePocketBaseId } from '$lib/utilities';

export async function load({ locals, params }) {
	const notebook: NotebookRecord = await locals.pb
		.collection('notebooks')
		.getOne(params.notebookId);
	const documents: DocumentRecord[] = await locals.pb
		.collection('documents')
		.getFullList({ filter: locals.pb.filter('notebook = {:notebook}', { notebook: notebook.id }) });

	return {
		notebook: makeNotebook(notebook),
		documents: documents.map((record) => makeDocument(record))
	};
}

export const actions = {
	text: async ({ request, locals, params }) => {
		const data = await request.formData();
		const text = String(data.get('text'));

		if (!text) {
			error(400, { message: 'No text received.' });
		}

		const userId = locals.user?.id;

		if (!userId) {
			error(401, { message: 'Unauthorized' });
		}

		const documentId = generatePocketBaseId();
		const notebookId = params.notebookId;

		const { summary, title, topics } = await ragAddDocument({
			documentId,
			notebookId,
			userId,
			text
		});

		const response: DocumentRecord = await locals.pb.collection('documents').create({
			id: documentId,
			user: userId,
			notebook: notebookId,
			document: new File([text], `doc_${userId}.txt`),
			text,
			summary,
			title: title || 'Pasted Text',
			topics: topics || []
		});

		return makeDocument(response);
	},
	'change-name': async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('id') as string;
		const title = form.get('title');

		if (!id || !title) {
			return;
		}
		// TODO: add error handling
		await locals.pb.collection('documents').update(id, { title });

		return { title };
	},
	'delete-document': async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('id') as string;

		if (!id) {
			return;
		}
		// TODO: add error handling
		await locals.pb.collection('documents').delete(id);
	},
	chat: async ({ locals, params, request }) => {
		const userId = locals.user?.id;

		if (!userId) {
			error(401, { message: 'Unauthorized' });
		}

		const form = await request.formData();
		const query = form.get('query') as string;

		const { answer } = await ragChat({
			query,
			notebookId: params.notebookId,
			documentIds: [],
			userId
		});

		return { answer };
	}
};
