document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    document.body.classList.add(currentTheme + "-mode");

    // Обновляем кнопку
    themeToggle.textContent = currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

    themeToggle.addEventListener("click", function () {
        const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";

        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(newTheme + "-mode");

        localStorage.setItem("theme", newTheme);

        themeToggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});