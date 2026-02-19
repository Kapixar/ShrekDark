import { chatContainer, chatInput, chatSendBtn, manageBtn } from "./selectors";

const defaultConfig = { childList: true, attributes: true, subtree: true };

export function observeNode(
    node: Element | null,
    func: () => void,
    loop = false,
    conf = defaultConfig,
) {
    if (!node) return;
    let observer = new MutationObserver(() => {
        func();
        if (!loop) {
            observer.disconnect();
        }
    });
    observer.observe(node, conf);
}

export const isCaptain = () => manageBtn?.getAttribute("style") == "";

export function sendChat(mess: string) {
    if (chatContainer?.classList.contains("closed")) chatSendBtn?.click();
    if (chatInput) chatInput.value = mess;
    chatSendBtn?.click();
}

var chatTimeLimit = 60000,
    chatLastTime = 0;
export function sendFunnyChat(mess: string) {
    if (chatLastTime + chatTimeLimit >= Date.now()) return;
    chatLastTime = Date.now();
    if (chatContainer?.classList.contains("closed")) {
        chatSendBtn?.click();
        if (chatInput) chatInput.value = mess;
        chatSendBtn?.click();
    }
}

// Function uses Google Translate API, which is free to use and doesn't require an API key. It's the endpoint that Google translate page is hitting.
// It may have limitations on the number of requests you can make in a short period of time, and it may not be suitable for high-traffic.
// Additionally, the quality of translations may be tragic.
export function translate(text: string, from = "auto", to = "en") {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(text)}`;
    return new Promise((res, rej) => {
        fetch(url)
            .then((res) => res.json())
            .then((out) => {
                if (!out[0] || out[2] == to) rej("erorred");
                res([
                    out[0].map((subarray: string[]) => subarray[0]).join("\n"),
                    out[2],
                ]);
            })
            .catch((err) => rej(err));
    });
}

// if on test server
export const isTestEnvironment = () => document.URL.includes("test");
