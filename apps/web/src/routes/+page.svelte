<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Textarea } from '$lib/components/ui/textarea';
</script>

<div class="flex h-screen flex-col">
	<!-- Main Content -->
	<div class="flex flex-1">
		<!-- Sources -->
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

		<!-- Chat -->
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

		<!-- Studio, Notes -->
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
	</div>
</div>
