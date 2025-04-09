<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import NotebookCard from '$lib/components/NotebookCard.svelte';

	let { data } = $props();

	let isOpen = $state(false);
	let notebookName = $state('');

	function toggleModal() {
		isOpen = !isOpen;
	}

	async function createNotebook() {
		const response = await fetch('/api/notebook/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: notebookName })
		});

		if (response.ok) {
			const { data } = await response.json();
			goto(`/notebook/${data.id}`);
		} else {
			console.error('Error creating notebook:', response.statusText);
		}
	}
</script>

<div class="m-10 flex h-screen flex-col">
	<h1 class="mb-20 text-4xl font-bold">Welcome to KnotebookLM</h1>
	<Button variant="outline" class="w-52 rounded-xl" onclick={toggleModal}>+ Create</Button>
	<Dialog.Root bind:open={isOpen}
		><Dialog.Content class="max-w-2xl"
			><Dialog.Header
				><Dialog.Title class="mb-5">Create a New Notebook</Dialog.Title><Dialog.Description>
					<label for="notebook-name" class="text-sm font-medium text-gray-900 dark:text-gray-300"
						>Notebook Name</label
					>
					<Input
						id="notebook-name"
						type="text"
						bind:value={notebookName}
						placeholder="Enter notebook name"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					/>
					<div class="flex w-full justify-between">
						<Button variant="outline" class="mt-5 w-1/4 rounded-xl" onclick={toggleModal}
							>Cancel</Button
						>
						<Button class="mt-5 w-1/4 rounded-xl" onclick={createNotebook}>Create</Button>
					</div>
				</Dialog.Description></Dialog.Header
			></Dialog.Content
		>
	</Dialog.Root>
	<div class="mt-10 flex flex-row flex-wrap">
		{#each data.notebooks as { created, id, title }}
			<NotebookCard {created} {id} {title} />
		{/each}
	</div>
</div>
