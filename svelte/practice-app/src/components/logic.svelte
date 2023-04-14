<script lang="ts">
	let show = true;
	const cats = ['Mao', 'Mew', 'Mano'];

	const toggleShow = () => (show = !show);
</script>

<h4>Conditional Rendering</h4>

{#if show}
	<p>This part is only rendered if show = {show}</p>
{:else}
	<p>This part is rendered as an else when show = {show}</p>
{/if}

<button on:click={toggleShow}>Toggle</button>

<h4>Iterating</h4>

{#each cats as cat, i}
	<p>There is the cat {cat} at index={i}</p>
{/each}
