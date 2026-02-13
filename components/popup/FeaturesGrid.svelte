<script lang="ts">

    const { features, onFeatureClick } = $props<{
        features: Array<{ icon: string; label: string; component: any }>;
        onFeatureClick: (index: number) => void;
    }>();
    
</script>

<h2>Features</h2>
<div class="features-grid">
    {#each features as feature, index}
        <div class="feature-item" onclick={() => onFeatureClick(index)}>
            <span class="material-symbols-outlined">{feature.icon}</span>
            <span>{feature.label}</span>
        </div>
    {/each}
</div>

<style>
    .feature-item {
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
    }

    .feature-item:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.05);
    }

    .feature-item:active {
        transform: translateY(0);
    }
</style>
