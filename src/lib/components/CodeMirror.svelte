<script context="module">
	import { basicSetup } from 'codemirror';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
</script>

<script>
	import { onMount, onDestroy } from 'svelte';

	/** @type {number | null}*/
	export let editorHeight;

	/** @type {string | undefined}*/
	export let initialDoc = undefined;

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
			doc: (initialDoc === undefined) ? '' : initialDoc,
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

	export const props = {
		/**
		 * @param {string} doc
		 */
		set doc(doc) {
			view?.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: doc
				}
			});
		},
		/** @returns {string} */
		get doc() {
			if (view === null) return '';
			return view.state.doc.toJSON().join('\n');
		}
	};
</script>

<div class="codemirror" bind:this={dom} />

<style>
	.codemirror {
		display: contents;
	}
</style>
