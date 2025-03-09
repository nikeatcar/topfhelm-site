document.addEventListener("DOMContentLoaded", function () {
    const switchLangBtn = document.getElementById("switchLangBtn");

    if (!switchLangBtn) return; // Если кнопки нет, выходим

    switchLangBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Предотвращаем стандартное поведение ссылки
        let currentURL = window.location.pathname;

        if (currentURL === "/" || currentURL === "/en") {
            window.location.href = "/ru"; // Переключаем на русскую версию
        } else if (currentURL === "/ru") {
            window.location.href = "/en"; // Переключаем на английскую версию
        } else {
            if (currentURL.includes("-ru")) {
                let newURL = currentURL.replace("-ru", ""); // Убираем -ru
                window.location.href = newURL;
            } else {
                let newURL = currentURL.replace(/(\/[a-zA-Z0-9-]+)(\.html)?$/, "$1-ru$2"); // Добавляем -ru перед .html
                window.location.href = newURL;
            }
        }
    });

    console.log("Определение языка страницы...");

    let lang = document.documentElement.lang; // Получаем язык страницы

    if (lang === "ru") {
        document.body.classList.add("ru");
        console.log("Применён русский шрифт Monomakh");
    } else {
        document.body.classList.add("en");
        console.log("Применён английский шрифт IM Fell English SC");
    }
});