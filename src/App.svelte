<script>
	import Word from './Word.svelte';
	export let name;
	import {unified} from 'unified';
	import english from 'retext-english';
	import debounce from 'debounce';

	const processor = unified().use(english);

	function update() {
		cursorEnd = canvasElement.selectionEnd;
		console.log(cursorStart, cursorEnd);
		let newText = changes.join('');
		console.log(newText);
		var tree = processor.parse(newText);
		console.log(tree);
		canvas.push(...changes);

		// Reset our edit starting position.
		changes = [];
		cursorStart = canvasElement.selectionStart;
	}

	function recordChange(event) {
		changes.push(event.data);
		change();
	}
	let change = debounce(update, 300);

	let canvasElement;
	let cursorStart = 0;
	let cursorEnd = 0;
	let changes = [];
	let canvas = [];
</script>

<main>
	<h1>{name}</h1>
	<!-- oninput onchange onkeyup onmouseup onpaste -->
	<div class="editor">
		<textarea class="canvas" contenteditable="true" on:input={recordChange} bind:this={canvasElement}></textarea>
	</div>
	<p><Word/> <Word/> <Word/> <Word/> <Word/></p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.editor {
		position: relative;
		min-height: 100vh;
		border: lightgrey solid 1px;
		margin: auto;
		/* padding: 0.75in; */
		line-height: 1.6;
		font-size: 12pt;
		text-align: left;
		width: 8.5in;
		box-sizing: border-box;
	}

	.canvas {
		outline: none;
		position: absolute;
		width:100%;
		height:100%;
	}

	.canvas {
		background-color: white;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>