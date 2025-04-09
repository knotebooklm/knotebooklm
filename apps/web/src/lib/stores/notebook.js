import { writable } from 'svelte/store';

export const notebookStore = writable({ id: '', title: '' });
