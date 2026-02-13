<script lang="ts">
    let webhookUrl = '';
    let buttonText = '';
    let message = '';
    let username = '';

    function addPing() {
        // Logic to add the emergency ping configuration
    }
</script>

<h2>Emergency distress ping</h2>
<p>
    Quickly send emergency message to the discord webhook with ship name and
    ID
</p>
<p>If you are the captain on ship, it will also send invite</p>
<p>Pings goes to Message field</p>
<p>
    To ping here just do @here, to ping user you will need his ID
    (&lt;@2429274&gt;)
</p>
<table id="ping-table">
    <thead>
        <tr>
            <th>Webhook URL</th>
            <th>Button text</th>
            <th>Message</th>
            <th>Username</th>
            <th colspan="2">Options</th>
        </tr>
    </thead>
    <tbody>
        <!-- Existing configurations will be populated here -->
    </tbody>
    <tfoot>
        <tr>
            <td>
                <input
                    placeholder="https://discord.com/api/webhooks/..."
                    bind:value={webhookUrl}
                    type="url"
                />
            </td>
            <td>
                <input placeholder="Text" bind:value={buttonText} type="text" />
            </td>
            <td>
                <input
                    placeholder="@here come join"
                    bind:value={message}
                    type="text"
                />
            </td>
            <td>
                <input
                    placeholder="Distress caller"
                    bind:value={username}
                    type="text"
                />
            </td>
            <td colspan="2" class="add" on:click={addPing}>Add</td>
        </tr>
    </tfoot>
</table>