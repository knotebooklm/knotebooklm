import type { Notebook, NotebookRecord } from '$lib/types';

export function makeNotebook(record?: NotebookRecord): Notebook {
	if (!record) {
		return {
			id: '',
			title: ''
		};
	}
	return {
		id: record.id,
		title: record.title
	};
}
