document.addEventListener("DOMContentLoaded", function () {
    const switchLangBtn = document.getElementById("switchLangBtn");

    if (!switchLangBtn) return; // Если кнопки нет, выходим

    switchLangBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Останавливаем стандартный переход

        let currentURL = window.location.pathname;
        let newURL = "";

        // Проверяем текущий URL и переключаем язык
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

        // Обновляем URL только если он действительно изменился
        if (newURL !== currentURL) {
            console.log(`Переключение языка: ${currentURL} → ${newURL}`);
            localStorage.setItem("selectedLanguage", newURL); // Запоминаем язык в локальном хранилище
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

    // Убираем автоматический редирект назад
    let storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang && storedLang !== window.location.pathname) {
        console.log(`Авто-редирект отменён: ${storedLang} ≠ ${window.location.pathname}`);
    }
});