<script lang="ts">
	import AddSource from '$lib/components/AddSource/AddSource.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	import { notebookStore } from '$lib/stores/notebook';

	const documents = $state<{ id: string; title: string; summary: string; text: string }[]>([]);

	let { form } = $props();

	notebookStore.subscribe((notebook) => {
		if (notebook) {
			documents.push(...notebook.documents);
		}
	});
</script>

<section class="flex-1 p-2">
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Sources</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col justify-center"
			><div class="pb-5"><AddSource {form} /></div>
			<Table.Root>
				<Table.Body>
					{#each documents as document}
						<Table.Row><Table.Cell>{document.title}</Table.Cell></Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer class="flex justify-between"></Card.Footer>
	</Card.Root>
</section>
