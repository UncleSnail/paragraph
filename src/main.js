import App from './App.svelte';
import {unified} from 'unified';
import english from 'retext-english';

const processor = unified().use(english);
var tree = processor.parse('This is a sentence.')
console.log(tree);

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;