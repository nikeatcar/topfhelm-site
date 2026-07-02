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