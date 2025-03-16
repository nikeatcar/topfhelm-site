document.addEventListener("DOMContentLoaded", function() {
    const readMoreContainer = document.getElementById("read-more");

    if (!readMoreContainer) return;

    const currentUrl = window.location.href;
    const lang = document.documentElement.lang || 'en'; // Определяем язык страницы

    fetch(`http://localhost:3000/articles?lang=${lang}`)
        .then(response => response.json())
        .then(articles => {
            articles.forEach(article => {
                if (currentUrl.includes(article.url)) return; // Исключаем текущую статью
                
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = article.url;
                link.textContent = article.title;
                listItem.appendChild(link);
                readMoreContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading articles:", error));
});