/* jshint esversion: 6 */
/* jshint -W014 */
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");
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