<script lang="ts">
    let phrases = [];
    let newPhraseText = '';
    let newPhraseMessage = '';

    function addPhrase() {
        if (newPhraseText && newPhraseMessage) {
            phrases.push({ text: newPhraseText, message: newPhraseMessage });
            newPhraseText = '';
            newPhraseMessage = '';
        }
    }

    function removePhrase(index) {
        phrases.splice(index, 1);
    }
</script>

<h2>Favourite Phrases</h2>
<table id="word-table">
    <thead>
        <tr>
            <th>Button text</th>
            <th>Message</th>
            <th colspan="2">Options</th>
        </tr>
    </thead>
    <tbody>
        {#each phrases as phrase, index}
            <tr>
                <td>{phrase.text}</td>
                <td>{phrase.message}</td>
                <td class="remove" on:click={() => removePhrase(index)}>Remove</td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <td><input placeholder="Text" bind:value={newPhraseText} /></td>
            <td><textarea placeholder="Message" bind:value={newPhraseMessage}></textarea></td>
            <td colspan="2" class="add" on:click={addPhrase}>Add</td>
        </tr>
    </tfoot>
</table>