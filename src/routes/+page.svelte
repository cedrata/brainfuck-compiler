<script>
	// https://svelte.dev/repl/91649ba3e0ce4122b3b34f3a95a00104?version=3.50.0
	import CodeMirror, { basicSetup } from '$lib/components/CodeMirror.svelte';

	// /** @type {undefined | {ready: () => boolean, subscribe(cb: any): () => void, set(newValue: string): void}}*/
	/**
	 *
	 * @type {undefined | import('$lib/components/CodeMirror.svelte').DocStore}
	 */
	let store;

	/**
	 * @param {CustomEvent} param0
	 */
	function changeHandler({ detail: { tr } }) {
		console.log(tr);
		console.log('change', tr.changes.toJSON());
	}
</script>

<div>
	<CodeMirror
		doc={'Edit me!\nAnd here is the second line!!'}
		bind:docStore={store}
		extensions={basicSetup}
	/>
</div>
