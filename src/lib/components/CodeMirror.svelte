<script context="module">
	import { basicSetup } from 'codemirror';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
</script>

<script>
	import { onMount, onDestroy } from 'svelte';
	/** @type {Element | DocumentFragment | undefined} */
	let dom;

	/** @type {boolean} */
	let mounted = false;

	/** @type {EditorView | null}*/
	let view = null;

	let startState = EditorState.create({
		doc: 'Hello World',
		extensions: [basicSetup,EditorView.theme({
			'&': { height: '700px' },
			'.cm-scroller': { overflow: 'auto' },
		})]
	});

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		if (view !== null) {
			view.destroy();
		}
	});

	$: if (mounted) {
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
