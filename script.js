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
            "ru": "Скоро выйдет новый альбом <span class='english-text'>\"Sanguis et Mulsum\"! ⚔️🍺</span>",
            "en": "New album <span class='english-text'>\"Sanguis et Mulsum\" coming soon! ⚔️🍺</span>"
        },
        "presave": {
            "ru": "Предсохраняй",
            "en": "Presave Now"
        },
        "newAlbum": {
            "ru": "Новый альбом",
            "en": "New Album"
        },
        "releaseDate": {
            "ru": "выйдет <span class='release-date'>28 Марта</span>! ⚔️🍺",
            "en": "out <span class='release-date'>March 28</span>! ⚔️🍺"
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
            "ru": "TopfHelm — это проект <strong>Dungeon Folk</strong> и <strong>Dungeon Synth</strong>, вдохновленный <strong>средневековой музыкой</strong>, <strong>атмосферой DnD</strong> и <strong>саундтреками к фэнтезийным мирам</strong>. Наша музыка идеально подходит для <strong>ролевых игр (RPG), настольных сессий и событий на средневековую тематику</strong>. Основываясь на <strong>истории крестоносцев</strong>, мы создаем **атмосферный звуковой ландшафт**, который подходит как для **фэнтезийных сражений**, так и для **пиров в древних крепостях**.",
            "en": "TopfHelm is a <strong>Dungeon Folk</strong> and <strong>Dungeon Synth</strong> project inspired by <strong>medieval music</strong>, <strong>DnD atmosphere</strong>, and <strong>fantasy world soundtracks</strong>. Our music is perfect for <strong>role-playing games (RPGs), tabletop sessions, and medieval-themed events</strong>. Rooted in <strong>crusader history</strong>, we create an **atmospheric soundscape** that fits both **fantasy battles** and **ancient fortress feasts**."
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

        document.querySelector("h1").innerHTML = translations["title"][lang];
        document.querySelector(".genre").innerHTML = translations["genre"][lang];
        document.querySelector("h3").innerHTML = translations["albumText"][lang];

        document.getElementById("presave-btn").innerHTML = `<span>${translations["presave"][lang]}</span>`;
        document.querySelector(".album-header span").textContent = translations["newAlbum"][lang];
        document.querySelector(".album-text p:nth-child(2)").innerHTML = translations["releaseDate"][lang];
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

    // Таймер релиза
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

        countdownText.innerHTML = getLangFromURL() === "ru"
            ? `⏳ Великий пир начнётся через: <span class="time">${days}</span>д <span class="time">${hours}</span>ч <span class="time">${minutes}</span>м <span class="time">${seconds}</span>с`
            : `⏳ The grand feast begins in: <span class="time">${days}</span>d <span class="time">${hours}</span>h <span class="time">${minutes}</span>m <span class="time">${seconds}</span>s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
