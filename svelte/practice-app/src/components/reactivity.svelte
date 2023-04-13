<script lang="ts">
	// Any changes to this variable will be reflected in the DOM.
	let randomNumber = 0;

	const changeNumber = () => {
		randomNumber = Math.round(Math.random() * 100000);
	};

	// However, this type of reactivity doesn't work if the values inside
	// an object/array change unless the object/array variable is assigned
	// a new value.
	let numbers: number[] = [];

	const addNumber = () => {
		numbers[numbers.length] = numbers.length + 1;
		// Or
		// numbers.push(numbers.length + 1);
		// numbers = numbers;
	};

	// This is reactivity. Any changes to the `numbers` variable will
	// trigger a reassignment for `sum`.
	$: sum = numbers.reduce((total, number) => total + number, 0);
</script>

<p>Reactivity in Svelte is very intuitive. Here is a random number: {randomNumber}</p>
<button on:click={changeNumber}>Generate</button>

<p>{numbers.join(' + ')} = {sum}</p>
<button on:click={addNumber}>Add</button>
