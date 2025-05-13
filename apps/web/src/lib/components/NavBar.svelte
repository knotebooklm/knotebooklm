<script>
	import { page } from '$app/state';
	import { getNotebook } from '$lib/state/notebook.svelte';
	import { Button } from '$lib/components/ui/button';

	const data = $props();
	const pathname = $derived(page.url.pathname);
</script>

<nav class="flex w-full justify-between p-4">
	<div class="flex flex-row content-center">
		<a href="/"><img src="/favicon.svg" alt="logo" class="h-8 w-8" /></a>
		{#if pathname.includes('notebook')}
			<h1 class="pl-4 text-3xl" id="notebook-title">{getNotebook().title}</h1>
		{:else}
			<h1 class="pl-4 text-3xl" id="app-title">knotebooklm</h1>
		{/if}
	</div>
	{#if data.user}
		<div class="flex items-center">
			<p class="p-3 leading-7 [&:not(:first-child)]:mt-6">{data.user.email?.split('@')[0]}</p>
			<Button href="/logout" variant="outline" class="">Logout</Button>
		</div>
	{/if}
</nav>

<style>
	#app-title {
		font-family: 'anybody', sans-serif;
		/* text-shadow: 1px 1px 3px #ffd493; */
	}
</style>
