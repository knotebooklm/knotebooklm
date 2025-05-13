import type { Document, DocumentRecord } from '$lib/types';

export function makeDocument(record?: DocumentRecord): Document {
	if (!record) {
		return {
			id: '',
			notebook: '',
			summary: '',
			text: '',
			title: '',
			topics: [],
			user: ''
		};
	}
	return {
		id: record.id,
		notebook: record.notebook,
		summary: record.summary,
		text: record.text,
		title: record.title,
		topics: record.topics,
		user: record.user
	};
}
