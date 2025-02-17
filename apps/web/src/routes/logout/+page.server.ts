export const load = async ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = null;
};
