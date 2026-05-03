function getLangFromURL() {
    if (window.location.pathname.includes("/ru") || window.location.href.includes("index-ru.html")) {
        return "ru";
    }
    return "en";
}

document.addEventListener("DOMContentLoaded", function () {
    const switchLangBtn = document.getElementById("switchLangBtn");

    if (!switchLangBtn) return; // Если кнопки нет, выходим

    switchLangBtn.addEventListener("click", function () {
    let currentURL = window.location.pathname;

    // The Emerald Saga
    if (currentURL === "/the-emerald-saga/" || currentURL === "/the-emerald-saga") {
        window.location.href = "/the-emerald-saga/ru";
        return;
    }

    if (currentURL === "/the-emerald-saga/ru" || currentURL === "/the-emerald-saga/ru/") {
        window.location.href = "/the-emerald-saga/";
        return;
    }

    // Главная
    if (currentURL === "/" || currentURL === "/en") {
        window.location.href = "/ru";
        return;
    }

    if (currentURL === "/ru") {
        window.location.href = "/en";
        return;
    }

    // Старые страницы через -ru
    if (currentURL.includes("-ru")) {
        window.location.href = currentURL.replace("-ru", "");
    } else {
        window.location.href = currentURL.replace(/(\/[a-zA-Z0-9-]+)(\.html)?$/, "$1-ru$2");
    }
});

    console.log("Определение языка страницы...");

    let lang = document.documentElement.lang; // Получаем язык страницы

    if (lang === "ru") {
        document.body.classList.add("ru");
        console.log("Применён русский шрифт Monomakh");
    } else {
        document.body.classList.add("en");
        console.log("Применён английский шрифт IM Fell English SC");
    }

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
                    "<span>Предсохрани</span>" 
                    : "<span>Presave</span>";
            }, 200);
            });
        }
    }, 500);

    /*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                              ;;
;;                 ----==| Т А Й М Е Р   Р Е Л И З А |==----                    ;;
;;                                                                              ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
function initializeCountdown() {
    const releaseDate = new Date(Date.UTC(2025, 4, 9, 5, 0, 0)).getTime(); // МАЙ = 4, потому что месяцы с 0
    const countdownText = document.getElementById("countdown-text");

    if (!countdownText) {
        console.warn("Countdown element not found!");
        return;
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = releaseDate - now;

        if (timeLeft <= 0) {
            countdownText.innerHTML = (getLangFromURL() === "ru")
                ? "История началась! 🍻⚔️"
                : "The story has begun! 🍻⚔️";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownText.innerHTML = (getLangFromURL() === "ru")
            ? `⏳ Новая история начнётся через: <span class="time">${days}</span>д <span class="time">${hours}</span>ч <span class="time">${minutes}</span>м <span class="time">${seconds}</span>с`
            : `⏳ The new story begins in: <span class="time">${days}</span>d <span class="time">${hours}</span>h <span class="time">${minutes}</span>m <span class="time">${seconds}</span>s`;
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
}



    initializeCountdown(); // Запуск таймера при первой загрузке
});

// Перезапуск таймера после PJAX подгрузки
$(document).on('pjax:complete', function () {
    console.log("PJAX complete — пересоздаём таймер");
    initializeCountdown();
});

/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                                                                            ;;
;;                 ----==| Р А З Н Ы Е   Ш Р И Ф Т Ы |==----                  ;;
;;                                                                            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/
    if (getLangFromURL() === "ru") {
        document.body.classList.add("ru");
    }

    initializeCountdown(); // Запуск таймера при первой загрузке

// Перезапуск таймера после PJAX подгрузки
$(document).on('pjax:complete', function () {
    console.log("PJAX complete — пересоздаём таймер");
    initializeCountdown();
});