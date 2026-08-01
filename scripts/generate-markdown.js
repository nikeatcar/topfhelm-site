import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { NodeHtmlMarkdown } from "node-html-markdown";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const IGNORE_DIRS = new Set([
    "node_modules",
    ".git",
    ".netlify",
    "scripts",
    "dist",
    "build",
    ".vscode",
    "markdown"
]);

const nhm = new NodeHtmlMarkdown({
    codeBlockStyle: "fenced"
});

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {

        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {

            if (IGNORE_DIRS.has(entry.name))
                continue;

            walk(full);
            continue;
        }

        if (!entry.name.endsWith(".html"))
            continue;

        const relative = path.relative(ROOT, full).replace(/\\/g, "/");

        if (
            relative.startsWith("components/") ||
            relative.startsWith(".well-known/") ||
            relative.startsWith("markdown/") ||
            relative === "yandex_5ff52d574d43ec35.html"
        ) {
            continue;
        }

        convert(full);
    }
}

function convert(file) {

    console.log("Converting:", path.relative(ROOT, file));

    const html = fs.readFileSync(file, "utf8");

    const $ = cheerio.load(html);

    // Удаляем ненужное
    $("script").remove();
    $("style").remove();
    $("noscript").remove();

    $("header").remove();
    $("footer").remove();
    $("nav").remove();
    $("aside").remove();

    $(".cookie").remove();
    $(".cookies").remove();
    $(".popup").remove();
    $(".modal").remove();
    $(".newsletter").remove();
    $(".social").remove();
    $(".share").remove();

    $(".button").remove();
    $(".btn").remove();
    $(".cta").remove();
    $(".hero-buttons").remove();
    $(".timeline-controls").remove();
    $(".social-links").remove();
    $(".share-buttons").remove();

    $(".breadcrumbs").remove();
    $(".breadcrumb").remove();

    $(".pagination").remove();
    $(".pager").remove();

    $(".sidebar").remove();

    $(".comments").remove();
    $(".comment").remove();

    $(".related").remove();
    $(".related-posts").remove();

    $(".advertisement").remove();
    $(".ads").remove();
    $(".banner").remove();

    // Берем основной контент
    const content =
        $("main").html() ||
        $("article").html() ||
        $("body").html() ||
        "";

    const markdown = nhm.translate(content).trim();

    const cleaned = markdown
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")

    // Удаляем ссылки-картинки
    .replace(/\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/g, "")

    // Удаляем обычные картинки Markdown
    .replace(/!\[[^\]]*]\([^)]+\)\n?/g, "")

    // Удаляем эмодзи
    .replace(/[\p{Extended_Pictographic}]/gu, "")

    // Удаляем пустые ссылки
    .replace(/\[\s*\]\([^)]+\)/g, "")

    // Удаляем горизонтальные линии
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")

    // Убираем лишние пробелы
    .replace(/[ \t]{2,}/g, " ")

    // Убираем лишние пустые строки
    .replace(/\n{3,}/g, "\n\n")

    .trim();

    const relative = path.relative(ROOT, file).replace(/\\/g, "/");

    const today = new Date().toISOString().slice(0, 10);

    const title =
        $("title").text().trim() || path.basename(file);

    const description =
    $('meta[name="description"]').attr("content")?.trim();

    const language =
    relative.endsWith("-ru.html") ||
    relative.endsWith("/index-ru.html")
        ? "ru"
        : "en";

    const type =
    relative.startsWith("articles/")
        ? "article"
        : "website";

    let canonical =
    $('link[rel="canonical"]').attr("href");

    if (!canonical) {
        if (relative === "index.html") {
            canonical = "https://topfhelm.com/";
        } else if (relative === "index-ru.html") {
            canonical = "https://topfhelm.com/ru";
        } else {
            canonical = `https://topfhelm.com/${relative}`;
        }
    }

    let pageUrl;

    if (relative === "index.html") {
        pageUrl = "https://topfhelm.com/";
    }
    else if (relative === "index-ru.html") {
        pageUrl = "https://topfhelm.com/ru";
    }
    else {
        pageUrl = `https://topfhelm.com/${relative}`;
    }

const frontMatter = `---
type: ${type}
title: ${title}
description: ${description}
url: ${pageUrl}
canonical: ${canonical}
language: ${language}
source: TopfHelm Official Website
generator: TopfHelm Markdown Generator
last_updated: ${today}
---

`;

    let filename;

    // Главная
    if (relative === "index.html") {
        filename = "index.md";
    }
    else if (relative === "index-ru.html") {
        filename = "index-ru.md";
    }

    // Composer
    else if (relative === "composer/index.html") {
        filename = "composer.md";
    }
    else if (relative === "composer/index-ru.html") {
        filename = "composer-ru.md";
    }

    // Shop
    else if (relative === "shop/index.html") {
        filename = "shop.md";
    }
    else if (relative === "shop.html") {
        filename = "shop.md";
    }

    // The Emerald Saga
    else if (relative === "the-emerald-saga/index.html") {
        filename = "the-emerald-saga.md";
    }
    else if (relative === "the-emerald-saga/index-ru.html") {
        filename = "the-emerald-saga-ru.md";
    }

    // Остальные страницы
    else {
        filename = relative
            .replace(/\//g, "-")
            .replace(/\.html$/i, ".md");
    }

    const outFile = path.join(ROOT, "markdown", filename);

    fs.writeFileSync(
    outFile,
    frontMatter + cleaned,
    "utf8"
    );
}

// ==========================
// Запуск генерации
// ==========================

console.log("Cleaning markdown folder...");

// Полностью удаляем старую папку
fs.rmSync(path.join(ROOT, "markdown"), {
    recursive: true,
    force: true
});

// Создаем новую
fs.mkdirSync(path.join(ROOT, "markdown"), {
    recursive: true
});

console.log("Generating markdown...");

// Генерируем
walk(ROOT);

console.log("Done!");