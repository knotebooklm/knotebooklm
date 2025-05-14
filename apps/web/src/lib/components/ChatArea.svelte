<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Chat from '$lib/components/ui-extras/ui/chat';
	import type { SubmitFunction } from '@sveltejs/kit';

	let query = $state<string>('');
	let chatThread = $state<{ role: 'user' | 'bot'; message: string }[]>([]);

	const handleSubmit: SubmitFunction<{ answer: string }> = () => {
		chatThread.push({ role: 'user', message: query });
		query = '';

		return async ({ result }) => {
			if (result.type === 'success' && result.data) {
				const { answer } = result.data;
				chatThread.push({ role: 'bot', message: answer });
			}
			// TODO: handle error
		};
	};
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
			<Chat.List>
				{#each chatThread as { role, message }}
					<Chat.Bubble variant={role === 'user' ? 'sent' : 'received'}>
						<Chat.BubbleMessage>
							{message}
						</Chat.BubbleMessage>
					</Chat.Bubble>
				{/each}
			</Chat.List>
			<div class="grid w-full gap-2 pt-4">
				<form method="POST" action="?/chat" use:enhance={handleSubmit}>
					<Textarea
						name="query"
						placeholder="Ask a question..."
						class="h-40"
						bind:value={query}
						rows={5}
					/>
					<Button type="submit" class="mt-3 w-full">Submit</Button>
				</form>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-around"></Card.Footer>
	</Card.Root>
</section>
