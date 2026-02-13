<script lang="ts">
    let gravId: string = '';
    let gravDir: string = '3'; // Default to down

    function addGravitySave() {
        // Logic to save the gravity direction for the specified ship ID
        console.log(`Saving gravity direction for Ship ID: ${gravId} to direction: ${gravDir}`);
    }
</script>

<h2>Gravity Save</h2>
<p>Save gravity direction of your ship</p>
<p>Applies on joining desired ship</p>
<table id="gravity-table">
    <thead>
        <tr>
            <th>Ship ID</th>
            <th>Gravity direction</th>
            <th colspan="2">Options</th>
        </tr>
    </thead>
    <tbody>
        <!-- Existing gravity saves will be listed here -->
    </tbody>
    <tfoot>
        <tr>
            <td><input placeholder="Ship ID" bind:value={gravId} type="text" /></td>
            <td>
                <select bind:value={gravDir}>
                    <option value="0">up</option>
                    <option value="1">left</option>
                    <option value="2">right</option>
                    <option value="3">down</option>
                </select>
            </td>
            <td colspan="2" class="add" on:click={addGravitySave}>Add</td>
        </tr>
    </tfoot>
</table>