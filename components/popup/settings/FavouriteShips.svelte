<script lang="ts">
    let favShips = [];
    let newFavText = '';
    let newFavId = '';
    let newFavColor = '#000000';

    function addFavoriteShip() {
        if (newFavText && newFavId) {
            favShips.push({
                text: newFavText,
                id: newFavId,
                color: newFavColor
            });
            newFavText = '';
            newFavId = '';
            newFavColor = '#000000';
        }
    }

    function removeFavoriteShip(index) {
        favShips.splice(index, 1);
    }
</script>

<h2>Favourite Ships</h2>
<table id="fav-table">
    <thead>
        <tr>
            <th>Button text</th>
            <th>Ship ID</th>
            <th>Color</th>
            <th colspan="2">Options</th>
        </tr>
    </thead>
    <tbody>
        {#each favShips as ship, index}
            <tr>
                <td>{ship.text}</td>
                <td>{ship.id}</td>
                <td style="background-color: {ship.color};">{ship.color}</td>
                <td><button on:click={() => removeFavoriteShip(index)}>Remove</button></td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <td><input placeholder="Text" bind:value={newFavText} /></td>
            <td><input placeholder="Ship ID" bind:value={newFavId} /></td>
            <td><input placeholder="#000" type="color" bind:value={newFavColor} /></td>
            <td colspan="2" class="add" on:click={addFavoriteShip}>Add button</td>
        </tr>
    </tfoot>
</table>
<label><input type="checkbox" id="favcheck" />Hide favourite ship from top bar</label>