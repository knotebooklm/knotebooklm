<script>
	import { Button } from '$lib/components/ui/button';
	const data = $props();
</script>

<nav class="flex w-full justify-between p-4">
	<div class="flex flex-row">
		<img src="/favicon.svg" alt="logo" class="h-8 w-8" />
		<h1 class="pl-2 text-3xl shadow-yellow-200 drop-shadow-2xl" id="app-title">knotebooklm</h1>
	</div>
	{#if data.user}
		<div class="flex items-center">
			<p class="p-3 leading-7 [&:not(:first-child)]:mt-6">{data.user.email.split('@')[0]}</p>
			<Button href="/logout" variant="outline" class="">Logout</Button>
		</div>
	{/if}
</nav>

<style>
	#app-title {
		font-family: 'anybody', sans-serif;
		text-shadow: 1px 1px 3px #ffd493;
	}
</style>
