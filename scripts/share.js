// Универсальный путь к иконкам
function getIconPath(icon) {
    return (window.location.pathname.includes("/articles/")) ? `../icons/${icon}` : `icons/${icon}`;
}

document.addEventListener("DOMContentLoaded", function () {

    // Определение языка страницы
    function getLangFromURL() {
        return document.documentElement.lang || "en";
    }

    // Универсальный путь к иконкам
    function getIconPath(icon) {
        return (window.location.pathname.includes("/articles/")) ? `../icons/${icon}` : `icons/${icon}`;
    }

    // Создаём кнопку "Поделиться" динамически
    const shareSection = document.querySelector(".share-section");
    if (shareSection) {
        const shareButton = document.createElement("button");
        shareButton.classList.add("share-main");
        shareButton.innerHTML = `
            <div class="share-button-content">
                <img src="${getIconPath('SShare.svg')}" alt="Share Icon" width="24" height="24" loading="lazy">
                <span>${getLangFromURL() === "ru" ? "Поделиться" : "Share"}</span>
            </div>
        `;
        shareButton.addEventListener("click", openShareModal);
        shareSection.appendChild(shareButton);
    }

    // Создаём модальное окно для шаринга
    if (!document.getElementById("share-modal")) {
        const shareModal = document.createElement("div");
        shareModal.id = "share-modal";
        shareModal.classList.add("share-modal");
        shareModal.innerHTML = `
            <div class="share-content">
                <div class="close-container">
                    <span class="close-btn">✖</span>
                </div>
                <h2 id="share-title">${getLangFromURL() === "ru" ? "Поделись этой страницей!" : "Share this page!"}</h2>
                <div class="share-icons">
                    ${generateShareLinks()}
                </div>
                <button class="button copy-btn">🔗 ${getLangFromURL() === "ru" ? "Копировать URL" : "Copy URL"}</button>
            </div>
        `;
        document.body.appendChild(shareModal);

        // Назначаем обработчики событий
        shareModal.querySelector(".close-btn").addEventListener("click", closeShareModal);
        shareModal.querySelector(".copy-btn").addEventListener("click", copyLink);
    }
});

// Функция для генерации кнопок соцсетей
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
    return platforms.map(p => `
        <a href="${p.url}${pageUrl}" class="share-item" target="_blank">
            <img src="${getIconPath(p.icon)}" alt="Share on ${p.name}" loading="lazy">
            <span>${p.name}</span>
        </a>
    `).join("");
}

// Открытие модального окна
function openShareModal() {
    const modal = document.getElementById("share-modal");
    if (modal) {
        modal.classList.add("active");
        document.body.classList.add("no-scroll");
    }
}

// Закрытие модального окна
function closeShareModal() {
    const modal = document.getElementById("share-modal");
    if (modal) {
        modal.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
}

// Функция копирования ссылки
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert(getLangFromURL() === "ru" ? "Ссылка скопирована!" : "Link copied to clipboard!");
    });
}
