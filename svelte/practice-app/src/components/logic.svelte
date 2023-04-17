<script lang="ts">
	let show = true;
	const cats = ['Mao', 'Mew', 'Mano'];

	const toggleShow = () => (show = !show);

	const promise = new Promise<string>((resolve, _reject) => resolve('Hello world'));
</script>

<h4>Conditional Rendering</h4>

{#if show}
	<p>This part is only rendered if show = {show}</p>
{:else}
	<p>This part is rendered as an else when show = {show}</p>
{/if}

<button on:click={toggleShow}>Toggle</button>

<h4>Iterating</h4>

<!-- `(cat)` is a unique identifier for an array element. It makes sure
that the right component is being rendered at the right index. Much like
`key` in React. -->
{#each cats as cat, i (cat)}
	<p>There is the cat {cat} at index={i}</p>
{/each}

<h4>Promises</h4>

<!-- Cool way to handle promises. -->
{#await promise}
	<p>Awaiting promise</p>
{:then value}
	<p>Promise resolved with {value}</p>
{:catch}
	<p>Promise rejected</p>
{/await}

<!-- Shorthand -->
<!-- {#await promise then value}
	<p>Promise resolved with {value}</p>
{/await} -->
