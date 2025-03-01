document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    
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

    /* Новый рабочий параллакс */
    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY;
        let parallaxSpeed = 0.2; // Теперь фон двигается медленнее, но видно эффект
        document.querySelector(".blurred-bg").style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    });
});
