const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const articlesDir = path.join(__dirname, '../articles');

// Функция для извлечения <h1> из HTML-файла
const getArticleTitle = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);

        if (match) {
            let title = match[1].trim();
            title = title.replace(/<[^>]*>/g, ""); // Удаляем HTML-теги
            return `▪ ${title}`; // Добавляем маркер перед заголовком
        }

        return `▪ ` + path.basename(filePath, '.html').replace(/-/g, ' ');
    } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return `▪ ` + path.basename(filePath, '.html').replace(/-/g, ' ');
    }
};

app.get('/articles', (req, res) => {
    const lang = req.query.lang || 'en'; // Получаем язык из запроса

    fs.readdir(articlesDir, (err, files) => {
        if (err) {
            console.error("Error reading articles directory:", err);
            return res.status(500).json({ error: "Unable to read articles directory" });
        }

        const articles = files
            .filter(file => file.endsWith('.html'))
            .filter(file => lang === 'ru' ? file.includes('-ru.html') : !file.includes('-ru.html')) // Фильтр по языку
            .map(file => {
                const filePath = path.join(articlesDir, file);
                return {
                    title: getArticleTitle(filePath), // Получаем заголовок статьи
                    url: `/articles/${file}`
                };
            });

        console.log(`Articles found for lang=${lang}:`, articles);
        res.json(articles);
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});