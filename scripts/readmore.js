document.addEventListener("DOMContentLoaded", function () {
    const lang = document.documentElement.lang || "en"; // Определяем язык страницы
    const currentUrl = window.location.pathname; // Текущая страница

    fetch("../articles/articles.json")
        .then((response) => response.json())
        .then((data) => {
            const articles = data[lang] || [];
            const articlesList = document.getElementById("read-more-list");
            
            articlesList.innerHTML = ""; // Очищаем список перед добавлением
            
            articles.forEach((article) => {
                if (article.url !== currentUrl) {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="${article.url}">⬜ ${article.title}</a>`;
                    articlesList.appendChild(listItem);
                }
            });
        })
});