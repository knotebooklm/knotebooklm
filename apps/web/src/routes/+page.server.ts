export async function load({ locals }) {
	const notebooks = await locals.pb.collection('notebooks').getFullList({ sort: '-created' });

	return { notebooks };
}
