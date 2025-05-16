<script lang="ts">
	import { setNotebook, addDocuments, selected } from '$lib/state/notebook.svelte';
	import { ArtifactsArea, ChatArea, SourcesArea } from '$lib/components';

	let { data } = $props();

	setNotebook(data.notebook);
	addDocuments(data.documents);
	data.documents.forEach((doc) => {
		selected.add(doc.id);
	});
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
