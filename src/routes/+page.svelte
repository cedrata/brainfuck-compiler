<script>
	import CodeMirror from '$lib/components/CodeMirror.svelte';

	/** @type {number | null} */
	let editorHeight = 500;
</script>

<header class="h-16 bg-accent flex justify-center">
	<div class="max-w-7xl w-full flex justify-between">
		<a href="/" class="flex"><div class="self-center">BF-Compiler</div></a>
		<a href="https://cedrata.github.io/portfolio" class="flex"
			><div class="self-center">Wunt sum Cedrata?</div></a
		>
	</div>
</header>

<section class="flex justify-center">
	<div class="max-w-7xl w-full flex justify-between">
		<div id="txt-edit" class="grid lg:grid-cols-2 gap-x-16 max-md:grid-cols-1 w-full">
			<div id="tool-bar" class="col-start-1 lg:col-span-2 row-start-1 h-8">Tool bar</div>
			<div class="lg:col-start-1 max-md:row-start-2 lg:row-start-2 lg:row-span-2">
				<CodeMirror {editorHeight} />
			</div>
			<div class="lg:hidden h-8 max-md:row-start-3" />
			<div class="lg:col-start-2 max-md:row-start-4 lg:row-start-2 lg:row-span-2">
				<CodeMirror {editorHeight} />
			</div>
		</div>
	</div>
</section>
