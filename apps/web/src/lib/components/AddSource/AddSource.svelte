<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { addTextSchema, type AddTextSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let data: SuperValidated<Infer<AddTextSchema>> = $props();

	const form = superForm(data, { validators: zodClient(addTextSchema) });
	const { form: formData } = form;
</script>

<Dialog.Root
	><Dialog.Trigger class="w-full"
		><Button variant="outline" class="w-3/4 rounded-xl">+ Source</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-5xl"
		><Dialog.Header
			><Dialog.Title>Add a Text</Dialog.Title><Dialog.Description
				><p class="m-5">Paste your copied text below to upload as a source in KnotebookLM</p>
				<form method="POST">
					<Form.Field {form} name="text"
						><Form.Control let:attrs
							><Textarea
								{...attrs}
								placeholder="Paste text here*"
								rows={20}
								bind:value={$formData.text}
							/></Form.Control
						><Form.FieldErrors /></Form.Field
					><Form.Button
						formaction="/api/add-source"
						disabled={!$formData.text}
						class="float-right mt-5">Insert</Form.Button
					>
				</form></Dialog.Description
			></Dialog.Header
		></Dialog.Content
	>
</Dialog.Root>
