<script lang="ts">
	let mouse = { x: 0, y: 0 };
</script>

<!-- Inline Event Handler -->
<div on:mousemove={(event) => (mouse = { x: event.clientX, y: event.clientY })}>
	Mouse position is {mouse.x} and {mouse.y} y.
</div>
