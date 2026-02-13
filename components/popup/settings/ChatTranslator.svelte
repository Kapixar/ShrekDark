<script lang="ts">
    let langIn = '';
    let langOut = '';
    let autoTranslate = false;

    const handleAutoTranslateChange = (event: Event) => {
        autoTranslate = (event.target as HTMLInputElement).checked;
    };
</script>

<h2>Chat Translator</h2>
<p>
    To translate someone's messages double click on it (non-system messages)
</p>
<p>
    To translate your messages in input box use Ctrl+Enter or click the Globe
</p>
<p>
    <a
        class="btn"
        target="_blank"
        href="https://cloud.google.com/translate/docs/languages"
        >Language codes</a
    >
</p>
<hr />
<p>Choose language that you want phrases to be translated into</p>
<label for="langIn-input">Translate chat to: </label><br />
<input type="text" id="langIn-input" bind:value={langIn} maxlength="4" /><br />
<label for="langOut-input">By default translate my messages to: </label><br />
<input type="text" id="langOut-input" bind:value={langOut} maxlength="4" />
<p class="warning">
    Warning, enabling constant auto translation may cause lag
</p>
<label for="lang-auto">Auto translate chat</label>
<input type="checkbox" id="lang-auto" bind:checked={autoTranslate} on:change={handleAutoTranslateChange} />