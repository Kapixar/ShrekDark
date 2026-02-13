<script lang="ts">
    let hotkeys = [
        { functio: "Exit", key: "" },
        { functio: "Rejoin", key: "" },
        { functio: "Snakecopter", key: "" },
        { functio: "Save ship", key: "" },
        { functio: "Swap TXT", key: "" },
    ];

    function saveHotkeys() {
        // Logic to save hotkeys configuration
    }
</script>

<h2>Hotkeys</h2>
<table id="key-table">
    <thead>
        <tr>
            <th>Function</th>
            <th>Key</th>
        </tr>
    </thead>
    <tbody>
        {#each hotkeys as { functio, key }}
            <tr>
                <td>{functio}</td>
                <td><input type="text" bind:value={key} maxlength="1" /></td>
            </tr>
        {/each}
        <tr>
            <td colspan="2" class="add" on:click={saveHotkeys}>Save</td>
        </tr>
    </tbody>
</table>
<ul>
    <li>Gravity buttons are set on arrows.</li>
    <li>Ship manager is set on Tab</li>
    <li>CTRL+ENTER to translate chat input</li>
    <li>Enter nothing to disable.</li>
    <li>These hotkeys don't work in chat</li>
</ul>