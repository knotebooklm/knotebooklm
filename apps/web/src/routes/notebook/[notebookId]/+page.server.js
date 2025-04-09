export async function load({ locals, params }) {
	const notebook = await locals.pb.collection('notebooks').getOne(params.notebookId);

	return { notebook: { id: params.notebookId, title: notebook.title } };
}
