document.addEventListener("DOMContentLoaded", function () {
    const switchLangBtn = document.getElementById("switchLangBtn");

    if (!switchLangBtn) return; // Если кнопки нет, выходим

    switchLangBtn.addEventListener("click", function () {
        let currentURL = window.location.pathname;

        if (currentURL === "/" || currentURL === "/en") {
            // Если текущая главная страница — переключаем на русскую версию
            window.location.href = "/ru";
        } else if (currentURL === "/ru") {
            // Если русская версия — переключаем на английскую
            window.location.href = "/en";
        } else {
            // Если внутри страниц (например, /articles/article.html), меняем en на ru и наоборот
            if (currentURL.includes("-ru")) {
                let newURL = currentURL.replace("-ru", ""); // Убираем -ru для английской версии
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