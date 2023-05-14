<!-- The code below is released under public domain. -->
<script context="module" lang="js">
	import { EditorView, minimalSetup, basicSetup } from 'codemirror';
	// import { ViewPlugin } from '@codemirror/view'
	import { StateEffect, Transaction } from '@codemirror/state';
	export { minimalSetup, basicSetup };
</script>

<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/**
	 * @type {Element | DocumentFragment | undefined}
	 */
	let dom;

	/**
	 * @type {boolean}
	 */
	let _mounted = false;
	onMount(() => {
		_mounted = true;
		return () => {
			_mounted = false;
		};
	});

	/**
	 * @type {EditorView | null}
	 */
	export let view = null;

	/**
	 * @type {string}
	 * @description`doc` is deliberately made non-reactive for not storing a reduntant string
	 * besides the editor. Also, setting doc to undefined will not trigger an
	 * update, so that you can clear it after setting one.
	 */
	export let doc;

	/**
	 * @type {boolean}
	 * @description Set this if you would like to listen to all transactions via `update` event.
	 */
	export let verbose = false;

	/**
	 * @type {string | null}
	 * @description Cached doc string so that we don't extract strings in bulk over and over.
	 */
	let _docCached = null;

	/**
	 * @description Overwrite the bulk of the text with the one specified.
	 * @param {string} text
	 */
	function _setText(text) {
		console.log('Enetring _setText')
		view?.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: text }
		});
		console.log('Quitting _setText')
	}

	const subscribers = new Set();

	export const docStore = {
		/**
		 * @description TODO
		 * @returns {boolean}
		 * @memberof DocStore
		 */
		ready: () => view !== null,
		/**
		 * @description TODO
		 * @param {any}	cb
		 * @returns {() => void}
		 */
		subscribe(cb) {
			console.log('Entering docStore.subscribe')
			subscribers.add(cb);

			if (!this.ready()) {
				cb(null);
			} else {
				if (_docCached == null) {
					_docCached = view?.state.doc.toString() ?? '';
				}
				cb(_docCached);
			}

			console.log('Quitting docStore.subscribe')
			return () => void subscribers.delete(cb);
		},
		/**
		 * @description TODO
		 * @param {string} newValue
		 */
		set(newValue) {
			console.log('Entering docStore.set')
			if (!_mounted) {
				throw new Error('Cannot set docStore when the component is not mounted.');
			}

			const inited = _initEditorView(newValue);
			if (!inited) _setText(newValue);
			console.log('Quitting docStore.set')
		}
	};

	export let extensions = minimalSetup;

	function _reconfigureExtensions() {
		console.log('Entering _reconfigureExtensions')
		if (view === null) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of(extensions)
		});
		console.log('Quitting _reconfigureExtensions')
	}

	$: extensions, _reconfigureExtensions();

	/**
	 * @description TODO
	 * @param {Transaction} tr
	 * @this {EditorView}
	 */
	function _editorTxtHandler(tr) {
		console.log('Entering _editorTxtHandler');
		this.update([tr]);

		if (verbose) {
			dispatch('update', tr);
		}

		if (tr.docChanged) {
			_docCached = null;
			if (subscribers.size) {
				dispatchDocStore((_docCached = tr.newDoc.toString()));
			}
			dispatch('change', { view: this, tr });
		}
		console.log('Quitting _editorTxtHandler')
	}

	/**
	 * @description TODO
	 * @param {string} s
	 */
	function dispatchDocStore(s) {
		console.log('Entering dispatchDocStore');
		for (const cb of subscribers) {
			cb(s);
		}
		console.log(subscribers);
		console.log('Quitting dispatchDocStore');
	}

	/**
	 * @description TODO
	 * @param {string} initialDoc
	 */
	function _initEditorView(initialDoc) {
		console.log('Entering _initEditorView');
		if (view !== null) {
			return false;
		}

		view = new EditorView({
			doc: initialDoc,
			extensions,
			parent: dom,
			dispatch: _editorTxtHandler
		});
		console.log('Quitting _initEditorView');
		return true;
	}

	$: if (_mounted && doc !== undefined) {
		console.log('Entering (_mounted && doc !== undefined)');
		const inited = _initEditorView(doc);
		dispatchDocStore(doc);
		console.log('Quitting (_mounted && doc !== undefined)');
	}

	onDestroy(() => {
		if (view !== null) {
			view.destroy();
		}
	});
</script>

<div class="codemirror" bind:this={dom} />

<style>
	.codemirror {
		display: contents;
	}
</style>
