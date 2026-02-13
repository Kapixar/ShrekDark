<script lang="ts">
    let texturePack: File | null = null;
    let currentPack: string = "default shrek's pack";

    function handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            texturePack = input.files[0];
            currentPack = texturePack.name;
        }
    }

    function removeTexturePack() {
        texturePack = null;
        currentPack = "default shrek's pack";
    }
</script>

<h2>TXT Swap</h2>
<input type="file" id="txt-input" accept="application/x-zip-compressed" on:change={handleFileUpload} />
<label for="txt-input">Choose Texture pack</label>
<button on:click={removeTexturePack}>Remove</button>
<p>Status: <span id="txt-current">{currentPack}</span></p>