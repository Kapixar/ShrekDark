import './style.css';
import Popup from './Popup.svelte';
import { mount } from 'svelte';

const app = mount(Popup, {
    target: document.getElementById('app') as HTMLElement,
});

export default app;
