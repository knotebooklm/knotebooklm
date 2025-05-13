export type RAGRequestParams = {
	url: string;
	method?: string;
	headers?: Record<string, string>;
	body?: Record<string, unknown> | null;
};
