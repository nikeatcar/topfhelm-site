document.addEventListener("DOMContentLoaded", function () {
    const switchLangBtn = document.getElementById("switchLangBtn");

    if (!switchLangBtn) return; // Если кнопки нет, ничего не делаем

    switchLangBtn.addEventListener("click", function () {
        let currentURL = window.location.href;

        if (currentURL.includes("-ru")) {
            let newURL = currentURL.replace("-ru", "");
            window.location.href = newURL;
        } else {
            let urlParts = currentURL.split("/");
            let filename = urlParts[urlParts.length - 1];
            let newFilename = filename.replace(".html", "-ru.html");
            urlParts[urlParts.length - 1] = newFilename;
            let newURL = urlParts.join("/");
            window.location.href = newURL;
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

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (!scrollToTopBtn) return; // Если кнопки нет, ничего не делаем

    // Функция для показа кнопки с fade-in
    function showScrollButton() {
        scrollToTopBtn.classList.add("show");
        scrollToTopBtn.classList.remove("fade-out");
    }

    // Функция для скрытия кнопки с fade-out
    function hideScrollButton() {
        scrollToTopBtn.classList.add("fade-out");
        scrollToTopBtn.classList.remove("show");
    }

    // Показываем кнопку при прокрутке вниз
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            showScrollButton();
        } else {
            hideScrollButton();
        }
    });

    // Обработчик клика - плавный скролл наверх
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});