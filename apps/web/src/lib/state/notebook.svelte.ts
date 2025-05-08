import type { Document, DocumentRecord, Notebook } from '$lib/types';
import { makeDocument, makeNotebook } from '$lib/generators';

let notebook = $state<Notebook>();
let documents = $state<Document[]>([]);
export const selected = $state<Set<string>>(new Set());

export function getNotebook() {
	return notebook || makeNotebook();
}

export function getDocuments() {
	return documents;
}

export function getDocument(id: string) {
	return documents.find((doc) => doc.id === id);
}

export function setNotebook(notebookData: Notebook) {
	notebook = notebookData;
	documents = [];
	selected.clear();
}

export function addDocuments(document: DocumentRecord | DocumentRecord[]) {
	if (Array.isArray(document)) {
		documents.push(...document.map((record) => makeDocument(record)));
	} else {
		documents.push(makeDocument(document));
	}
}

export function removeDocument(id: string) {
	documents = documents.filter((doc) => doc.id !== id);
}

export function updateDocument(id: string, updates: Partial<Document>) {
	const index = documents.findIndex((doc) => doc.id === id);
	documents[index] = { ...documents[index], ...updates };
}
