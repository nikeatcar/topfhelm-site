function initReadMore() {
    const articlesList = document.getElementById("read-more-list");

    if (!articlesList) return;

    if (articlesList.dataset.loading === "true") return;

    articlesList.dataset.loading = "true";
    articlesList.innerHTML = "";

    const lang =
        document.documentElement.lang?.toLowerCase().startsWith("ru") ||
        window.location.pathname.includes("/ru") ||
        window.location.pathname.includes("-ru")
            ? "ru"
            : "en";

    const currentPath = window.location.pathname.replace(/\/$/, "");

    fetch("/articles/articles.json", { cache: "no-cache" })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Could not load articles.json");
            }

            return response.json();
        })
        .then((data) => {
            const articles = data[lang] || [];

            articlesList.innerHTML = "";

            articles.forEach((article) => {
                const articlePath = article.url.replace(/\/$/, "");

                if (articlePath === currentPath) return;

                const listItem = document.createElement("li");

                listItem.innerHTML = `
                    <a href="${article.url}">
                        ⬜ ${article.title}
                    </a>
                `;

                articlesList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.warn("Read more articles failed:", error);
        })
        .finally(() => {
            articlesList.dataset.loading = "false";
        });
}