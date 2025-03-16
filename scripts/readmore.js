document.addEventListener("DOMContentLoaded", function () {
    const readMoreContainer = document.getElementById("read-more");
    if (!readMoreContainer) return;

    const currentUrl = window.location.pathname;
    const lang = document.documentElement.lang || 'en';

    fetch('/.netlify/functions/articles?lang=' + lang)
.then(response => response.json())
.then(data => {
    console.log("Articles response:", data);

    if (!data || !Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        return;
    }

    data.forEach(article => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span class="square-icon">⬜</span> <a href="${article.url}">${article.title}</a>`;
        document.getElementById("read-more").appendChild(listItem);
    });
})
.catch(error => console.error("Error loading articles:", error));
});