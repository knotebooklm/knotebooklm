<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
</script>

<section class="flex-1 p-2">
	<Card.Root class="h-full">
		<div class="h-1/2">
			<Card.Header>
				<Card.Title>Studio</Card.Title>
			</Card.Header>
			<Card.Content></Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline" class="w-1/3">Customize</Button>
				<Button class="w-1/3">Generate</Button>
			</Card.Footer>
		</div>
		<Separator />
		<div class="h-1/2">
			<Card.Header>
				<Card.Title>Notes</Card.Title>
			</Card.Header>
			<Card.Content
				><Button variant="outline" class="w-3/4 rounded-xl">+ Add note</Button></Card.Content
			>
			<Card.Footer class="flex justify-between"></Card.Footer>
		</div>
	</Card.Root>
</section>
