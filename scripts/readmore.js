document.addEventListener("DOMContentLoaded", function () {
    const readMoreContainer = document.getElementById("read-more");
    if (!readMoreContainer) return;

    const currentUrl = window.location.pathname;
    const lang = document.documentElement.lang || 'en';

    fetch('/.netlify/functions/articles?lang=' + lang)
    .then(response => response.json())
    .then(data => {
        console.log("Articles response:", data);
        if (!Array.isArray(data)) {
            console.error("Unexpected response format:", data);
            return;
        }
        data.forEach(article => {
            console.log("Article:", article);
        });
    })
    .catch(error => console.error("Error loading articles:", error));
            articles.forEach(article => {
                if (currentUrl.includes(article.url)) return;

                const listItem = document.createElement("li");
                const link = document.createElement("a");

                link.href = article.url;
                link.textContent = article.title;
                listItem.appendChild(link);

                const squareIcon = document.createElement("span");
                squareIcon.textContent = "⬜ "; 
                listItem.prepend(squareIcon);

                readMoreContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading articles:", error));