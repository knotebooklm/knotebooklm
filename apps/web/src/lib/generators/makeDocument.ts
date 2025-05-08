import type { Document, DocumentRecord } from '$lib/types';

export function makeDocument(record?: DocumentRecord): Document {
	if (!record) {
		return {
			id: '',
			notebook: '',
			summary: '',
			text: '',
			title: '',
			user: ''
		};
	}
	return {
		id: record.id,
		notebook: record.notebook,
		summary: record.summary,
		text: record.text,
		title: record.title,
		user: record.user
	};
}
