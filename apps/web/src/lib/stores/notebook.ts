import type { Notebook } from '$lib/types/database';
import { writable, type Writable } from 'svelte/store';

export const notebookStore: Writable<Notebook> = writable();
