document.addEventListener("DOMContentLoaded", function () {
    function rewriteURL() {
        let url = window.location.href;

        if (url.includes("index-ru.html")) {
            history.replaceState(null, "", "/ru");
            location.reload(); // 🔥 Теперь обновляет страницу!
        } else if (url.includes("index.html")) {
            history.replaceState(null, "", "/en");
            location.reload(); // 🔥 Теперь обновляет страницу!
        }
    }

    // Вызываем функцию сразу при загрузке страницы
    rewriteURL();

    // Перехватываем изменения истории (навигация назад/вперёд)
    window.addEventListener("popstate", function () {
        rewriteURL();
    });
});