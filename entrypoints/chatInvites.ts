import {
    observeNode,
    isTestEnvironment,
} from "../components/utilities/utility";

export default defineUnlistedScript(() => {
    const chatContent = document.querySelector("#chat-content");
    const commsContent = document.querySelector("#comms-text");
    const chatBox = document.getElementById("chat");
    const regex = /https:\/\/.{0,5}drednot\.io\/invite\/[A-z0-9-_]{24}/;
    const defaultIcon = "/x/asset.2jrQzPpjHFBAjBV0wwRh.png";
    const parser = new DOMParser();
    const buttonConfigs = [
        { label: "New tab", color: "red", isLink: true, target: "_blank" },
        { label: "This tab", color: "blue", isLink: true, target: null },
        { label: "Copy", color: "orange", isLink: false, target: null },
    ] as const;

    const handleImageError = function (this: HTMLImageElement) {
        this.src = defaultIcon;
    };

    function generateInviteCard(text: string, url: string) {
        const inviteD = document.createElement("div");
        const inviteB = document.createElement("b");
        const inviteP = document.createElement("p");
        inviteP.textContent = text;
        inviteB.append(inviteP);
        const inviteButtons = document.createElement("p");
        inviteButtons.append(document.createTextNode("Open in:"));

        for (const config of buttonConfigs) {
            const inviteBtn = document.createElement("a");
            inviteBtn.className = `btn btn-${config.color}`;
            inviteBtn.textContent = config.label;
            if (config.isLink) {
                inviteBtn.href = url;
                if (config.target) inviteBtn.target = config.target;
            } else {
                inviteBtn.onclick = () => navigator.clipboard.writeText(url);
            }
            inviteButtons.append(inviteBtn);
        }
        inviteD.append(inviteB, inviteButtons);
        return inviteD;
    }

    // Chat messages
    async function convertInvite(mess: Element) {
        const messageText = mess.textContent;
        if (!messageText) return;

        const match = regex.exec(messageText);
        if (!match) return;

        const url = match[0];
        if (mess.querySelector("code.copy-box")) return;

        const messSenderElement = mess.querySelector("b");
        const colonIndex = messageText.indexOf(": ");
        const playerContent =
            colonIndex !== -1
                ? messageText.slice(colonIndex + 2).replace(regex, "")
                : messageText.replace(regex, "");

        const messContent = document.createElement("span");
        messContent.textContent = playerContent;
        mess.replaceChildren();

        if (messSenderElement) mess.append(messSenderElement, messContent);
        else mess.append(messContent);

        const urlIsTest = url.includes("test");
        if (isTestEnvironment() !== urlIsTest) {
            const inviteCard = generateInviteCard(
                `Invitation to ${url.slice(8, -32)} ship.`,
                url,
            );
            inviteCard.className = "invite-container";
            mess.appendChild(inviteCard);
        } else {
            try {
                const response = await fetch(url, { redirect: "error" });
                const html = await response.text();
                const doc = parser.parseFromString(html, "text/html");
                const meta = doc.querySelectorAll("meta[property]");

                const shipName =
                    meta[0]?.getAttribute("content")?.slice(8, -13) ||
                    "Unknown";
                const inviteCard = generateInviteCard(
                    `Invitation to ${shipName}`,
                    url,
                );

                const inviteCardContainer = document.createElement("div");
                inviteCardContainer.className = "invite-container";
                const img = new Image();
                img.src = meta[4]?.getAttribute("content") || defaultIcon;
                img.onerror = handleImageError;
                inviteCardContainer.append(img, inviteCard);
                mess.appendChild(inviteCardContainer);
            } catch {
                const inviteCard = generateInviteCard(
                    `Invitation is broken or goes to LABS.`,
                    url,
                );
                inviteCard.className = "invite-container";
                mess.appendChild(inviteCard);
            }
        }

        if (chatBox?.classList.contains("closed") && chatContent) {
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    }

    observeNode(
        chatContent,
        () => {
            const mess = document.querySelector(
                "#chat-content > p:last-of-type",
            );
            if (!mess) return;
            convertInvite(mess);
        },
        true,
        { childList: true, attributes: false, subtree: false },
    );

    // Comms messages
    async function convertCommsInvite(mess: Element) {
        const messageText = mess.textContent;
        if (!messageText) return;

        const match = regex.exec(messageText);
        if (!match) return;

        const url = match[0];
        if (mess.querySelector("code.copy-box")) return;

        const messBdi = mess.querySelector("bdi");
        const colonIndex = messageText.indexOf(": ");
        const playerContent =
            colonIndex !== -1
                ? messageText.slice(colonIndex + 2).replace(regex, "")
                : messageText.replace(regex, "");

        const messContent = document.createElement("data");
        messContent.textContent = playerContent;
        mess.replaceChildren();

        if (messBdi) mess.append(messBdi, messContent);
        else mess.append(messContent);

        const urlIsTest = url.includes("test");
        if (isTestEnvironment() !== urlIsTest) {
            const inviteCard = generateInviteCard(
                `Invitation to ${url.slice(8, -32)} ship.`,
                url,
            );
            inviteCard.className = "invite-container";
            mess.appendChild(inviteCard);
        } else {
            try {
                const response = await fetch(url, { redirect: "error" });
                const html = await response.text();
                const doc = parser.parseFromString(html, "text/html");
                const meta = doc.querySelectorAll("meta[property]");

                const shipName =
                    meta[0]?.getAttribute("content")?.slice(8, -13) ||
                    "Unknown";
                const inviteCard = generateInviteCard(
                    `Invitation to ${shipName}`,
                    url,
                );

                const inviteCardContainer = document.createElement("div");
                inviteCardContainer.className = "invite-container";
                const img = new Image();
                img.src = meta[4]?.getAttribute("content") || defaultIcon;
                img.onerror = handleImageError;
                inviteCardContainer.append(img, inviteCard);
                mess.appendChild(inviteCardContainer);
            } catch {
                const inviteCard = generateInviteCard(
                    `Invitation is broken or goes to LABS.`,
                    url,
                );
                inviteCard.className = "invite-container";
                mess.appendChild(inviteCard);
            }
        }

        if (commsContent) {
            commsContent.scrollTop = commsContent.scrollHeight;
        }
    }

    observeNode(
        commsContent,
        () => {
            const mess = document.querySelector("#comms-text > p:last-of-type");
            if (!mess) return;
            convertCommsInvite(mess);
        },
        true,
        { childList: true, attributes: false, subtree: false },
    );
});
