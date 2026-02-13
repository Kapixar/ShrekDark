import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: "ShrekDark",
        description: "New Shrek's custom extension. Everything that should already be in the game... and more",
        version: "4.0",
        email: "kapixar03@gmail.com",
        manifest_version: 3,
        permissions: [
            "storage",
            "unlimitedStorage"
        ],
        host_permissions: ["https://drednot.io/"],
        web_accessible_resources: [
            {
                resources: ["shrekPack.zip", "https://api.npoint.io/*", "/huge_signs/mosaic.png", "Halo.ttf", "Sen-Regular.ttf"],
                matches: ["https://*.drednot.io/*"]
            }
        ]
    },
    modules: ['@wxt-dev/module-svelte'],
    webExt: {
        chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
    }
});
