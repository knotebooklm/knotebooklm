import type { Notebook } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const notebookStore: Writable<Notebook> = writable();
