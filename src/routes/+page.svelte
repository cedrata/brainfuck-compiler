<script>
	import CodeMirror from '$lib/components/CodeMirror.svelte';
	import { compile } from '$lib/components/compiler';

	/** @type {number | null}*/
	let editorHeight = 500;

	/** @type {CodeMirror}*/
	let bfView;

	/** @type {CodeMirror}*/
	let cView;

	let initialDoc =
		'++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.';

	/**
	 * Function to open a single file .
	 * @returns {Promise<File>}
	 */
	function openFile() {
		return new Promise((resolve) => {
			/** @type {HTMLInputElement}*/
			let input = document.createElement('input');
			input.type = 'file';
			input.multiple = false;

			input.onchange = () => {
				if (input.files !== null) {
					let file = input.files[0];
					resolve(file);
				}
			};
			input.click();
		});
	}

	function updateBfDoc() {
		/** @type {string} */
		openFile().then((file) => {
			// readFile(result);
			file.text().then((content) => {
				// bfView.updateDoc(content);
				bfView.props.doc = content;
			});
		});
	}

	function getCDoc() {
		/** @type {HTMLAnchorElement}*/
		let elem = document.createElement('a');

		elem.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(cView.props.doc);
		console.log(elem);
		elem.download = 'output.c';

		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
	function run() {
		cView.props.doc = compile(bfView.props.doc).description;
	}
</script>

<div class="flex flex-col h-screen">
	<header class="h-16 bg-accent flex justify-center px-8">
		<div class="max-w-7xl w-full flex justify-between">
			<a href="/" class="flex"><div class="self-center">BF-Compiler</div></a>
			<a href="https://cedrata.github.io/portfolio" class="flex"
				><div class="self-center">Wunt sum Cedrata?</div></a
			>
		</div>
	</header>
	<section class="flex justify-center flex-grow px-8 mt-8">
		<div class="max-w-7xl w-full flex justify-between">
			<div
				id="txt-edit"
				class="grid lg:grid-cols-2 gap-x-16 max-md:grid-cols-1 w-full auto-rows-min"
			>
				<div
					id="tool-bar"
					class="col-start-1 lg:col-span-2 row-start-1 h-8 bg-neutral-100 flex flex-row space-x-4 gap-0"
				>
					<button
						title="Run the code compilation"
						class="bg-neutral text-base-100 px-4 hover:bg-neutral-500"
						on:click={run}>RUN</button
					>
					<button
						title="Format the given code"
						class="bg-neutral text-base-100 px-4 hover:bg-neutral-500">FMT</button
					>
					<button
						title="Upload a brainf*ck script from your computer"
						class="bg-neutral text-base-100 px-4 hover:bg-neutral-500"
						on:click={updateBfDoc}>UPL</button
					>
					<button
						title="Download the compilation result to your computer"
						class="bg-neutral text-base-100 px-4 hover:bg-neutral-500"
						on:click={getCDoc}>DNL</button
					>
				</div>
				<div class="lg:col-start-1 max-md:row-start-2 lg:row-start-2 lg:row-span-2">
					<CodeMirror {editorHeight} {initialDoc} bind:this={bfView} />
				</div>
				<div class="lg:hidden h-8 max-md:row-start-3" />
				<div class="lg:col-start-2 max-md:row-start-4 lg:row-start-2 lg:row-span-2">
					<CodeMirror
						{editorHeight}
						initialDoc={compile(initialDoc).description}
						bind:this={cView}
					/>
				</div>
			</div>
		</div>
	</section>
	<footer class="bg-secondary mt-8 py-4 px-8">
		<div class="flex justify-center align-middle">
			<p>
				Copyright © 2023 <a href="https://cedrata.github.io/portfolio">Cedrata</a>
			</p>
		</div>
	</footer>
</div>
