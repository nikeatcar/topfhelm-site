document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    const presaveBtn = document.getElementById("presave-btn");

    // Объект с переводами
    const translations = {
        "title": {
            "ru": "TopfHelm - Dungeon Folk и Dungeon Synth Музыка",
            "en": "TopfHelm - Dungeon Folk & Dungeon Synth Music"
        },
        "genre": {
            "ru": "Атмосферная музыка в средневековом стиле для любителей DnD, фэнтезийных миров и дарк-фолка",
            "en": "Medieval-inspired atmospheric music for DnD, fantasy worlds, and dark folk lovers"
        },
        "albumText": {
            "ru": "<strong>\"Sanguis et Mulsum\"</strong> выйдет <span class='release-date'>28 Марта</span>! ⚔️🍺",
            "en": "<strong>\"Sanguis et Mulsum\"</strong> out <span class='release-date'>March 28</span>! ⚔️🍺"
        },
        "presave": {
            "ru": "Предсохраняй",
            "en": "Presave Now"
        },
        "newAlbum": {
            "ru": "Новый альбом",
            "en": "New Album"
        },
        "teaser": {
            "ru": "Тизер альбома",
            "en": "Album Teaser"
        },
        "support": {
            "ru": "Поддержи проект",
            "en": "Support The Project"
        },
        "share": {
            "ru": "Делиться",
            "en": "Share"
        },
        "seoTitle": {
            "ru": "TopfHelm – Средневековый Dungeon Folk, Dungeon Synth и Dark Folk",
            "en": "TopfHelm – Medieval Dungeon Folk, Dungeon Synth & Dark Folk"
        },
        "seoText": {
            "ru": "TopfHelm — это проект <strong>Dungeon Folk</strong> и <strong>Dungeon Synth</strong>, вдохновленный <strong>средневековой музыкой</strong>, <strong>атмосферой DnD</strong> и <strong>саундтреками к фэнтезийным мирам</strong>.",
            "en": "TopfHelm is a <strong>Dungeon Folk</strong> and <strong>Dungeon Synth</strong> project inspired by <strong>medieval music</strong>, <strong>DnD atmosphere</strong>, and <strong>fantasy world soundtracks</strong>."
        },
        "contact": {
            "ru": "Связаться",
            "en": "Contact"
        }
    };

    // Определение языка при открытии страницы
    const savedLang = localStorage.getItem("lang") || detectBrowserLang();
    const currentLang = getLangFromURL();

    if (savedLang !== currentLang) {
        history.replaceState(null, "", "/" + savedLang);
    }
    loadLanguageContent(savedLang);

    // ✅ Функция переключения языка
    window.switchLanguage = function (lang) {
        if (getLangFromURL() !== lang) {
            localStorage.setItem("lang", lang);
            history.pushState(null, "", "/" + lang);
            loadLanguageContent(lang);
        }
    };

    function detectBrowserLang() {
        return navigator.language.startsWith("ru") ? "ru" : "en";
    }

    function getLangFromURL() {
        return window.location.pathname.includes("/ru") ? "ru" : "en";
    }

    function loadLanguageContent(lang) {
        document.body.classList.toggle("ru", lang === "ru");
        document.body.classList.toggle("en", lang === "en");

        // Применяем шрифт Monomakh для русского языка
        if (lang === "ru") {
            document.body.style.fontFamily = "'Monomakh', serif";
        } else {
            document.body.style.fontFamily = "'IM Fell English SC', serif";
        }

        document.querySelector("h1").innerHTML = translations["title"][lang];
        document.querySelector(".genre").innerHTML = translations["genre"][lang];
        document.querySelector("h3").innerHTML = translations["albumText"][lang];

        document.getElementById("presave-btn").innerHTML = `<span>${translations["presave"][lang]}</span>`;
        document.querySelector(".album-header span").textContent = translations["newAlbum"][lang];
        document.querySelector(".video-section h2").textContent = translations["teaser"][lang];
        document.querySelector(".support-section h2").textContent = translations["support"][lang];
        document.querySelector(".share-main span").textContent = translations["share"][lang];

        document.querySelector(".seo-text h2").textContent = translations["seoTitle"][lang];
        document.querySelector(".seo-text p").innerHTML = translations["seoText"][lang];

        document.querySelector(".button.contact").textContent = translations["contact"][lang];
    }

    window.addEventListener("popstate", function () {
        const lang = getLangFromURL();
        loadLanguageContent(lang);
    });

    // ✅ Восстановление анимации кнопки Presave Now
    if (presaveBtn) {
        presaveBtn.addEventListener("mouseenter", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#FF6666";
            setTimeout(() => {
                this.innerHTML = getLangFromURL() === "ru" 
                    ? "<span>❤️Спасибо!❤️</span>" 
                    : "<span>❤️Thank You!❤️</span>";
            }, 200);
        });

        presaveBtn.addEventListener("mouseleave", function () {
            this.style.transition = "background-color 0.3s ease-in-out";
            this.style.backgroundColor = "#1DB954";
            setTimeout(() => {
                this.innerHTML = getLangFromURL() === "ru" 
                    ? "<span>Предсохраняй</span>" 
                    : "<span>Presave Now</span>";
            }, 200);
        });
    }

    // ✅ Восстановление кнопки Share
    window.shareTo = function (platform) {
        const url = encodeURIComponent(window.location.href);
        const lang = getLangFromURL();
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
            case "reddit":
                shareUrl = `https://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(shareText)}`;
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
