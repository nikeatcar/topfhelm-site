function getLangFromURL() {
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

function getLanguageTargetURL() {
    const currentURL = window.location.pathname;

    // The Emerald Saga
    if (currentURL === "/the-emerald-saga/" || currentURL === "/the-emerald-saga") {
        return "/the-emerald-saga/ru";
    }

    if (currentURL === "/the-emerald-saga/ru" || currentURL === "/the-emerald-saga/ru/") {
        return "/the-emerald-saga/";
    }

    // Главная
    if (currentURL === "/" || currentURL === "/en" || currentURL === "/index.html") {
        return "/ru";
    }

    if (currentURL === "/ru" || currentURL === "/index-ru.html") {
        return "/en";
    }

    // Composer
if (
    currentURL === "/composer/" ||
    currentURL === "/composer" ||
    currentURL === "/composer/index.html"
) {
    return "/composer/ru";
}

if (
    currentURL === "/composer/ru" ||
    currentURL === "/composer/ru/" ||
    currentURL === "/composer/index-ru.html"
) {
    return "/composer/";
}

    // Articles
if (currentURL.includes("/articles/")) {
    let articleURL = currentURL.replace(/\/$/, "");

    // RU → EN
    if (articleURL.endsWith("-ru.html")) {
        return articleURL.replace("-ru.html", ".html");
    }

    if (articleURL.endsWith("-ru")) {
        return articleURL.replace("-ru", ".html");
    }

    // EN → RU
    if (articleURL.endsWith(".html")) {
        return articleURL.replace(".html", "-ru.html");
    }

    return articleURL + "-ru.html";
}

    // Старые страницы через -ru
    if (currentURL.includes("-ru")) {
        return currentURL.replace("-ru", "");
    }

    return currentURL.replace(
        /(\/[a-zA-Z0-9-]+)(\.html)?$/,
        "$1-ru$2"
    );
}

function initLangChange() {
    const switchLangBtn = document.getElementById("switchLangBtn");

    document.body.classList.remove("ru", "en");

    if (getLangFromURL() === "ru") {
        document.body.classList.add("ru");
    } else {
        document.body.classList.add("en");
    }

    if (!switchLangBtn) return;

    switchLangBtn.onclick = function () {
        window.location.href = getLanguageTargetURL();
    };
}