<script lang="ts">
    import type { FeatureType } from "./featureList";

    const { features, onFeatureClick } = $props<{
        features: FeatureType[];
        onFeatureClick: (index: number) => void;
    }>();

    let searchQuery = $state("");

    const filteredFeatures = $derived(
        features.filter((feature: FeatureType) =>
            feature.label.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
</script>

<h2>Features</h2>
<div class="search-container">
    <span class="material-symbols-outlined search-icon">search</span>
    <input
        type="text"
        class="search-input"
        placeholder="Search features..."
        bind:value={searchQuery}
    />
    {#if searchQuery}
        <button class="clear-button" onclick={() => (searchQuery = "")}>
            <span class="material-symbols-outlined">close</span>
        </button>
    {/if}
</div>
<div class="features-grid">
    {#each filteredFeatures as feature, index}
        <button
            class="feature-item"
            style="--accent-color: {feature.color}"
            onclick={() => onFeatureClick(features.indexOf(feature))}
        >
            <span class="material-symbols-outlined">{feature.icon}</span>
            <span>{feature.label}</span>
            {#if feature.hasSettings}
                <i class="material-symbols-outlined"> settings </i>
            {/if}
        </button>
    {/each}
    {#if filteredFeatures.length === 0}
        <div class="no-results">
            <span class="material-symbols-outlined">search_off</span>
            <p>No features found</p>
        </div>
    {/if}
    {#if filteredFeatures.length >= 0 && searchQuery === ""}
        <button
            class="feature-item"
            style="--accent-color: #fff"
        >
            <span class="material-symbols-outlined">add</span>
            <span>Add Feature</span>
        </button>
    {/if}
</div>

<style>
    .search-container {
        position: relative;
        margin-bottom: 1.5em;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 0.75em;
        color: color-mix(in srgb, var(--text) 50%, transparent);
        font-size: 1.25em;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 0.75em 2.5em 0.75em 2.5em;
        border: 0.1em solid color-mix(in srgb, var(--text) 20%, transparent);
        border-radius: 0.5em;
        background-color: var(--background);
        color: var(--text);
        font-size: 1em;
        font-family: inherit;
        transition: all 0.2s ease-in-out;
    }

    .search-input:focus {
        outline: none;
        border-color: color-mix(in srgb, var(--text) 50%, transparent);
    }

    .search-input::placeholder {
        color: color-mix(in srgb, var(--text) 40%, transparent);
    }

    .clear-button {
        position: absolute;
        right: 0.5em;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: color-mix(in srgb, var(--text) 50%, transparent);
        transition: color 0.2s ease-in-out;
    }

    .clear-button:hover {
        color: var(--text);
    }

    .clear-button span {
        font-size: 1.25em;
    }

    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
    }

    .no-results span {
        font-size: 3em;
        opacity: 0.3;
    }

    .no-results p {
        margin: 0;
        font-size: 1.1em;
        color: var(--text);
        opacity: 0.5;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5em;
    }

    .feature-item {
        position: relative;
        overflow: hidden;
        --border-radius: 0.5em;

        border-radius: var(--border-radius);

        aspect-ratio: 1;
        padding: 1.2em;
        font-weight: 800;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 0.5em;
        background-color: white;
        text-align: left;
        margin: 0;

        cursor: pointer;
        user-select: none;

        color: var(--accent-color);

        border: 0.1em solid
            color-mix(in srgb, var(--accent-color) 50%, var(--background) 50%);
        border-radius: calc(var(--border-radius));
        background-color: var(--background);

        transition: all 0.2s ease-in-out;

        span:first-of-type {
            position: absolute;
            top: -0.1em;
            left: -0.2em;
            rotate: 20deg;
            font-size: 7em;
            opacity: 0.5;
            color: var(--accent-color);
            z-index: 0;

            transition: all 0.2s ease-in-out;
        }

        span:last-of-type {
            z-index: 1;
        }

        i {
            position: absolute;
            top: 0.5em;
            right: 0.5em;
        }
    }

    .feature-item:hover {
        border-color: var(--accent-color);
        background-color: color-mix(
            in srgb,
            var(--accent-color) 10%,
            var(--background) 90%
        );

        span:first-of-type {
            rotate: 10deg;
            translate: 0.1em 0;
        }
    }

    .feature-item:active {
        transform: translateY(0);
    }
</style>
