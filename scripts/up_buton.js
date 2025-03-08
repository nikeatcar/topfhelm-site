// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// ;;                                                                            ;;
// ;;                  ----==| К Н О П К А   В В Е Р Х |==----                   ;;
// ;;                                                                            ;;
// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    document.addEventListener("DOMContentLoaded", function () {
    // Показываем кнопку при прокрутке вниз
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (!scrollToTopBtn) return; // Если кнопки нет - ничего не делаем

    // Функция для показа кнопки с fade-in
    function showScrollButton() {
        scrollToTopBtn.classList.add("show");
        scrollToTopBtn.classList.remove("fade-out");
    }

    // Функция для скрытия кнопки с fade-out
    function hideScrollButton() {
        scrollToTopBtn.classList.add("fade-out");
        scrollToTopBtn.classList.remove("show");
    }

    // Показываем кнопку при прокрутке вниз
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            showScrollButton();
        } else {
            hideScrollButton();
        }
    });
    
    // Обработчик клика - плавный скролл наверх
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});