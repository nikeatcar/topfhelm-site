/* jshint esversion: 6 */
/* jshint -W014 */
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;                     ----==| П Р Е Л О А Д Е Р |==----                      ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
    // Убираем прелоадер при загрузке
    setTimeout(() => {
        console.log("Закрываю прелоадер вручную");
        $("#preloader").fadeOut();
    }, 1000);

    // Запуск анимации появления контента
    const sections = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => observer.observe(section));

    // Определение языка страницы
    if (getLangFromURL() === "ru") {
        document.body.classList.add("ru");
    }

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// ;;                                                                            ;;
// ;;                  ----==| К Н О П К А   В В Е Р Х |==----                   ;;
// ;;                                                                            ;;
// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    // Показываем кнопку при прокрутке вниз
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (!scrollToTopBtn) return; // Если кнопки нет - ничего не делаем

    // Функция для показа кнопки с fade-in
    function showScrollButton() {
        scrollToTopBtn.classList.add("show");
        scrollToTopBtn.classList.remove("fade-out");
    }

    // Функция для скрытия кнопки с fade-out
    function hideScrollButton() {
        scrollToTopBtn.classList.add("fade-out");
        scrollToTopBtn.classList.remove("show");
    }

    // Показываем кнопку при прокрутке вниз
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            showScrollButton();
        } else {
            hideScrollButton();
        }
    });

    // Обработчик клика - плавный скролл наверх
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;           ----==| П Е Р Е К Л Ю Ч Е Н И Е   Я З Ы К О В |==----            ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
function getLangFromHTML() {
    return document.documentElement.lang || "en";
}

function switchLanguage(lang) {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang; // Меняем lang в <html>

    // Обновляем URL без index.html
    const newURL = lang === "ru" ? "/ru" : "/en";
    history.pushState(null, "", newURL);
    location.reload(); // Перезагрузка страницы
}

// Заменяем index.html и index-ru.html на /en и /ru
if (window.location.pathname.includes("index-ru.html")) {
    history.replaceState(null, "", "/ru");
    document.documentElement.lang = "ru";
} else if (window.location.pathname.includes("index.html")) {
    history.replaceState(null, "", "/en");
    document.documentElement.lang = "en";
}

// Добавляем обработчики на кнопки переключения языка
document.querySelectorAll(".language-switcher button").forEach(button => {
    button.addEventListener("click", function () {
        const lang = this.dataset.lang;
        switchLanguage(lang);
    });
});

// Добавляем класс ru/en на body для смены шрифтов
const currentLang = getLangFromHTML();
document.body.classList.add(currentLang);
});

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;                       ----==| P R E S A V E |==----                        ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
setTimeout(() => {
    const presaveBtn = document.getElementById("presave-btn");

    if (presaveBtn) {
        presaveBtn.addEventListener("mouseenter", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#FF6666"; // Меняем цвет при наведении

            setTimeout(() => {
                this.innerHTML = (getLangFromURL() === "ru") ?
                    "<span>❤️Спасибо!❤️</span>" 
                    : "<span>❤️Thank You!❤️</span>";
            }, 200);

            // Анимация дёргания
            let intensity = 3;
            let shakeInterval = setInterval(() => {
                let x = (Math.random() * intensity * 2) - intensity;
                let y = (Math.random() * intensity * 2) - intensity;
                presaveBtn.style.transform = `translate(${x}px, ${y}px)`;
            }, 50);

            setTimeout(() => {
                clearInterval(shakeInterval);
                presaveBtn.style.transform = "translate(0, 0)";
            }, 300);
        });

        presaveBtn.addEventListener("mouseleave", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#1DB954"; // Возвращаем стандартный цвет

            setTimeout(() => {
                this.innerHTML = (getLangFromURL() === "ru") ?
                    "<span>Предсохраняй</span>" 
                    : "<span>Presave Now</span>";
            }, 200);
            });
        }
    }, 500);

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                              ;;
;;                 ----==| Т А Й М Е Р   Р Е Л И З А |==----                    ;;
;;                                                                              ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
    setTimeout(() => {
        const releaseDate = new Date("March 28, 2025 08:00:00").getTime();
        const countdownText = document.getElementById("countdown-text");
        if (!countdownText) return;

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = releaseDate - now;
            if (timeLeft <= 0) {
                countdownText.innerHTML = "The feast has begun! 🍻⚔️";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownText.innerHTML = (getLangFromURL() === "ru") ?
                `⏳ Великий пир начнётся через: <span class="time">${days}</span>д <span class="time">${hours}</span>ч <span class="time">${minutes}</span>м <span class="time">${seconds}</span>с`
                : `⏳ The grand feast begins in: <span class="time">${days}</span>d <span class="time">${hours}</span>h <span class="time">${minutes}</span>m <span class="time">${seconds}</span>s`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }, 500);

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;                 ----==| Р А З Н Ы Е   Ш Р И Ф Т Ы |==----                  ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
        if (getLangFromURL() === "ru") {
            document.body.classList.add("ru");
        }

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;; ----==| А Н И М А Ц И Я   К Н О П О К   П Р И   Н А В Е Д Е Н И И |==----  ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/

    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            let intensity = 3;
            let shakeInterval = setInterval(() => {
                let x = (Math.random() * intensity * 2) - intensity;
                let y = (Math.random() * intensity * 2) - intensity;
                button.style.transform = `translate(${x}px, ${y}px)`;
            }, 50);

            setTimeout(() => {
                clearInterval(shakeInterval);
                button.style.transform = "translate(0, 0)";
            }, 300);
        });
    });

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;                         ----==| V I D E O |==----                          ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
        document.querySelectorAll(".youtube-placeholder").forEach(container => {
            container.addEventListener("click", function () {
                const videoId = this.getAttribute("data-video");
                const iframe = document.createElement("iframe");
                iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
                iframe.setAttribute("allowfullscreen", "");
                this.innerHTML = "";
                this.appendChild(iframe);
            });
        });

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
        
        // Функция копирования ссылки
        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Link copied to clipboard!");
            });
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

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// ;;                                                                            ;;
// ;;     ----==| О Т П Р А В К А   Ф О Р М Ы   Ч Е Р Е З   A J A X |==----      ;;
// ;;                                                                            ;;
// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

document.addEventListener("DOMContentLoaded", function () {
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

    // Отправка формы через AJAX
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Останавливаем стандартную отправку

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                statusText.textContent = "✅ Сообщение отправлено!";
                form.reset();
                setTimeout(() => {
                    contactModal.classList.remove("show");
                    setTimeout(() => contactModal.style.display = "none", 300);
                }, 1500);
            } else {
                statusText.textContent = "❌ Ошибка при отправке. Попробуйте снова.";
            }
        } catch (error) {
            statusText.textContent = "❌ Ошибка сети. Проверьте соединение с интернетом.";
        }
    });
});