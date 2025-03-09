document.addEventListener("DOMContentLoaded", function () {
    const switchLangBtn = document.getElementById("switchLangBtn");

    if (!switchLangBtn) return; // Если кнопки нет, выходим

    switchLangBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Останавливаем стандартный переход

        let currentURL = window.location.pathname;
        let newURL = "";

        if (currentURL === "/" || currentURL === "/en") {
            newURL = "/ru"; // Главная → русская версия
        } else if (currentURL === "/ru") {
            newURL = "/en"; // Русская версия → английская
        } else {
            if (currentURL.includes("-ru")) {
                newURL = currentURL.replace("-ru", ""); // Убираем -ru, переключая на английский
            } else {
                newURL = currentURL.replace(/(\/[a-zA-Z0-9-]+)(\.html)?$/, "$1-ru$2"); // Добавляем -ru перед .html
            }
        }

        if (newURL !== window.location.pathname) {
            console.log(`Переключение языка: ${window.location.pathname} → ${newURL}`);
            window.location.href = newURL; // Перенаправляем
        } else {
            console.log("Язык уже выбран, редирект не выполняется.");
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