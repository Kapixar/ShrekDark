import './style.css';

export default defineContentScript({
    matches: ['https://*.drednot.io/*'],
    main() {
        console.log('Hello content.');
    },
});
