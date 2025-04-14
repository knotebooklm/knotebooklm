<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { addTextSchema } from '$lib/schemas/addTextSchema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let data = $props();

	const form = superForm(data.form, { validators: zodClient(addTextSchema) });
	const { form: formData } = form;
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
					<Form.Field {form} name="text"
						><Form.Control let:attrs
							><Form.Label>Text</Form.Label><Textarea
								{...attrs}
								placeholder="Paste text here*"
								rows={20}
								bind:value={$formData.text}
							/></Form.Control
						><Form.FieldErrors /></Form.Field
					><Form.Button disabled={!$formData.text} class="float-right mt-5">Insert</Form.Button>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
