<script>
	// https://svelte.dev/repl/91649ba3e0ce4122b3b34f3a95a00104?version=3.50.0
	import CodeMirror from '$lib/components/CodeMirror.svelte';
	import { onMount } from 'svelte';

	/** @type {DOMRect | null} */
	let rect = null;
	onMount(() => {
		console.log("Page mount")
		// rect = new DOMRect(0, 0, 100, 700)
		let toolBarElem = document.querySelector("#tool-bar")
		let toolBarClientRect = null;

		console.log("toolBarElem")
		console.log(toolBarElem)

		if (toolBarElem !== null) {
			console.log()
			toolBarClientRect = toolBarElem.getBoundingClientRect()
		}

		console.log("toolBarClientRect")
		console.log(toolBarClientRect)

		if (toolBarClientRect !== null) {
			rect = new DOMRect(toolBarClientRect.x, toolBarClientRect.bottom, toolBarClientRect.width, window.innerHeight - toolBarClientRect.bottom)
		}
		console.log('rect')
		console.log(rect)
		// } else {
		// 	temp = new DOMRect(100, 100, 500, 500)
		// }
	});

</script>
<div class="px-8">
	<nav>
		Navbar placeholder
	</nav>
	<section id="txt-edit" class="grid grid-cols-2">
		<div id="tool-bar" class="col-start-1 col-span-2 row-start-1">Tool bar</div>
		<div class="col-start-1 row-start-2 row-span-2"><CodeMirror {rect}/></div>
		<div class="col-start-2 row-start-2 row-span-2"><CodeMirror {rect}/></div>
	</section>
</div>
