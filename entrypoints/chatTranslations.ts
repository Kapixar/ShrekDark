import {
    translate,
    observeNode,
} from "../components/utilities/utility";

import {
    chatContainer,
    chatContent,
    commsContent,
    chatInput,
} from "../components/utilities/selectors";

export default defineUnlistedScript(() => {
    // TODO: add loading animation

    let lang = "en";
    addChatTrans();
    let chatTranslate = document.getElementById(
        "opt_chat_translate",
    ) as HTMLInputElement;
    let langInput = document.getElementById("lang-input") as HTMLInputElement;

    function addChatTrans() {
        const translateButton = document.createElement("i");
        translateButton.classList.add("fas", "fa-globe", "btn-gray", "btn");

        const langIn = document.createElement("input");
        langIn.id = "lang-input";
        langIn.maxLength = 4;
        langIn.placeholder = "en";
        chatContainer.append(langIn);
        chatContainer.append(translateButton);

        translateButton.onclick = async () => {
            if (!chatInput.value || !langIn.value) return;
            const result = (await translate(
                chatInput.value,
                "auto",
                langIn.value == "" ? "en" : langIn.value,
            )) as [string, string];
            chatInput.value = result[0];
        };

        const autoTransLabel = document.createElement("label");
        autoTransLabel.textContent = "Auto Translate";
        const autoTrans = document.createElement("input");
        autoTrans.type = "checkbox";
        autoTrans.id = "opt_chat_translate";
        autoTrans.checked = false;
        autoTransLabel.prepend(autoTrans);
        document.querySelector("#chat > button + div")?.prepend(autoTransLabel);

        // TODO: refactor storing
        // browser.storage.sync.get("transl", function (result) {
        //     if (!result.transl) return;
        //     const transl = result.transl as any[];
        //     lang = transl[0];
        //     langIn.value = transl[1];
        //     autoTrans.checked = transl[2];
        // });
    }

    async function translateChatMessage(p: Element) {
        const text = p.textContent;
        if (text.indexOf(": ") == -1) return;
        const t = text.slice(text.indexOf(": ") + 2);
        if (!t) return;
        try {
            const [trans, origin] = (await translate(t, "auto", lang)) as [
                string,
                string,
            ];
            const messIcon = document.createElement("i");
            messIcon.classList.add("fas", "fa-globe");
            const messBdi = p.querySelector("b");
            const messTrans = document.createElement("span");
            messTrans.setAttribute("data-trans", "");
            messTrans.textContent = trans;
            const messPre = document.createElement("pre");
            messPre.textContent = `${origin}: ${t.replaceAll('"', "&quot;")}`;
            messPre.onclick = () => {
                langInput.value = origin;
            };
            p.replaceChildren();
            if (messBdi) p.append(messBdi, messIcon, messTrans, messPre);
            // TODO: check why this is required, it should be possible to just append messIcon to messBdi
            // if (isCaptain()) addPlayer(p);
        } catch {
            return;
        }
    }

    async function translateCommsMessage(p: Element) {
        const text = p.textContent;
        const t = text.slice(text.indexOf(": ") + 2);
        if (!t) return;
        try {
            const [trans, origin] = (await translate(t, "auto", lang)) as [
                string,
                string,
            ];
            const messBdi = p.querySelector("bdi");
            const messTrans = document.createElement("data");
            messTrans.setAttribute("data-trans", "");
            messTrans.textContent = `: ${trans}`;
            const messPre = document.createElement("pre");
            messPre.textContent = `${origin}: ${t.replaceAll('"', "&quot;")}`;
            // messPre.onclick = () => { langInput.value = origin; }
            p.replaceChildren();
            if (messBdi) p.append(messBdi, messTrans, messPre);
        } catch {
            return;
        }
    }

    observeNode(
        chatContent,
        () => {
            const mess = document.querySelector(
                "#chat-content > p:last-of-type",
            );
            if (!mess) return;
            if (chatTranslate.checked) translateChatMessage(mess);
            else
                mess.addEventListener(
                    "dblclick",
                    () => {
                        translateChatMessage(mess);
                    },
                    { once: true },
                );
        },
        true,
        { childList: true, attributes: false, subtree: false },
    );

    observeNode(
        commsContent,
        () => {
            const mess = document.querySelector("#comms-text > p:last-of-type");
            if (!mess) return;
            else
                mess.addEventListener(
                    "dblclick",
                    () => {
                        translateCommsMessage(mess);
                    },
                    { once: true },
                );
        },
        true,
        { childList: true, attributes: false, subtree: false },
    );
});
