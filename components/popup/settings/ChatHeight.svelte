<script lang="ts">
    let chatMaxHeight: number = 300; // Default value

    function saveChatMaxHeight() {
        // Logic to save the chat max height
        console.log(`Chat max height saved: ${chatMaxHeight}px`);
    }

    function resetChatMaxHeight() {
        chatMaxHeight = 300; // Reset to default
        console.log(`Chat max height reset to default: ${chatMaxHeight}px`);
    }
</script>

<h2>Chat Height</h2>
<label>
    Max Chat Height: 
    <input
        type="number"
        bind:value={chatMaxHeight}
        min="100"
        max="999"
        placeholder="300"
    />
</label>
px
<button on:click={saveChatMaxHeight} class="btn">Save</button>
<button on:click={resetChatMaxHeight} class="btn">Default</button>