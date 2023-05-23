<script>
	// https://svelte.dev/repl/91649ba3e0ce4122b3b34f3a95a00104?version=3.50.0
	import CodeMirror from '$lib/components/CodeMirror.svelte';
	import { onMount } from 'svelte';

	/** @type {DOMRect | null} */
	let rect = null;
	onMount(() => {
		console.log("onMount")
		rect = new DOMRect(0, 0, 100, 700)
	});
</script>
<div class="px-8">
	<section id="txt-edit" class="grid grid-cols-2">
		<div class="col-start-1 col-span-2 row-start-1">Tool bar</div>
		<div class="col-start-1 row-start-2 row-span-2"><CodeMirror {rect}/></div>
		<div class="col-start-2 row-start-2 row-span-2"><CodeMirror {rect}/></div>
	</section>
</div>
