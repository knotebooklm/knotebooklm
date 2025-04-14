<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Textarea } from '$lib/components/ui/textarea';

	let formData = $state({
		text: ''
	});
</script>

<Dialog.Root
	><Dialog.Trigger class="w-full">
		{#snippet child({ props })}<Button {...props} variant="outline" class="w-3/4 rounded-xl"
				>+ Source</Button
			>{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="max-w-5xl"
		><Dialog.Header
			><Dialog.Title>Add a Text</Dialog.Title><Dialog.Description
				><p class="m-5">Paste your copied text below to upload as a source in KnotebookLM</p>
				<form method="POST" action="?/text">
					<Textarea
						name="text"
						placeholder="Paste text here*"
						rows={20}
						bind:value={formData.text}
					/>
					<Button type="submit" disabled={!formData.text} class="float-right mt-5">Insert</Button>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
