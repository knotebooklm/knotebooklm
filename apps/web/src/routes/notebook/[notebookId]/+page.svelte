<script lang="ts">
	import { setNotebook, addDocuments } from '$lib/state/notebook.svelte';
	import { ArtifactsArea, ChatArea, SourcesArea } from '$lib/components';

	let { data } = $props();

	setNotebook(data.notebook);
	addDocuments(data.documents);
</script>

<div class="flex flex-col">
	<!-- Main Content -->
	<div class="flex flex-1">
		<!-- Sources -->
		<SourcesArea />

		<!-- Chat -->
		<ChatArea />

		<!-- Studio, Notes -->
		<ArtifactsArea />
	</div>
</div>
