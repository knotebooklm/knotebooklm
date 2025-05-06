import type { Notebook, Document } from '$lib/types/database';

let notebook = $state<Notebook>();
let documents = $state<Document[]>([]);
export const selected = $state<Set<string>>(new Set());

export function getNotebook() {
	return notebook;
}

export function getDocuments() {
	return documents;
}

export function setNotebook(notebookData: Notebook) {
	notebook = notebookData;
	documents = [];
	selected.clear();
}

export function addDocuments(document: Document | Document[]) {
	if (Array.isArray(document)) {
		documents.push(...document);
	} else {
		documents.push(document);
	}
}

export function removeDocument(id: string) {
	documents = documents.filter((doc) => doc.id !== id);
}

export function updateDocument(id: string, updates: Partial<Document>) {
	const index = documents.findIndex((doc) => doc.id === id);
	documents[index] = { ...documents[index], ...updates };
}
