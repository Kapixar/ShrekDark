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

export type FeatureType = {
    icon: string;
    label: string;
    component: any; // Replace with specific Svelte component type
    color: string;
    hasSettings: boolean;
};

const features: FeatureType[] = [
    {
        icon: "language",
        label: "Built-in Translator",
        component: ChatTranslator,
        color: "#4CAF50",
        hasSettings: true
    },
    { icon: "join", label: "Interactive Invites", component: Features, color: "#2196F3", hasSettings: false },
    {
        icon: "manage_accounts",
        label: "Player Management",
        component: ButtonsManager,
        color: "#FF9800",
        hasSettings: true
    },
    {
        icon: "quick_phrases",
        label: "Quick Phrases",
        component: FavouritePhrases,
        color: "#9C27B0",
        hasSettings: true
    },
    {
        icon: "call_missed",
        label: "Missed Messages Alert",
        component: Features,
        color: "#F44336",
        hasSettings: false,
    },
    { icon: "expand", label: "Expandable Chat", component: ChatHeight, color: "#00BCD4", hasSettings: true },
    { icon: "animation", label: "Smooth Animations", component: Features, color: "#3F51B5", hasSettings: false },
    { icon: "view_list", label: "Player List (TAB)", component: Features, color: "#673AB7", hasSettings: false },
    {
        icon: "refresh",
        label: "Rejoin & Quick Actions",
        component: Features,
        color: "#E91E63",
        hasSettings: false
    },
    {
        icon: "tune",
        label: "Customizable Buttons",
        component: ButtonsManager,
        color: "#009688",
        hasSettings: true
    },
    { icon: "dashboard", label: "Modern Game Menu", component: Features, color: "#FFEB3B", hasSettings: false },
    { icon: "palette", label: "Custom UI Colors", component: UITheme, color: "#8BC34A", hasSettings: true },
    { icon: "height", label: "Custom Scrollbars", component: Scrollbar, color: "#795548", hasSettings: true },
    { icon: "keyboard", label: "Hotkeys Support", component: Hotkeys, color: "#607D8B", hasSettings: true },
    { icon: "videocam", label: "Cinematic Mode", component: Features, color: "#D32F2F", hasSettings: false },
    {
        icon: "favorite",
        label: "Favorite Ships",
        component: FavouriteShips,
        color: "#C2185B",
        hasSettings: true
    },
    {
        icon: "helicopter",
        label: "Snakecopter Mode",
        component: Snakecopter,
        color: "#6F4EA3",
        hasSettings: true
    },
    {
        icon: "antigravity",
        label: "Save Gravity Direction",
        component: GravitySave,
        color: "#00796B",
        hasSettings: true
    },
    { icon: "wallpaper", label: "Quick Texture Swap", component: TxtSwap, color: "#BF360C", hasSettings: true },
    {
        icon: "sos",
        label: "Discord Distress Ping",
        component: EmergencyPing,
        color: "#512DA8",
        hasSettings: true
    },
    { icon: "bar_chart", label: "Crew Statistics", component: Features, color: "#0097A7", hasSettings: false },
    { icon: "info", label: "Enhanced Kick Screen", component: Features, color: "#455A64", hasSettings: false },
];

export default features;