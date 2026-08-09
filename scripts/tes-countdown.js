(function () {

    let timer = null;

    function initCountdown() {

        const countdown = document.getElementById("tesCountdown");

        if (!countdown) return;

        if (timer) {
            clearInterval(timer);
        }

        const releaseDate = new Date("2026-07-24T08:00:00+03:00");

        const days = document.getElementById("tes-days");
        const hours = document.getElementById("tes-hours");
        const minutes = document.getElementById("tes-minutes");
        const seconds = document.getElementById("tes-seconds");

        const status = document.querySelector(".tes-release-status");
        const button = document.querySelector(".tes-btn");

        function update() {

            const now = new Date();

            const diff = releaseDate - now;

            if (diff <= 0) {

                clearInterval(timer);

                countdown.style.display = "none";

                status.textContent = "Now Available";

                if (button) {

                    button.textContent = "Listen Now";

                    button.href = "https://open.spotify.com/artist/5NHkqDnmyOUMMUrHy2n9Mq";

                }

                return;
            }

            const d = Math.floor(diff / 86400000);

            const h = Math.floor(diff % 86400000 / 3600000);

            const m = Math.floor(diff % 3600000 / 60000);

            const s = Math.floor(diff % 60000 / 1000);

            days.textContent = String(d).padStart(2, "0");
            hours.textContent = String(h).padStart(2, "0");
            minutes.textContent = String(m).padStart(2, "0");
            seconds.textContent = String(s).padStart(2, "0");
        }

        update();

        timer = setInterval(update, 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCountdown);
    } else {
        initCountdown();
    }

    document.addEventListener("pjax:complete", initCountdown);

})();

/* ==========================================================
   Interactive Experience Slider
========================================================== */

document.querySelectorAll(".tes-experience-slider").forEach(slider => {

    const images = slider.querySelectorAll(".tes-slider img");

    images.forEach(img => {

    img.addEventListener("click", () => {

        window.lightbox.open(img.currentSrc || img.src);

    });

});

    const prev = slider.querySelector(".tes-slider-prev");

    const next = slider.querySelector(".tes-slider-next");

    const dotsContainer = slider.parentElement.querySelector(".tes-slider-dots");

    let current = 0;

    /* ---------- create dots ---------- */

    images.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.className = "tes-slider-dot";

        if(index === 0){
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            current = index;

            update();

        });

        dotsContainer.appendChild(dot);

    });

    const dots = dotsContainer.querySelectorAll(".tes-slider-dot");

    /* ---------- update ---------- */

    function update(){

        images.forEach((img, index) => {

            img.classList.toggle("active", index === current);

        });

        dots.forEach((dot, index) => {

            dot.classList.toggle("active", index === current);

        });

    }

    /* ---------- buttons ---------- */

    next.addEventListener("click", () => {

        current++;

        if(current >= images.length){
            current = 0;
        }

        update();

    });

    prev.addEventListener("click", () => {

        current--;

        if(current < 0){
            current = images.length - 1;
        }

        update();

    });

    /* ---------- autoplay ---------- */

    let timer = setInterval(next.click.bind(next), 6000);

    slider.addEventListener("mouseenter", () => {

        clearInterval(timer);

    });

    slider.addEventListener("mouseleave", () => {

        timer = setInterval(next.click.bind(next), 6000);

    });

});