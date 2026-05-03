/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                     ----==| П Р Е Л О А Д Е Р |==----                      ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/

document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.style.display = "flex";
        preloader.style.opacity = "1";
        preloader.style.visibility = "visible";
    }
});

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    setTimeout(() => {
        preloader.style.transition = "opacity 0.4s ease";
        preloader.style.opacity = "0";

        setTimeout(() => {
            preloader.style.display = "none";
            preloader.style.visibility = "hidden";
        }, 400);
    }, 700); // сколько держим прелоадер
});


/*;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;                         ----==| FADE IN |==----                             ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;*/

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-in");

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => observer.observe(section));
});