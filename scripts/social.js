function getSocialIconPath(icon) {
    return `/icons/${icon}`;
}

function initSocialBar() {

    let socialBar = document.getElementById("fixed-social-bar");

    if (!socialBar) {

        socialBar = document.createElement("div");
        socialBar.id = "fixed-social-bar";

        socialBar.innerHTML = `
            <div class="social-icons">

                <a href="/" aria-label="Home">
                    <img src="${getSocialIconPath("home.svg")}" alt="Home" loading="lazy">
                </a>

                <a href="https://open.spotify.com/artist/5NHkqDnmyOUMMUrHy2n9Mq" target="_blank" rel="noopener" aria-label="Spotify">
                    <img src="${getSocialIconPath("icons8-spotify.svg")}" alt="Spotify" loading="lazy">
                </a>

                <a href="https://topfhelm.bandcamp.com/" target="_blank" rel="noopener" aria-label="Bandcamp">
                    <img src="${getSocialIconPath("icons8-bandcamp.svg")}" alt="Bandcamp" loading="lazy">
                </a>

                <a href="https://www.instagram.com/topfhelmmusic/" target="_blank" rel="noopener" aria-label="Instagram">
                    <img src="${getSocialIconPath("icons8-insta.svg")}" alt="Instagram" loading="lazy">
                </a>

                <a href="https://www.tiktok.com/@topfhelmmusic" target="_blank" rel="noopener" aria-label="TikTok">
                    <img src="${getSocialIconPath("icons8-tiktok.svg")}" alt="TikTok" loading="lazy">
                </a>

                <a href="https://vk.com/topfhelmmusic" target="_blank" rel="noopener" aria-label="VK">
                    <img src="${getSocialIconPath("6214734_logo_vk_vkontakte_icon.svg")}" alt="VK" loading="lazy">
                </a>

                <a href="https://www.youtube.com/@TopfHelmMusic" target="_blank" rel="noopener" aria-label="YouTube">
                    <img src="${getSocialIconPath("icons8-youtube.svg")}" alt="YouTube" loading="lazy">
                </a>

            </div>
        `;

        document.body.appendChild(socialBar);
    }

    if (window.socialBarScrollHandler) {
        window.removeEventListener(
            "scroll",
            window.socialBarScrollHandler
        );
    }

    let lastScrollTop = window.scrollY || 0;

    window.socialBarScrollHandler = function () {

        const scrollTop = window.scrollY || 0;

        if (
            scrollTop > 300 &&
            scrollTop > lastScrollTop
        ) {
            socialBar.classList.add("show");
        }
        else if (scrollTop < 350) {
            socialBar.classList.remove("show");
        }

        lastScrollTop = scrollTop;
    };

    window.addEventListener(
        "scroll",
        window.socialBarScrollHandler
    );

    // Проверяем состояние сразу после загрузки
    window.socialBarScrollHandler();
}