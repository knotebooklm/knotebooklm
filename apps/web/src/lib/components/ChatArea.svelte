<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Chat from '$lib/components/ui-extras/ui/chat';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Textarea } from '$lib/components/ui/textarea';
	import { selected } from '$lib/state/notebook.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { SendHorizontal } from 'lucide-svelte';

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
			<div class="grid w-full gap-2 rounded-lg border border-gray-300">
				<form method="POST" action="?/chat" use:enhance={handleSubmit}>
					<div class="flex flex-row place-items-center gap-2">
						<Textarea
							name="query"
							placeholder="Ask a question..."
							class="resize-none border-0 shadow-none"
							bind:value={query}
							rows={3}
						/>
						<p class="min-w-fit align-middle text-xs">
							{selected.size}
							{selected.size === 1 ? 'document' : 'documents'}
						</p>
						<Button type="submit" variant="ghost" size="icon"
							><SendHorizontal size={'1rem'} /></Button
						>
					</div>
				</form>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-around"></Card.Footer>
	</Card.Root>
</section>
