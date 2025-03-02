document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");

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
            this.style.transition = "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out";
            this.style.backgroundColor = "#FF6666"; // Здесь можно задать любой цвет
            this.style.opacity = "0";
            setTimeout(() => {
                this.innerHTML = "<span>❤️Thank You!❤️</span>";
                this.style.opacity = "1";
            }, 200);
        });

        presaveBtn.addEventListener("mouseleave", function () {
            this.style.transition = "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out";
            this.style.backgroundColor = "#1DB954"; // Возвращаем исходный цвет
            this.style.opacity = "0";
            setTimeout(() => {
                this.innerHTML = "<span>Presave Now</span>";
                this.style.opacity = "1";
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
        
                countdownText.innerHTML = `⏳ The grand feast begins in: 
                <span class="time">${days}</span>d 
                <span class="time">${hours}</span>h 
                <span class="time">${minutes}</span>m 
                <span class="time">${seconds}</span>s`;
            }
        
            // Обновляем каждую секунду
            setInterval(updateCountdown, 1000);
            updateCountdown(); // Вызываем сразу, чтобы не ждать 1 секунду
        });