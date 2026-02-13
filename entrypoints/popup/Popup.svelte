<script lang="ts">
    import About from "@/components/popup/About.svelte";
    import FeaturesGrid from "@/components/popup/FeaturesGrid.svelte";
    import Help from "@/components/popup/Help.svelte";
    import extensionIcon from "~/assets/icon.svg";

    // Import feature components
    import ChatTranslator from "@/components/popup/settings/ChatTranslator.svelte";
    import ButtonsManager from "@/components/popup/settings/ButtonsManager.svelte";
    import FavouritePhrases from "@/components/popup/settings/FavouritePhrases.svelte";
    import ChatHeight from "@/components/popup/settings/ChatHeight.svelte";
    import UITheme from "@/components/popup/settings/UITheme.svelte";
    import Scrollbar from "@/components/popup/settings/Scrollbar.svelte";
    import Hotkeys from "@/components/popup/settings/Hotkeys.svelte";
    import FavouriteShips from "@/components/popup/settings/FavouriteShips.svelte";
    import Snakecopter from "@/components/popup/settings/Snakecopter.svelte";
    import GravitySave from "@/components/popup/settings/GravitySave.svelte";
    import TxtSwap from "@/components/popup/settings/TxtSwap.svelte";
    import EmergencyPing from "@/components/popup/settings/EmergencyPing.svelte";
    import Features from "@/components/popup/settings/Features.svelte";

    let selectedFeatureIndex = $state<number | null>(null);

    const features = [
        {
            icon: "language",
            label: "Built-in Translator",
            component: ChatTranslator,
        },
        { icon: "join", label: "Interactive Invites", component: Features },
        {
            icon: "manage_accounts",
            label: "Player Management",
            component: ButtonsManager,
        },
        {
            icon: "quick_phrases",
            label: "Quick Phrases",
            component: FavouritePhrases,
        },
        {
            icon: "call_missed",
            label: "Missed Messages Alert",
            component: Features,
        },
        { icon: "expand", label: "Expandable Chat", component: ChatHeight },
        { icon: "animation", label: "Smooth Animations", component: Features },
        { icon: "view_list", label: "Player List (TAB)", component: Features },
        {
            icon: "refresh",
            label: "Rejoin & Quick Actions",
            component: Features,
        },
        {
            icon: "tune",
            label: "Customizable Buttons",
            component: ButtonsManager,
        },
        { icon: "dashboard", label: "Modern Game Menu", component: Features },
        { icon: "palette", label: "Custom UI Colors", component: UITheme },
        { icon: "height", label: "Custom Scrollbars", component: Scrollbar },
        { icon: "keyboard", label: "Hotkeys Support", component: Hotkeys },
        { icon: "videocam", label: "Cinematic Mode", component: Features },
        {
            icon: "favorite",
            label: "Favorite Ships",
            component: FavouriteShips,
        },
        {
            icon: "helicopter",
            label: "Snakecopter Mode",
            component: Snakecopter,
        },
        {
            icon: "antigravity",
            label: "Save Gravity Direction",
            component: GravitySave,
        },
        { icon: "wallpaper", label: "Quick Texture Swap", component: TxtSwap },
        {
            icon: "sos",
            label: "Discord Distress Ping",
            component: EmergencyPing,
        },
        { icon: "bar_chart", label: "Crew Statistics", component: Features },
        { icon: "info", label: "Enhanced Kick Screen", component: Features },
    ];

    function openFeature(index: number) {
        selectedFeatureIndex = index;
    }

    function closeFeature() {
        selectedFeatureIndex = null;
    }

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
</script>

<nav>
    <img src={extensionIcon} alt="Extension icon" />
    <h1 class="mainName">
        <span>Shrek</span>
        <span>Dark</span>
    </h1>
</nav>

<main>
    <About />

    <FeaturesGrid {features} onFeatureClick={openFeature} />

    <Help />
</main>

{#if selectedFeatureIndex !== null}
    <div class="feature-modal-overlay">
        <div class="feature-modal-content">
            <div class="feature-modal-header">
                <h2>{features[selectedFeatureIndex].label}</h2>
                <div class="feature-modal-controls">
                    <button
                        class="nav-btn"
                        onclick={navigatePrevious}
                        title="Previous feature"
                    >
                        <span class="material-symbols-outlined">arrow_back</span
                        >
                    </button>
                    <button
                        class="nav-btn"
                        onclick={navigateNext}
                        title="Next feature"
                    >
                        <span class="material-symbols-outlined"
                            >arrow_forward</span
                        >
                    </button>
                    <button
                        class="close-btn"
                        onclick={closeFeature}
                        title="Close"
                    >
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            <div class="feature-modal-body">
                <svelte:component
                    this={features[selectedFeatureIndex].component}
                />
            </div>
        </div>
    </div>
{/if}

<style>
    .feature-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        z-index: 1000;
    }

    .feature-modal-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--bg-color, #1a1a1a);
        margin-top: var(--nav-height, 60px);
        overflow: hidden;
    }

    .feature-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.3);
    }

    .feature-modal-header h2 {
        margin: 0;
        font-size: 1.25rem;
        color: var(--text-color, #fff);
    }

    .feature-modal-controls {
        display: flex;
        gap: 0.5rem;
    }

    .nav-btn,
    .close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 4px;
        padding: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
        color: var(--text-color, #fff);
    }

    .nav-btn:hover,
    .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .close-btn {
        background: rgba(220, 53, 69, 0.8);
    }

    .close-btn:hover {
        background: rgba(220, 53, 69, 1);
    }

    .feature-modal-body {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem;
    }
</style>
