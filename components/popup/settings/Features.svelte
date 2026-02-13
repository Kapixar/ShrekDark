<script lang="ts">
    const features = [
        { icon: "language", label: "Built-in Translator" },
        { icon: "join", label: "Interactive Invites" },
        { icon: "manage_accounts", label: "Player Management" },
        { icon: "quick_phrases", label: "Quick Phrases" },
        { icon: "call_missed", label: "Missed Messages Alert" },
        { icon: "expand", label: "Expandable Chat" },
        { icon: "animation", label: "Smooth Animations" },
        { icon: "view_list", label: "Player List (TAB)" },
        { icon: "refresh", label: "Rejoin & Quick Actions" },
        { icon: "tune", label: "Customizable Buttons" },
        { icon: "dashboard", label: "Modern Game Menu" },
        { icon: "palette", label: "Custom UI Colors" },
        { icon: "height", label: "Custom Scrollbars" },
        { icon: "keyboard", label: "Hotkeys Support" },
        { icon: "videocam", label: "Cinematic Mode" },
        { icon: "favorite", label: "Favorite Ships" },
        { icon: "helicopter", label: "Snakecopter Mode" },
        { icon: "antigravity", label: "Save Gravity Direction" },
        { icon: "wallpaper", label: "Quick Texture Swap" },
        { icon: "sos", label: "Discord Distress Ping" },
        { icon: "bar_chart", label: "Crew Statistics" },
        { icon: "info", label: "Enhanced Kick Screen" },
    ];
</script>

<h2>Features</h2>
<div class="features-grid">
    {#each features as feature}
        <div>
            <span class="material-symbols-outlined">{feature.icon}</span>
            <span>{feature.label}</span>
        </div>
    {/each}
</div>