<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Textarea } from '$lib/components/ui/textarea';
	import { addDocuments } from '$lib/state/notebook.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Document as NotebookDocument } from '$lib/types/database';

	let blankFormData = { text: '' };

	let formData = $state(blankFormData);

	let { isOpen, toggle } = $props();

	const handleSubmit: SubmitFunction<NotebookDocument> = () => {
		return async ({ result }) => {
			if (result.type === 'success' && result.data) {
				addDocuments(result.data);
				formData = blankFormData;
				toggle();
			}
			// TODO: handle error
		};
	};
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={toggle}
	><Dialog.Trigger class="w-full">
		{#snippet child({ props })}<Button {...props} variant="outline" class="w-3/4 rounded-xl"
				>+ Source</Button
			>{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="max-w-5xl"
		><Dialog.Header
			><Dialog.Title>Add a Text</Dialog.Title><Dialog.Description
				><p class="m-5">Paste your copied text below to upload as a source in KnotebookLM</p>
				<form method="POST" action="?/text" use:enhance={handleSubmit}>
					<Textarea
						name="text"
						placeholder="Paste text here*"
						rows={20}
						bind:value={formData.text}
					/>
					<Button type="submit" disabled={!formData.text} class="float-right mt-5">Insert</Button>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
