import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 15);

export function generatePocketBaseId() {
	return nanoid();
}
