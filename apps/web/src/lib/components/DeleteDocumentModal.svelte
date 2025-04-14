<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let { docId, isOpen, toggle } = $props();
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={toggle}>
	<Dialog.Content class="max-w-3xl"
		><Dialog.Header
			><Dialog.Title class="pb-10">Are you sure you want to delete this document?</Dialog.Title
			><Dialog.Description>
				<form method="POST" action="?/delete-document">
					<Input type="hidden" name="id" value={docId} />
					<Button type="submit" variant="destructive" class="float-right mt-5">Delete</Button>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
