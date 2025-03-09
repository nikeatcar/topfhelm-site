/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;                        ----==| Ш А Р И Н Г |==----                         ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
        // Копирование ссылки
        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Link copied to clipboard!");
            });
        }

        //Шаринг
        function openShareModal() {
            document.getElementById("share-modal").classList.add("active");
            document.body.classList.add("no-scroll");
        }
        
        function closeShareModal() {
            document.getElementById("share-modal").classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
        
        // Определяем язык из URL
        function getLangFromURL() {
            if (window.location.pathname.includes("/ru") || window.location.href.includes("index-ru.html")) {
                return "ru";
            }
            return "en"; // По умолчанию английский
        }

        // Функция для отправки в соцсети с правильным текстом
        function shareTo(platform) {
        const url = encodeURIComponent(window.location.href);
        const lang = getLangFromURL(); // Определяем язык
        let shareText = lang === "ru" ? "Зацените крутой Dungeon Folk проект TopfHelm!" : "Check out this awesome Dungeon Folk project!";

        let shareUrl = "";

    switch (platform) {
        case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(shareText)}`;
            break;
        case "vk":
            shareUrl = `https://vk.com/share.php?url=${url}&title=${encodeURIComponent(shareText)}`;
            break;
        case "telegram":
            shareUrl = `https://t.me/share/url?url=${url}&text=${encodeURIComponent(shareText)}`;
            break;
        case "x":
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(shareText)}`;
            break;
        case "reddit":
            shareUrl = `https://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(shareText)}`;
            break;
        case "discord":
            shareUrl = `https://discord.com/channels/@me`;
            break;
        case "ok":
            shareUrl = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${url}`;
            break;
        case "tumblr":
            shareUrl = `https://www.tumblr.com/share/link?url=${url}&name=${encodeURIComponent(shareText)}`;
            break;
        case "whatsapp":
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + url)}`;
            break;
        case "viber":
            shareUrl = `viber://forward?text=${encodeURIComponent(shareText + " " + url)}`;
            break;
        case "email":
            shareUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${url}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, "_blank");
    }
    }   
   
        // Перевод текстов для русской версии
            if (getLangFromURL() === "ru") {
                document.getElementById("share-title").textContent = "Поделись нашим проектом с друзьями!";
                document.querySelector(".copy-btn").textContent = "🔗 Скопировать ссылку";
            }

    const contactModal = document.getElementById("contactModal");
    const openContactBtn = document.getElementById("openContactForm");
    const closeModal = document.querySelector(".close-modal");
    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("form-status");

    // Открытие модального окна
    openContactBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Отмена стандартного перехода по ссылке
        contactModal.style.display = "flex";
        setTimeout(() => contactModal.classList.add("show"), 10);
    });

    // Закрытие модального окна
    closeModal.addEventListener("click", function () {
        contactModal.classList.remove("show");
        setTimeout(() => contactModal.style.display = "none", 300);
    });

    // Закрытие окна по клику вне формы
    window.addEventListener("click", function (event) {
        if (event.target === contactModal) {
            contactModal.classList.remove("show");
            setTimeout(() => contactModal.style.display = "none", 300);
        }
    });