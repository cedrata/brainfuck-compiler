<script context="module">
	import { basicSetup } from 'codemirror';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
</script>

<script>
	import { onMount, onDestroy } from 'svelte';

	/** @type {DOMRect | null}*/
	export let rect;

	/** @type {Element | DocumentFragment | undefined} */
	let dom;

	/** @type {boolean} */
	let mounted = false;

	/** @type {EditorView | null}*/
	let view = null;

	/** @type {EditorState | null}*/
	let startState;

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		if (view !== null) {
			view.destroy();
		}
	});

	$: if (mounted && rect !== null) {
		console.log("mounted")
		console.log(rect)
		startState = EditorState.create({
			doc: 'Hello World',
			extensions: [
				basicSetup,
				EditorView.theme({
					'&': { height: rect.height + 'px' },
					'.cm-scroller': { overlow: 'auto' }
				})
			]
		});

		view = new EditorView({
			state: startState,
			parent: dom
		});
	}
</script>

<div class="codemirror" bind:this={dom} />

<style>
	.codemirror {
		display: contents;
	}
</style>
