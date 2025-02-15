<script lang="ts">
	import { ArtifactsArea, ChatArea, SourcesArea } from '$lib/components';
</script>

<div class="flex h-screen flex-col">
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
