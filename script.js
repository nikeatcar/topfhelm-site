document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");

    //Разные шрифты
    document.addEventListener("DOMContentLoaded", function () {
        if (window.location.href.includes("index-ru.html")) {
            document.body.classList.add("ru");
        }
    });

    // Анимация кнопок при наведении
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

    // Изменение текста кнопки Presave Now
    // Изменение текста кнопки Presave Now
if (presaveBtn) {
    presaveBtn.addEventListener("mouseenter", function () {
        this.style.transition = "background-color 0.3s ease-in-out";
        this.style.backgroundColor = "#FF6666"; // Меняем цвет при наведении
        setTimeout(() => {
            this.innerHTML = window.location.href.includes("index-ru.html") 
                ? "<span>❤️Спасибо!❤️</span>" 
                : "<span>❤️Thank You!❤️</span>";
        }, 200);
    });
    
    presaveBtn.addEventListener("mouseleave", function () {
        this.style.transition = "background-color 0.3s ease-in-out";
        this.style.backgroundColor = "#1DB954"; // Возвращаем стандартный цвет
        setTimeout(() => {
            this.innerHTML = window.location.href.includes("index-ru.html") 
                ? "<span>Предсохраняй</span>" 
                : "<span>Presave Now</span>";
        }, 200);
    });
    }
    });

    // Параллакс-эффект для фона
    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY;
        let parallaxSpeed = 0.01;
        document.querySelector(".blurred-bg").style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    });

        //Таймер релиза
        document.addEventListener("DOMContentLoaded", function () {
            // Указываем дату релиза альбома
            const releaseDate = new Date("March 28, 2025 08:00:00").getTime();
            const countdownText = document.getElementById("countdown-text");
        
            function updateCountdown() {
                const now = new Date().getTime();
                const timeLeft = releaseDate - now;
        
                if (timeLeft <= 0) {
                    countdownText.innerHTML = "The feast has begun! 🍻⚔️";
                    return;
                }
        
                // Вычисляем дни, часы, минуты и секунды
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
                if (window.location.href.includes("index-ru.html")) {
                    countdownText.innerHTML = `⏳ Великий пир начнётся через: 
                    <span class="time">${days}</span>д 
                    <span class="time">${hours}</span>ч 
                    <span class="time">${minutes}</span>м 
                    <span class="time">${seconds}</span>с`;
                } else {
                    countdownText.innerHTML = `⏳ The grand feast begins in: 
                    <span class="time">${days}</span>d 
                    <span class="time">${hours}</span>h 
                    <span class="time">${minutes}</span>m 
                    <span class="time">${seconds}</span>s`;
                }
            }
        
            // Обновляем каждую секунду
            setInterval(updateCountdown, 1000);
            updateCountdown(); // Вызываем сразу, чтобы не ждать 1 секунду
        });

        document.addEventListener("DOMContentLoaded", function () {
            const savedLang = localStorage.getItem("lang") || detectBrowserLang();
            const currentLang = getLangFromURL();
        
            if (savedLang !== currentLang) {
                history.replaceState(null, "", "/" + savedLang);
            }
        
            loadLanguageContent(savedLang);
        });
        
        // Функция переключения языка
        function switchLanguage(lang) {
            if (getLangFromURL() !== lang) {
                localStorage.setItem("lang", lang);
                history.pushState(null, "", "/" + lang); // Меняем URL без перезагрузки
                loadLanguageContent(lang);
            }
        }
        
        // Определение языка браузера (по умолчанию "en")
        function detectBrowserLang() {
            return navigator.language.startsWith("ru") ? "ru" : "en";
        }
        
        // Получение языка из URL
        function getLangFromURL() {
            return window.location.pathname.includes("/ru") ? "ru" : "en";
        }
        
        // Загрузка контента без перезагрузки
        function loadLanguageContent(lang) {
            document.body.classList.toggle("ru", lang === "ru");
            document.body.classList.toggle("en", lang === "en");
        
            // Обновление текста кнопки Presave Now в зависимости от языка
            const presaveBtn = document.getElementById("presave-btn");
            if (presaveBtn) {
                presaveBtn.innerHTML = lang === "ru" ? "<span>Предсохраняй</span>" : "<span>Presave Now</span>";
            }
        }
        
        // Обработка нажатия кнопки "Назад" в браузере
        window.addEventListener("popstate", function () {
            const lang = getLangFromURL();
            loadLanguageContent(lang);
        });
        
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
        document.addEventListener("DOMContentLoaded", function () {
            if (window.location.href.includes("index-ru.html")) {
                document.getElementById("share-title").textContent = "Поделись нашим проектом с друзьями!";
                document.querySelector(".copy-btn").textContent = "🔗 Скопировать ссылку";
            }
        });