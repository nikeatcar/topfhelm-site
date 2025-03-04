document.addEventListener("DOMContentLoaded", function () {
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

        countdownText.innerHTML = window.getLangFromURL() === "ru"
            ? `⏳ Великий пир начнётся через: <span class="time">${days}</span>д <span class="time">${hours}</span>ч <span class="time">${minutes}</span>м <span class="time">${seconds}</span>с`
            : `⏳ The grand feast begins in: <span class="time">${days}</span>d <span class="time">${hours}</span>h <span class="time">${minutes}</span>m <span class="time">${seconds}</span>s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    window.copyLink = function () {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Link copied to clipboard!");
        });
    };

    window.shareTo = function (platform) {
        const url = encodeURIComponent(window.location.href);
        const lang = window.getLangFromURL();
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
            case "email":
                shareUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${url}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank");
        }
    };

    window.openShareModal = function () {
        document.getElementById("share-modal").classList.add("active");
        document.body.classList.add("no-scroll");
    };

    window.closeShareModal = function () {
        document.getElementById("share-modal").classList.remove("active");
        document.body.classList.remove("no-scroll");
    };
});
