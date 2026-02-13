<script lang="ts">
    let duration: number = 5; // Default duration in seconds

    function updateDuration(event: Event) {
        const target = event.target as HTMLInputElement;
        duration = Number(target.value);
    }
</script>

<h2>Snakecopter</h2>
<label>Duration: <input type="range" min="5" max="600" bind:value={duration} on:input={updateDuration} /></label>
<p><span>{duration}</span> seconds. Updates in game in real time.</p>