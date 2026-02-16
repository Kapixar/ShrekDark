const defaultConfig = { childList: true, attributes: true, subtree: true };

export function observeNode(node: Element | null, func: () => void, loop = false, conf = defaultConfig) {
    if (!node) return;
    let observer = new MutationObserver(() => {
        func();
        if (!loop) {
            observer.disconnect();
        }
    });
    observer.observe(node, conf);
}

export const chatSendBtn = document.getElementById("chat-send")!;
export const chatContainer = document.getElementById("chat")!;
export const chatInput = document.getElementById("chat-input") as HTMLInputElement;
export const bigUiContainer = document.querySelector('#big-ui-container')!;
export const exitBtn = document.getElementById("exit_button")!;
export const manageBtn = document.getElementById("team_manager_button")!;
export const commsInput = document.getElementById("comms-input") as HTMLInputElement;
export const chatContent = document.querySelector("#chat-content")!;
export const commsContent = document.querySelector("#comms-text")!;
export const teamMenu = document.getElementById("team_menu")!;
export const disconnectPopup = document.getElementById("disconnect-popup")!;
export const buttonContainer = document.querySelector(".button-container")!;
export const topBar = document.querySelector('#top-bar')!;


export function isCaptain() {
    return manageBtn?.getAttribute("style") == "";
}


export function sendChat(mess: string) {
    if (chatContainer?.classList.contains('closed')) chatSendBtn?.click();
    if (chatInput) chatInput.value = mess;
    chatSendBtn?.click();
}

var chatTimeLimit = 60000, chatLastTime = 0;
export function sendFunnyChat(mess: string) {
    if (chatLastTime + chatTimeLimit >= Date.now()) return;
    chatLastTime = Date.now()
    if (chatContainer?.classList.contains('closed')) {
        chatSendBtn?.click();
        if (chatInput) chatInput.value = mess;
        chatSendBtn?.click();
    }
}