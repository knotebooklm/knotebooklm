<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { loginSchema } from './loginSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});
	const { form: formData, enhance, message } = form;
</script>

<div class="flex place-content-center">
	<div class="flex w-1/4 flex-col">
		<Card.Root>
			<Card.Header>
				<Card.Title>Login</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-col justify-center">
				{#if $message}
					<p class="text-destructive">{$message}</p>
				{/if}
				<form method="POST" use:enhance>
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input {...attrs} type="password" bind:value={$formData.password} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button formaction="?/login">Submit</Form.Button>
					<Form.Button formaction="?/register">Register</Form.Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
