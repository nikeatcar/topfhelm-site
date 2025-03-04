document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");

    // Разные шрифты
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
    if (presaveBtn) {
        presaveBtn.addEventListener("mouseenter", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#FF6666"; 
            setTimeout(() => {
                this.innerHTML = getLangFromURL() === "ru" 
                    ? "<span>❤️Спасибо!❤️</span>" 
                    : "<span>❤️Thank You!❤️</span>";
            }, 200);
        });

        presaveBtn.addEventListener("mouseleave", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#1DB954"; 
            setTimeout(() => {
                this.innerHTML = getLangFromURL() === "ru" 
                    ? "<span>Предсохраняй</span>" 
                    : "<span>Presave Now</span>";
            }, 200);
        });
    }

    // Параллакс-эффект для фона
    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY;
        let parallaxSpeed = 0.01;
        document.querySelector(".blurred-bg").style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    });

    // Таймер релиза
    const releaseDate = new Date("March 28, 2025 08:00:00").getTime();
    const countdownText = document.getElementById("countdown-text");

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

        countdownText.innerHTML = getLangFromURL() === "ru"
            ? `⏳ Великий пир начнётся через: <span class="time">${days}</span>д <span class="time">${hours}</span>ч <span class="time">${minutes}</span>м <span class="time">${seconds}</span>с`
            : `⏳ The grand feast begins in: <span class="time">${days}</span>d <span class="time">${hours}</span>h <span class="time">${minutes}</span>m <span class="time">${seconds}</span>s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Переключение языков
    document.addEventListener("DOMContentLoaded", function () {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) {
            if (savedLang === "ru" && !window.location.href.includes("index-ru.html")) {
                window.location.href = "index-ru.html";
            }
            if (savedLang === "en" && window.location.href.includes("index-ru.html")) {
                window.location.href = "index.html";
            }
            return;
        }

        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith("ru") && !window.location.href.includes("index-ru.html")) {
            window.location.href = "index-ru.html";
        }
    });

    function switchLanguage(lang) {
        localStorage.setItem("lang", lang);
        if (lang === "ru") {
            window.location.href = "index-ru.html";
        } else {
            window.location.href = "index.html";
        }
    }

    function getLangFromURL() {
        if (window.location.pathname.includes("/ru") || window.location.href.includes("index-ru.html")) {
            return "ru";
        }
        return "en"; 
    }

    // Функция копирования ссылки
    function copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Link copied to clipboard!");
        });
    }

    // Шаринг
    function openShareModal() {
        document.getElementById("share-modal").classList.add("active");
        document.body.classList.add("no-scroll");
    }

    function closeShareModal() {
        document.getElementById("share-modal").classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    function shareTo(platform) {
        const url = encodeURIComponent(window.location.href);
        const lang = getLangFromURL();
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
            case "email":
                shareUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${url}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank");
        }
    }
});