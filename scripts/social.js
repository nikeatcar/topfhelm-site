document.addEventListener("DOMContentLoaded", function () {
    const socialBar = document.getElementById("fixed-social-bar");
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY;

        if (scrollTop > 300 && scrollTop > lastScrollTop) {
            // Показываем панель при прокрутке вниз
            socialBar.classList.add("show");
        } else if (scrollTop < 350) {
            // Прячем панель при возврате наверх
            socialBar.classList.remove("show");
        }

        lastScrollTop = scrollTop;
    });
});