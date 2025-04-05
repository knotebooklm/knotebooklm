<script lang="ts">
	import AddSource from '$lib/components/AddSource/AddSource.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<section class="flex-1 p-2">
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Sources</Card.Title>
		</Card.Header>
		<Card.Content class="flex justify-center"><AddSource /></Card.Content>
		<Card.Footer class="flex justify-between"></Card.Footer>
	</Card.Root>
</section>
