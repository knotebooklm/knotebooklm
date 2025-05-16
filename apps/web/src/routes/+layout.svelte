<script lang="ts">
	import '../app.css';
	import { NavBar } from '$lib/components';

	let { children, data } = $props();
	let user = $derived(data.user);
</script>

<div class="flex h-screen flex-col">
	<NavBar {user} />
	<div class="h-full">
		{@render children()}
	</div>
</div>
