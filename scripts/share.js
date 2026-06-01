function getShareLang() {
    return (
        document.documentElement.lang?.toLowerCase().startsWith("ru") ||
        window.location.pathname.includes("/ru") ||
        window.location.pathname.includes("-ru")
    ) ? "ru" : "en";
}

function getIconPath(icon) {
    return window.location.pathname.includes("/articles/")
        ? `../icons/${icon}`
        : `icons/${icon}`;
}

function generateShareLinks() {
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
            <img src="${getIconPath(platform.icon)}" alt="Share on ${platform.name}" loading="lazy">
            <span>${platform.name}</span>
        </a>
    `).join("");
}

function initShare() {
    const shareSection = document.querySelector(".share-section");
    const lang = getShareLang();

    if (shareSection) {
        const existingButton = shareSection.querySelector(".share-main");

        if (existingButton) {
            existingButton.remove();
        }

        const shareButton = document.createElement("button");

        shareButton.className = "share-main";
        shareButton.type = "button";

        shareButton.innerHTML = `
            <div class="share-button-content">
                <img src="${getIconPath("SShare.svg")}" alt="Share Icon" width="24" height="24" loading="lazy">
                <span>${lang === "ru" ? "Поделиться" : "Share"}</span>
            </div>
        `;

        shareButton.addEventListener("click", openShareModal);

        shareSection.appendChild(shareButton);
    }

    const oldModal = document.getElementById("share-modal");

    if (oldModal) {
        oldModal.remove();
    }

    const shareModal = document.createElement("div");

    shareModal.id = "share-modal";
    shareModal.className = "share-modal";

    shareModal.innerHTML = `
        <div class="share-content">
            <div class="close-container">
                <span class="close-btn">✖</span>
            </div>

            <h2 id="share-title">
                ${lang === "ru" ? "Поделись этой страницей!" : "Share this page!"}
            </h2>

            <div class="share-icons">
                ${generateShareLinks()}
            </div>

            <button class="button copy-btn" type="button">
                🔗 ${lang === "ru" ? "Копировать URL" : "Copy URL"}
            </button>
        </div>
    `;

    document.body.appendChild(shareModal);

    const closeBtn = shareModal.querySelector(".close-btn");
    const copyBtn = shareModal.querySelector(".copy-btn");

    if (closeBtn) {
        closeBtn.addEventListener("click", closeShareModal);
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", copyLink);
    }
}

function openShareModal() {
    const modal = document.getElementById("share-modal");

    if (!modal) return;

    modal.classList.add("active");
    document.body.classList.add("no-scroll");
}

function closeShareModal() {
    const modal = document.getElementById("share-modal");

    if (!modal) return;

    modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            alert(
                getShareLang() === "ru"
                    ? "Ссылка скопирована!"
                    : "Link copied to clipboard!"
            );
        })
        .catch(() => {
            alert(
                getShareLang() === "ru"
                    ? "Не удалось скопировать ссылку."
                    : "Could not copy the link."
            );
        });
}