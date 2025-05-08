<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import { getDocument } from '$lib/state/notebook.svelte';

	let { docId, isOpen, toggle } = $props();
	let document = $derived(getDocument(docId));
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={toggle}>
	<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-y-auto"
		><Dialog.Header><Dialog.Title class="pb-10">{document?.title}</Dialog.Title></Dialog.Header>
		<Card.Root class="foreground">
			<Card.Header>
				<Card.Title>Summary</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col">
					<p class="text-sm text-muted-foreground">
						{document?.summary}
					</p>
				</div>
			</Card.Content>
		</Card.Root>
		<p>{document?.text}</p>
	</Dialog.Content>
</Dialog.Root>
