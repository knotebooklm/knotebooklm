<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let { docId, isOpen, toggle } = $props();
	let updatedTitle = $state('');
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={toggle}>
	<Dialog.Content class="max-w-3xl"
		><Dialog.Header
			><Dialog.Title class="pb-10">Rename Document</Dialog.Title><Dialog.Description>
				<form method="POST" action="?/change-name">
					<Input name="title" bind:value={updatedTitle} class="w-full" />
					<Input type="hidden" name="id" value={docId} />
					<Button type="submit" disabled={!updatedTitle} class="float-right mt-5">Update</Button>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
