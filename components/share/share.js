class Share {

    static initialized = false;

     static async init() {

    if (this.initialized)
        return;

    this.initialized = true;

    this.injectCSS();

    await Core.loadHTML(
        "share",
        "/components/share/share.html"
    );
    await new Promise(resolve => requestAnimationFrame(resolve));

    this.cache();

    this.build();

    this.bind();

}

    static cache() {

    this.modal = document.getElementById("share-modal");

    this.openButton = document.querySelector(".share-main");
    this.closeButton = document.querySelector(".close-btn");
    this.copyButton = document.querySelector(".copy-btn");

    this.buttonIcon = document.getElementById("share-button-icon");
    this.buttonText = document.getElementById("share-button-text");

    this.title = document.getElementById("share-title");
    this.icons = document.querySelector(".share-icons");
    this.copyText = document.getElementById("copy-button-text");

}

    static injectCSS() {

        if (document.getElementById("share-css"))
            return;

        const link = document.createElement("link");

        link.id = "share-css";
        link.rel = "stylesheet";
        link.href = "/components/share/share.css";

        document.head.appendChild(link);

    }

    static getLanguage() {

        return (
            document.documentElement.lang?.toLowerCase().startsWith("ru") ||
            window.location.pathname.includes("/ru") ||
            window.location.pathname.includes("-ru")
        ) ? "ru" : "en";

    }

    static getIconPath(icon) {

        return window.location.pathname.includes("/articles/")
            ? `../icons/${icon}`
            : `/icons/${icon}`;

    }

    static generateShareLinks() {

        const platforms = [
            { name: "Facebook", icon: "SFacebook.svg", url: "https://www.facebook.com/sharer/sharer.php?u=" },
            { name: "VK", icon: "SVK.svg", url: "https://vk.com/share.php?url=" },
            { name: "Telegram", icon: "STelegram.svg", url: "https://t.me/share/url?url=" },
            { name: "X", icon: "SX.svg", url: "https://twitter.com/intent/tweet?url=" },
            { name: "Reddit", icon: "SReddit.svg", url: "https://www.reddit.com/submit?url=" },
            { name: "Discord", icon: "SDiscord.svg", url: "https://discord.com/channels/@me" },
            { name: "OK.ru", icon: "SOK.svg", url: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=" },
            { name: "Tumblr", icon: "STumblr.svg", url: "https://www.tumblr.com/share/link?url=" },
            { name: "WhatsApp", icon: "SWhatsapp.svg", url: "https://api.whatsapp.com/send?text=" },
            { name: "Viber", icon: "Sviber.svg", url: "viber://forward?text=" },
            { name: "Email", icon: "SEmail.svg", url: "mailto:?subject=Check this out!&body=" }
        ];

        const pageUrl = encodeURIComponent(window.location.href);

        return platforms.map(platform => `
            <a href="${platform.url}${pageUrl}" class="share-item" target="_blank" rel="noopener">
                <img src="${this.getIconPath(platform.icon)}" alt="${platform.name}" loading="lazy">
                <span>${platform.name}</span>
            </a>
        `).join("");

    }

    static build() {

        const lang = this.getLanguage();

        this.buttonIcon.src = this.getIconPath("SShare.svg");

        this.buttonText.textContent =
            lang === "ru"
                ? "Поделиться"
                : "Share";

        document.getElementById("share-title").textContent =
            lang === "ru"
                ? "Поделись этой страницей!"
                : "Share this page!";

        document.querySelector(".share-icons").innerHTML =
            this.generateShareLinks();

        this.title.textContent =
            lang === "ru"
                ? "Поделись этой страницей!"
                : "Share this page!";

        this.icons.innerHTML =
            this.generateShareLinks();

        this.copyText.textContent =
            lang === "ru"
                ? "🔗 Копировать URL"
                : "🔗 Copy URL";

    }

    static bind() {

        this.modal = document.getElementById("share-modal");

        this.openButton = document.querySelector(".share-main");
        this.closeButton = document.querySelector(".close-btn");
        this.copyButton = document.querySelector(".copy-btn");

        this.openButton?.addEventListener("click", this.openModal);
        this.closeButton?.addEventListener("click", this.closeModal);
        this.copyButton?.addEventListener("click", this.copyLink);

    }

    static openModal = () => {

        this.modal.classList.add("active");
        document.body.classList.add("no-scroll");

    }

    static closeModal = () => {

        this.modal.classList.remove("active");
        document.body.classList.remove("no-scroll");

    }

    static copyLink = async () => {

        try {

            await navigator.clipboard.writeText(window.location.href);

            alert(
                this.getLanguage() === "ru"
                    ? "Ссылка скопирована!"
                    : "Link copied to clipboard!"
            );

        } catch {

            alert(
                this.getLanguage() === "ru"
                    ? "Не удалось скопировать ссылку."
                    : "Could not copy the link."
            );

        }

    }

    static destroy() {

        this.openButton?.removeEventListener("click", this.openModal);
        this.closeButton?.removeEventListener("click", this.closeModal);
        this.copyButton?.removeEventListener("click", this.copyLink);

        this.modal = null;
        this.openButton = null;
        this.closeButton = null;
        this.copyButton = null;
        this.buttonIcon = null;
        this.buttonText = null;
        this.title = null;
        this.icons = null;
        this.copyText = null;

        this.initialized = false;

    }

}

window.Share = Share;