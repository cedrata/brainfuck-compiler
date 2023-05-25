<script>
	import CodeMirror from '$lib/components/CodeMirror.svelte';

	/** @type {number | null} */
	let editorHeight = 500;
</script>

<!-- <svelte:window on:resize={handleResize} /> -->

<div class="px-8">
	<nav>Navbar placeholder</nav>
	<section id="txt-edit" class="grid lg:grid-cols-2 max-md:grid-cols-1">
		<div id="tool-bar" class="col-start-1 lg:col-span-2 row-start-1 h-8">Tool bar</div>
		<div class="lg:col-start-1 max-md:row-start-2 lg:row-start-2 lg:row-span-2">
			<CodeMirror {editorHeight} />
		</div>
		<div class="lg:hidden h-8 max-md:row-start-3" />
		<div class="lg:col-start-2 max-md:row-start-4 lg:row-start-2 lg:row-span-2">
			<CodeMirror {editorHeight} />
		</div>
	</section>
</div>
