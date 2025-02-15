<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<section class="flex-1 p-2">
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Sources</Card.Title>
		</Card.Header>
		<Card.Content class="flex justify-center"
			><Button variant="outline" class="w-3/4 rounded-xl">+ Source</Button>
		</Card.Content>
		<Card.Footer class="flex justify-between"></Card.Footer>
	</Card.Root>
</section>
