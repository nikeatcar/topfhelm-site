document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");

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

    if (presaveBtn) {
        presaveBtn.addEventListener("mouseenter", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#FF6666";
            setTimeout(() => {
                this.innerHTML = window.getLangFromURL() === "ru" 
                    ? "<span>❤️Спасибо!❤️</span>" 
                    : "<span>❤️Thank You!❤️</span>";
            }, 200);
        });

        presaveBtn.addEventListener("mouseleave", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#1DB954";
            setTimeout(() => {
                this.innerHTML = window.getLangFromURL() === "ru" 
                    ? "<span>Предсохраняй</span>" 
                    : "<span>Presave Now</span>";
            }, 200);
        });
    }
});