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
        this.style.transition = "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out";
        this.style.backgroundColor = "#FF6666"; // Цвет при наведении
        this.style.transition = "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out";
        this.style.opacity = "0.5"; // Делаем её полупрозрачной вместо полного скрытия
        setTimeout(() => {
            this.innerHTML = window.location.href.includes("index-ru.html") 
                ? "<span>❤️Спасибо!❤️</span>" 
                : "<span>❤️Thank You!❤️</span>";
            this.style.opacity = "1"; // Затем плавно показываем текст
        }, 200);
    });

    presaveBtn.addEventListener("mouseleave", function () {
        this.style.transition = "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out";
        this.style.backgroundColor = "#1DB954"; // Возвращаем цвет
        this.style.opacity = "0"; // Скрываем перед сменой текста
        setTimeout(() => {
            this.innerHTML = window.location.href.includes("index-ru.html") 
                ? "<span>Предсохраняй</span>" 
                : "<span>Presave Now</span>";
            this.style.opacity = "1"; // Возвращаем плавно
        }, 300);
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

        //Переключение языков
        document.addEventListener("DOMContentLoaded", function () {
            // Проверяем, был ли ранее выбран язык пользователем
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
        
            // Определяем язык браузера
            const userLang = navigator.language || navigator.userLanguage;
            
            // Если язык русский, перенаправляем на русскую версию (если ещё не на ней)
            if (userLang.startsWith("ru") && !window.location.href.includes("index-ru.html")) {
                window.location.href = "index-ru.html";
            }
        });
        
        // Функция для смены языка и сохранения выбора
        function switchLanguage(lang) {
            localStorage.setItem("lang", lang);
            if (lang === "ru") {
                window.location.href = "index-ru.html";
            } else {
                window.location.href = "index.html";
            }
        }