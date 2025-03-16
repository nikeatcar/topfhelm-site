document.addEventListener("DOMContentLoaded", function () {
    const readMoreContainer = document.getElementById("read-more");
    if (!readMoreContainer) return;

    const currentUrl = window.location.pathname;
    const lang = document.documentElement.lang || 'en'; // Определяем язык страницы

    fetch('/.netlify/functions/articles?lang=' + lang)
        .then(response => response.json())
        .then(data => {
            const articles = data[lang] || [];
            articles.forEach(article => {
                if (currentUrl.includes(article.url)) return; // Исключаем текущую статью

                const listItem = document.createElement("li");
                const link = document.createElement("a");

                link.href = article.url;
                link.textContent = article.title;
                listItem.appendChild(link);

                // Добавляем белый квадратик перед названием
                const squareIcon = document.createElement("span");
                squareIcon.textContent = "⬜ "; 
                listItem.prepend(squareIcon);

                readMoreContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading articles:", error));
});