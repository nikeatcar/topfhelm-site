document.addEventListener("DOMContentLoaded", function () {
    window.switchLanguage = function (lang) {
        localStorage.setItem("lang", lang);
        history.pushState(null, "", "/" + lang);
        loadLanguageContent(lang);
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

        if (lang === "ru") {
            document.body.style.fontFamily = "'Monomakh', serif";
        } else {
            document.body.style.fontFamily = "'IM Fell English SC', serif";
        }
    }

    window.getLangFromURL = getLangFromURL;
    window.loadLanguageContent = loadLanguageContent;

    const savedLang = localStorage.getItem("lang") || detectBrowserLang();
    loadLanguageContent(savedLang);
});