<script lang="ts">
	import { notebookStore } from '$lib/stores/notebook';
	import { ArtifactsArea, ChatArea, SourcesArea } from '$lib/components';

	let { data } = $props();
	notebookStore.set(data.notebook);
</script>

<div class="flex h-screen flex-col">
	<!-- Main Content -->
	<div class="flex flex-1">
		<!-- Sources -->
		<SourcesArea form={data.form} />

		<!-- Chat -->
		<ChatArea />

		<!-- Studio, Notes -->
		<ArtifactsArea />
	</div>
</div>
