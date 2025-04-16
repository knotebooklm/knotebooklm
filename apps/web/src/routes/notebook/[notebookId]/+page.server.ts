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

		let response;

		if (text && locals.user) {
			response = await locals.pb.collection('documents').create({
				user: locals.user.id,
				notebook: params.notebookId,
				document: new File([text], `doc_${locals.user.id}.txt`),
				text,
				summary: text.slice(0, 100),
				title: 'Pasted Text'
			});

			if (response) {
				await fetch('http://localhost:5000/new', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({
						doc_id: response.id,
						notebook_id: params.notebookId,
						user_id: locals.user.id,
						text
					})
				});
			}
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
	},
	'delete-document': async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('id') as string;

		if (!id) {
			return;
		}
		// TODO: add error handling
		await locals.pb.collection('documents').delete(id);
	}
};
