<script>
	import Word from './Word.svelte';
	export let name;
	import {unified} from 'unified';
	import english from 'retext-english';
	import debounce from 'debounce';

	const processor = unified().use(english);

	function update(event) {
		var tree = processor.parse('This is a sentence.');
		// console.log(tree);
		// console.log(event);
		canvas = [...changes, changes];
		changes = [];
	}

	const changes = [];
	function recordChange(event) {
		changes.push(event.data);
		update(event);
	}
	let change = debounce(update, 300);
	const canvas = [];
</script>

<main>
	<h1>{name}</h1>
	<!-- oninput onchange onkeyup onmouseup onpaste -->
	<div class="editor">
		<div class="canvas">{canvas}</div>
		<div class="input" contenteditable="true" on:input={recordChange}></div>
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
		padding: 0.75in;
		line-height: 1.6;
		font-size: 12pt;
		text-align: left;
		width: 8.5in;
		box-sizing: border-box;
	}

	.input,.canvas {
		outline: none;
		position: absolute;
		width:100%;
		height:100%;
	}

	.canvas {
		background-color: red;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>