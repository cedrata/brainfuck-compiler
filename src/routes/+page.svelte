<script>
	import CodeMirror from '$lib/components/CodeMirror.svelte';
	import { compile } from '$lib/compiler';

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
	<header class="min-h-16 bg-accent flex justify-center px-8">
		<div class="max-w-7xl w-full flex-grow flex justify-between">
			<a href="https://github.com/cedrata/brainfuck-compiler" class="flex hover:bg-accent-focus"><div class="self-center font-bold">BF-Compiler</div></a>
			<a href="https://ko-fi.com/cedrata" class="flex hover:bg-accent-focus"
				><div class="self-center">Wunt sum Cedrata?</div></a
			>
		</div>
	</header>
	<section class="flex justify-center px-8 mt-8">
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
					<!-- <button
						title="Format the given code"
						class="bg-neutral text-base-100 px-4 hover:bg-neutral-500">FMT</button
					> -->
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
	<section class="flex flex-grow justify-center px-8 mt-8">
		<div class="max-w-7xl w-full">
			<h3 class="font-bold">Some context</h3>
			<p>This is a simple brainf*uck compiler, you are maybe asking: "why?", well, because I wanted to. My purpose was to build something with a web based text editor, the simplest thing possible. If you'd like to have a look at the code just click <a href="https://github.com/cedrata/brainfuck-compiler" class="text-accent hover:text-accent-focus">here</a>.</p>
			<h3 class="font-bold pt-4">How to use</h3>
			<p>On the left editor type your brainf*ck code or import it with the "UPL" button.</p>
			<p>Once the code is ready you can simply hit the "RUN" button to transform it to C code.</p>
			<p>You can now download the compiler code with the "DNL" button and try it out.</p>
			<p class="pt-4">At this point just try the code compiling it with a C compiler (you can use also an online C compiler like <a href="https://www.onlinegdb.com/online_c_compiler" class="text-accent hover:text-accent-focus">this one</a>)</p>
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
