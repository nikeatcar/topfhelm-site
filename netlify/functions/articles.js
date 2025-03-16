exports.handler = async (event) => {
    const lang = event.queryStringParameters.lang || "en";

    try {
        const articlesPath = path.join(__dirname, "..", "articles.json");
        const articlesData = fs.readFileSync(articlesPath, "utf-8");
        const articles = JSON.parse(articlesData);

        console.log("Loaded articles:", articles);  // Добавили лог

        if (!articles[lang]) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No articles found for this language" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(articles[lang])
        };
    } catch (error) {
        console.error("Error loading articles:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to load articles" })
        };
    }
};