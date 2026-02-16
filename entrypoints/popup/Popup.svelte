<script lang="ts">
    import About from "@/components/popup/About.svelte";
    import FeaturesGrid from "@/components/popup/FeaturesGrid.svelte";
    import Help from "@/components/popup/Help.svelte";
    import extensionIcon from "~/assets/icon.svg";
    import features from "@/components/popup/featureList";

    import { fade } from "svelte/transition";

    let selectedFeatureIndex = $state<number | null>(null);

    function navigateNext() {
        if (selectedFeatureIndex !== null) {
            selectedFeatureIndex = (selectedFeatureIndex + 1) % features.length;
        }
    }

    function navigatePrevious() {
        if (selectedFeatureIndex !== null) {
            selectedFeatureIndex =
                (selectedFeatureIndex - 1 + features.length) % features.length;
        }
    }

    let scrollY = $state(0);
    let savedScrollPosition = $state(0);
    let mainElement: HTMLElement;

    function handleScroll() {
        scrollY = mainElement.scrollTop;
    }

    // Restore scroll position when returning to main view
    $effect(() => {
        if (selectedFeatureIndex === null && mainElement) {
            mainElement.scrollTop = savedScrollPosition;
        }
    });

    function openFeature(index: number) {
        savedScrollPosition = scrollY;
        selectedFeatureIndex = index;
    }

    function closeFeature() {
        selectedFeatureIndex = null;
    }
</script>

<!-- <svelte:window bind:scrollY /> -->

<nav class:scrolled={scrollY > 30 || selectedFeatureIndex !== null}>
    <img src={extensionIcon} alt="Extension icon" />
    <h1 class="mainName">
        <span>Shrek</span>
        <span>Dark</span>
    </h1>
</nav>

{#if selectedFeatureIndex !== null}
    <div class="feature-modal-content" transition:fade>
        <div class="feature-modal-header">
            <h2>{features[selectedFeatureIndex].label}</h2>
            <div class="feature-modal-controls">
                <button
                    class="nav-btn"
                    onclick={navigatePrevious}
                    title="Previous feature"
                >
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                    class="nav-btn"
                    onclick={navigateNext}
                    title="Next feature"
                >
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
                <button class="close-btn" onclick={closeFeature} title="Close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
        <div class="feature-modal-body">
            {#if selectedFeatureIndex !== null}
                {@const Component = features[selectedFeatureIndex].component}
                <Component />
            {/if}
        </div>
    </div>
{:else}
    <main bind:this={mainElement} onscroll={handleScroll} transition:fade>
        <About />
        
        <Help />

        <FeaturesGrid {features} onFeatureClick={openFeature} />
    </main>
{/if}

<style>
    .feature-modal-content {
        position: absolute;
        top: 4rem;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--background);
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    .feature-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .feature-modal-controls {
        display: flex;
        gap: 0.5rem;
    }

    
</style>
