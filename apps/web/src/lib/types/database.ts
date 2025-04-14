export type Document = {
	id: string;
	user: string;
	notebook: string;
	document: string;
	title: string;
	summary: string;
	text: string;
};

export type Documents = Document[];

export type Notebook = {
	id: string;
	title: string;
	documents: Documents;
};
