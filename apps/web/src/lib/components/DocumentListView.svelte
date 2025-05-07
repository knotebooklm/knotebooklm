<script lang="ts">
	import AddSource from '$lib/components/AddSource/AddSource.svelte';
	import DeleteDocumentModal from '$lib/components/DeleteDocumentModal.svelte';
	import RenameDocumentModal from '$lib/components/RenameDocumentModal.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Pencil, TrashIcon } from 'lucide-svelte';

	import { getDocuments, selected } from '$lib/state/notebook.svelte';

	let isRenameDocumentModalOpen = $state(false);
	let isDeleteDocumentModalOpen = $state(false);
	let isAddSourceModalOpen = $state(false);

	let docId = $state('');

	function toggleRenameModal() {
		isRenameDocumentModalOpen = !isRenameDocumentModalOpen;
	}
	function toggleDeleteModal() {
		isDeleteDocumentModalOpen = !isDeleteDocumentModalOpen;
	}
</script>

<section class="flex-1 p-2">
	<RenameDocumentModal isOpen={isRenameDocumentModalOpen} toggle={toggleRenameModal} {docId} />
	<DeleteDocumentModal isOpen={isDeleteDocumentModalOpen} toggle={toggleDeleteModal} {docId} />
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Sources</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col justify-center"
			><div class="pb-5">
				<AddSource
					isOpen={isAddSourceModalOpen}
					toggle={() => (isAddSourceModalOpen = !isAddSourceModalOpen)}
				/>
			</div>
			<Table.Root>
				<Table.Body>
					{#each getDocuments() as document}
						<Table.Row
							><Table.Cell
								><Checkbox
									id={document.id}
									value={document.id}
									checked={selected.has(document.id)}
									onCheckedChange={(v) => {
										if (v) {
											selected.add(document.id);
										} else {
											selected.delete(document.id);
										}
									}}
								/></Table.Cell
							><Table.Cell colspan={5}>{document.title}</Table.Cell>
							<Table.Cell class="p-0"
								><Pencil
									class="cursor-pointer"
									size={'1rem'}
									onclick={() => {
										docId = document.id;
										toggleRenameModal();
									}}
								/></Table.Cell
							>
							<Table.Cell class="p-0"
								><TrashIcon
									size={'1rem'}
									onclick={() => {
										docId = document.id;
										toggleDeleteModal();
									}}
								/></Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer class="flex justify-between"></Card.Footer>
	</Card.Root>
</section>
