exports.handler = async function (event, context) {
    try {
        const lang = event.queryStringParameters.lang || 'en';
        const fs = require('fs');
        const path = require('path');

        const articlesDir = path.resolve(process.cwd(), 'articles');
        if (!fs.existsSync(articlesDir)) {
            throw new Error("Articles directory not found");
        }

        const files = fs.readdirSync(articlesDir);
        const filteredFiles = files
            .filter(file => file.endsWith('.html') && file.includes(lang))
            .map(file => ({
                title: file.replace('.html', '').replace(/-/g, ' '), // Форматируем имя
                url: `/articles/${file}`
            }));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filteredFiles)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to load articles", details: error.message })
        };
    }
};