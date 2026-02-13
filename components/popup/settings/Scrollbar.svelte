<script lang="ts">
    // Scrollbar customization options
    let trackColor = "#000000";
    let thumbColor = "#FFFFFF";
    let isTransparent = false;
</script>

<h2>Scrollbar</h2>
<label>Track: <input type="color" bind:value={trackColor} /></label>
<label>Thumb: <input type="color" bind:value={thumbColor} /></label>
<label>Transparent: <input type="checkbox" bind:checked={isTransparent} /></label>