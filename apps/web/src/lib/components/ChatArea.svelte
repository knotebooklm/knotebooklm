<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Textarea } from '$lib/components/ui/textarea';
</script>

<section class="flex-[2_1_0%] p-2">
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Chat</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex justify-around">
				<Button variant="outline" class="w-1/4 rounded-xl">Add note</Button>
				<Button variant="outline" class="w-1/4 rounded-xl">Audio overview</Button>
				<Button variant="outline" class="w-1/4 rounded-xl">Briefing doc</Button>
			</div>
			<div class="grid w-full gap-2 pt-4">
				<Textarea class="h-40" placeholder="Start typing..." />
				<Button>Submit</Button>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-around"></Card.Footer>
	</Card.Root>
</section>
