<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Chat from '$lib/components/ui-extras/ui/chat';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getDocuments, getNotebook, selected } from '$lib/state/notebook.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Send } from 'lucide-svelte';

	let query = $state<string>('');
	let chatThread = $state<{ role: 'user' | 'bot'; message: string }[]>([]);

	const handleSubmit: SubmitFunction<{ answer: string }> = ({ formData }) => {
		formData.set('history', JSON.stringify(chatThread));
		formData.set('documentIds', JSON.stringify(Array.from(selected)));
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

<section class="flex-[2_1_0%] overflow-y-hidden p-2">
	<Card.Root class="flex h-full flex-col overflow-y-hidden">
		<Card.Header class="flex-grow-0">
			<Card.Title>Chat</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-[10_1_100%] flex-col place-content-between">
			<Chat.List class="max-h-[400px]">
				<div>
					<div>
						<h1 class="mb-2 text-4xl font-extrabold">{getNotebook().title}</h1>
						<p class="mb-5 text-sm text-gray-500">
							{getDocuments().length}
							{getDocuments().length === 1 ? 'document' : 'documents'}
						</p>
						<p>{getDocuments().find((doc) => selected.has(doc.id))?.summary}</p>
						<div class="mt-5 flex place-content-between">
							<Button variant="outline" class="w-1/4 rounded-xl">Add note</Button>
							<Button variant="outline" class="w-1/4 rounded-xl">Audio overview</Button>
							<Button variant="outline" class="w-1/4 rounded-xl">Briefing doc</Button>
						</div>
					</div>
					{#each chatThread as { role, message }}
						<Chat.Bubble variant={role === 'user' ? 'sent' : 'received'}>
							<Chat.BubbleMessage>
								{message}
							</Chat.BubbleMessage>
						</Chat.Bubble>
					{/each}
				</div>
			</Chat.List>
			<div class="w-full gap-2 rounded-lg border border-gray-300">
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
						<Button
							type="submit"
							variant="default"
							size="icon"
							class="mr-2 shrink-0 rounded-full"
							disabled={query.trim() === ''}
						>
							<Send /></Button
						>
					</div>
				</form>
			</div>
		</Card.Content>
	</Card.Root>
</section>
