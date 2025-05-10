export * from './database';
export * from './rag';

export type Document = {
	id: string;
	notebook: string;
	summary: string;
	text: string;
	title: string;
	user: string;
};

export type Notebook = {
	id: string;
	title: string;
};
