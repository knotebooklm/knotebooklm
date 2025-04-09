<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { NotebookPen } from 'lucide-svelte';

	let { created, id, title } = $props();
</script>

<a href={`/notebook/${id}`}
	><Card.Root class="m-5 flex h-48 w-72 flex-col">
		<Card.Header>
			<Card.Title level={2} class="text-lg font-thin">{title}</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-grow place-content-center"
			><div class="place-content-center">
				<NotebookPen strokeWidth={0.75} size={50} />
			</div></Card.Content
		>
		<Card.Footer class="flex flex-grow content-start">
			<Card.Description class="text-sm font-thin"
				>{new Intl.DateTimeFormat(undefined, {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				}).format(new Date(created))}</Card.Description
			>
		</Card.Footer>
	</Card.Root>
</a>
