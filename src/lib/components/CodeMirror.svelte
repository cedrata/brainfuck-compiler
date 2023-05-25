<script context="module">
	import { basicSetup } from 'codemirror';
	import { EditorView } from '@codemirror/view';
	import { EditorState, SelectionRange } from '@codemirror/state';
</script>

<script>
	import { onMount, onDestroy } from 'svelte';

	/** @type {number | null}*/
	export let editorHeight;

	/** @type {Element | DocumentFragment | undefined} */
	let dom;

	/** @type {boolean} */
	let mounted = false;

	/** @type {EditorView | null} */
	let view = null;

	/** @type {EditorState | null} */
	let startState;

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		if (view !== null) {
			view.destroy();
		}
	});

	$: if (mounted && editorHeight !== null) {
		startState = EditorState.create({
			doc: 'Hello World',
			extensions: [
				basicSetup,
				EditorView.theme({
					'&': { height: editorHeight + 'px' },
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
