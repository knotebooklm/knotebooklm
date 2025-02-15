<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { NavBar } from '$lib/components';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />
<NavBar />
{@render children()}
