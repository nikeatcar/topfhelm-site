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