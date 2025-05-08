<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { updateDocument, selected } from '$lib/state/notebook.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { docId, isOpen, toggle } = $props();
	let updatedTitle = $state('');

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success' && result.data?.title) {
				updatedTitle = '';
				toggle();
				updateDocument(docId, { title: result.data.title });
				console.log('selected: ', selected);
			} else if (result.type === 'error') {
				// TODO: Handle error
				console.error('Form submission failed:', result.error);
			}
		};
	};
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={toggle}>
	<Dialog.Content class="max-w-3xl"
		><Dialog.Header
			><Dialog.Title class="pb-10">Rename Document</Dialog.Title><Dialog.Description>
				<form method="POST" action="?/change-name" use:enhance={handleSubmit}>
					<Input name="title" bind:value={updatedTitle} class="w-full" />
					<Input type="hidden" name="id" value={docId} />
					<Button type="submit" disabled={!updatedTitle} class="float-right mt-5">Update</Button>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
