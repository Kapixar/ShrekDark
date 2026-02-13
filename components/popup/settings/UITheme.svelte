<script lang="ts">
    // UI Theme settings
    let mainColor = "#ffffff";
    let opacity = 0.9;

    function resetToDefault() {
        mainColor = "#ffffff";
        opacity = 0.9;
    }

    function saveSettings() {
        // Logic to save the settings
        console.log("Settings saved:", { mainColor, opacity });
    }
</script>

<h2>UI Theme</h2>
<label>Main color: <input type="color" bind:value={mainColor} /></label>
<label>Opacity: <input type="range" bind:value={opacity} min="0" max="1" step="0.1" /></label>
<button on:click={saveSettings} class="btn">Save</button>
<button on:click={resetToDefault} class="btn">Default</button>