<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { NavBar } from '$lib/components';

	let { children, data } = $props();
	let user = $derived(data.user);
</script>

<ModeWatcher defaultMode="dark" />
<NavBar {user} />
{@render children()}
