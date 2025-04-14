import type { Documents, Notebook } from '$lib/types/database';

export async function load({ locals, params }) {
	const notebook: Omit<Notebook, 'documents'> = await locals.pb
		.collection('notebooks')
		.getOne(params.notebookId);
	const documents: Documents = await locals.pb
		.collection('documents')
		.getFullList({ filter: locals.pb.filter('notebook = {:notebook}', { notebook: notebook.id }) });

	return { notebook: { id: params.notebookId, title: notebook.title, documents } };
}

export const actions = {
	text: async ({ request, locals, params }) => {
		const data = await request.formData();
		const text = data.get('text');

		if (text && locals.user) {
			await locals.pb.collection('documents').create({
				user: locals.user.id,
				notebook: params.notebookId,
				document: new File([text], `doc_${locals.user.id}.txt`),
				text,
				summary: text.slice(0, 100),
				title: 'Pasted Text'
			});
		}
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
	}
};
