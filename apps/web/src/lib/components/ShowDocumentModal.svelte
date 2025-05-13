<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { getDocument } from '$lib/state/notebook.svelte';

	let { docId, isOpen, toggle } = $props();
	let document = $derived(getDocument(docId));
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={toggle}>
	<Dialog.Content class="max-h-[90vh] max-w-4xl overflow-y-auto"
		><Dialog.Header><Dialog.Title class="pb-10">{document?.title}</Dialog.Title></Dialog.Header>
		<Card.Root class="foreground">
			<Card.Header>
				<Card.Title>Source Guide</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-5 gap-2">
					<div class="col-span-3 m-5 flex flex-col">
						<h2 class="text-lg font-semibold">Summary</h2>
						<p class="text-sm text-muted-foreground">
							{document?.summary}
						</p>
					</div>

					<div class="col-span-2 m-5 flex flex-col">
						<h2 class="text-lg font-semibold">Key Topics</h2>
						{#if Array.isArray(document?.topics)}
							{#each document?.topics?.slice(0, 5) as topic}
								<Button class="m-1" variant="outline">{topic}</Button>
							{/each}
						{:else}
							<p class="text-sm text-muted-foreground">No key topics.</p>
						{/if}
					</div>
				</div>
			</Card.Content>
		</Card.Root>
		<p>{document?.text}</p>
	</Dialog.Content>
</Dialog.Root>
