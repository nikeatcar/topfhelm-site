class LangChange {

    static initialized = false;

    static async init() {

        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        await Core.loadHTML(
            "langchange",
            "/components/langchange/langchange.html"
        );

        this.bind();

    }

    static injectCSS() {

        if (document.getElementById("langchange-css"))
            return;

        const link = document.createElement("link");

        link.id = "langchange-css";
        link.rel = "stylesheet";
        link.href = "/components/langchange/langchange.css";

        document.head.appendChild(link);

    }

    static bind() {

        this.button = document.getElementById("switchLangBtn");

        document.body.classList.remove("ru", "en");

        const lang = this.getCurrentLanguage();

        document.body.classList.add(lang);

        if (!this.button)
            return;

        this.button.textContent =
            lang === "ru"
                ? "🌍 Read in English"
                : "🌍 Читать на русском";

        this.button.addEventListener(
            "click",
            this.switchLanguage
        );

    }

    static getCurrentLanguage() {

        const path = window.location.pathname.toLowerCase();
        const href = window.location.href.toLowerCase();
        const htmlLang = document.documentElement.lang?.toLowerCase() || "";

        if (
            htmlLang.startsWith("ru") ||
            path === "/ru" ||
            path.includes("/ru/") ||
            path.endsWith("/ru") ||
            path.includes("-ru") ||
            href.includes("index-ru.html")
        ) {
            return "ru";
        }

        return "en";

    }

    static getTargetURL() {

        const currentURL = window.location.pathname;

        // The Emerald Saga
        if (
            currentURL === "/the-emerald-saga/" ||
            currentURL === "/the-emerald-saga"
        )
            return "/the-emerald-saga/ru";

        if (
            currentURL === "/the-emerald-saga/ru" ||
            currentURL === "/the-emerald-saga/ru/"
        )
            return "/the-emerald-saga/";

        // Main
        if (
            currentURL === "/" ||
            currentURL === "/en" ||
            currentURL === "/index.html"
        )
            return "/ru";

        if (
            currentURL === "/ru" ||
            currentURL === "/index-ru.html"
        )
            return "/";

        // Composer
        if (
            currentURL === "/composer/" ||
            currentURL === "/composer" ||
            currentURL === "/composer/index.html"
        )
            return "/composer/ru";

        if (
            currentURL === "/composer/ru" ||
            currentURL === "/composer/ru/" ||
            currentURL === "/composer/index-ru.html"
        )
            return "/composer/";

        // Articles
        if (currentURL.includes("/articles/")) {

            let articleURL = currentURL.replace(/\/$/, "");

            if (articleURL.endsWith("-ru.html"))
                return articleURL.replace("-ru.html", ".html");

            if (articleURL.endsWith("-ru"))
                return articleURL.replace("-ru", ".html");

            if (articleURL.endsWith(".html"))
                return articleURL.replace(".html", "-ru.html");

            return articleURL + "-ru.html";

        }

        // Legacy pages
        if (currentURL.includes("-ru"))
            return currentURL.replace("-ru", "");

        return currentURL.replace(
            /(\/[a-zA-Z0-9-]+)(\.html)?$/,
            "$1-ru$2"
        );

    }

    static switchLanguage = () => {

        window.location.href = this.getTargetURL();

    }

    static destroy() {

        if (this.button) {

            this.button.removeEventListener(
                "click",
                this.switchLanguage
            );

            this.button = null;

        }

        this.initialized = false;

    }

}

window.LangChange = LangChange;