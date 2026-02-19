import {
    observeNode,
    isCaptain,
    sendChat,
} from "../components/utilities/utility";

import {
    bigUiContainer,
    chatContent,
    manageBtn,
    teamMenu,
    topBar,
} from "../components/utilities/selectors";

export default defineUnlistedScript(() => {
    async function emergencyPing(
        url: string,
        mess: string,
        senderUsername: string,
    ) {
        if (!document.title.includes("- Deep")) return;
        let inviteUrl: string | null = null;
        if (isCaptain()) {
            // manageBtn.click();
            // teamMenu.classList.add("hidden");
            // if (manager) {
            //     await swapManager(0);
            // }
            // inviteUrl = document.querySelector(".copy-box").textContent;
            // manageBtn.click();
            // setTimeout(() => {
            //     teamMenu.classList.remove("hidden");
            // }, 250);
            sendChat("/invite");
            // observeNode(chatContent, () => {
            //     const inviteElement = mess.querySelector("code.copy-box");
            //     if (inviteElement) {
            //         inviteUrl = inviteElement.textContent;
            //     }
            // });
            observeNode(
                chatContent,
                () => {
                    const inviteElement = document.querySelector(
                        "#chat-content code.copy-box:last-of-type",
                    );
                    if (inviteElement) {
                        inviteUrl = inviteElement.textContent;
                        
                    }
                },
                false,
                { childList: true, attributes: false, subtree: false },
            );
        }
        let embImg =
            "https://cardinalwiseman.coventry.sch.uk/wp-content/uploads/sites/2/2020/03/sign-with-the-word-help-in-a-hand-icon-vector-9381725.png";
        if (inviteUrl) {
            const response = await fetch(inviteUrl, { redirect: "error" });
            const html = await response.text();
            const parser = new DOMParser();
            const meta = parser
                .parseFromString(html, "text/html")
                .querySelectorAll("meta[property]");
            if (meta[0].getAttribute("content") != "Deep Space Airships")
                embImg = meta[4].getAttribute("content") || embImg;
        }

        const pings = [...mess.matchAll(/(<@\d+>)|@here|@everyone/g)]
            .map((x) => x[0])
            .join(" ");
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: senderUsername,
                embeds: [
                    {
                        color: 15105570,
                        title: "Help required!",
                        ...(inviteUrl ? { url: inviteUrl } : {}),
                        description: mess,
                        fields: [
                            {
                                name: "Ship:",
                                value: `${document.title.slice(0, -22)} ${cShip}`,
                            },
                        ],
                        ...(inviteUrl ? {
                            footer: {
                                text: "click title to join the ship",
                            },
                        } : {}),
                        thumbnail: {
                            url: embImg,
                        },
                    },
                ],
                ...(pings && { content: `||${pings}|| Come help!` }),
            }),
        });
    }

    function addEmergCall() {
        browser.storage.sync.get("ping", function (result) {
            if (result.ping == undefined || result.ping.length == 0) return;
            pingsBox = document.createElement("select");
            pingsBox.classList.add("btn", "btn-small", "btn-blue");
            const pc = document.createElement("option");
            pc.textContent = "Emergency";
            pingsBox.append(pc);
            result.ping.forEach((webh) => {
                const pb = document.createElement("option");
                pb.textContent = webh[1];
                pb.value = result.ping.indexOf(webh);
                pingsBox.append(pb);
            });
            pingsBox.oninput = function () {
                const channel = result.ping[pingsBox.value];
                emergencyPing(channel[0], channel[2], channel[3]);
                pc.selected = true;
            };
            topBar.append(pingsBox);
        });
    }

    observeNode(bigUiContainer, () => {
        addEmergCall();
    });
});
