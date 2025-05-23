import { SvelteSet } from 'svelte/reactivity';
import type { Document, Notebook } from '$lib/types';
import { makeNotebook } from '$lib/generators';

let notebook = $state<Notebook>();
let documents = $state<Document[]>([]);
export const selected = $state<SvelteSet<string>>(new SvelteSet());

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

export function addDocuments(document: Document | Document[]) {
	if (Array.isArray(document)) {
		documents.push(...document.map((record) => record));
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
