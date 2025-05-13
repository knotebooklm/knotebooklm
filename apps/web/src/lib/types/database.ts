export type DocumentRecord = {
	collectionId: string;
	collectionName: string;
	created: string;
	document: string;
	id: string;
	notebook: string;
	summary: string;
	text: string;
	title: string;
	topics: string[];
	updated: string;
	user: string;
};

export type NotebookRecord = {
	collectionId: string;
	collectionName: string;
	created: string;
	id: string;
	title: string;
	updated: string;
	user: string;
};
