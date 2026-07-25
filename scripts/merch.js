// ===== merch.js =====

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       FILTERS
    ========================== */

   document.querySelectorAll(".merch-item").forEach(card=>{

    const video=card.querySelector(".merch-video");

    if(!video) return;

    card.addEventListener("mouseenter",()=>{

        video.currentTime=0;
        video.play().catch(()=>{});

    });

    card.addEventListener("mouseleave",()=>{

        video.pause();
        video.currentTime=0;

    });

});



    /* ==========================
       PRODUCT VIDEOS
    ========================== */

    const touchDevice =
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window;

    const videos = document.querySelectorAll(".merch-media video");

    videos.forEach(video => {

        video.pause();

        // показываем постер
        video.currentTime = 0;

        if (touchDevice) return;

        const card = video.closest(".merch-item");

        card.addEventListener("mouseenter", async () => {

            try {

                video.currentTime = 0;

                await video.play();

            } catch (e) {}

        });

        card.addEventListener("mouseleave", () => {

            video.pause();

            video.currentTime = 0;

        });

    });



    /* ==========================
       STOP ALL WHEN TAB HIDDEN
    ========================== */

    document.addEventListener("visibilitychange", () => {

        if (!document.hidden) return;

        videos.forEach(video => {

            video.pause();

            video.currentTime = 0;

        });

    });



    /* ==========================
       ORDER POPUP
    ========================== */

    const popup = document.getElementById("order-popup");

    if (!popup) return;

    const textarea = document.getElementById("order-text");
    const closeBtn = document.getElementById("close-popup");
    const copyBtn = document.getElementById("copy-order");


    closeBtn.addEventListener("click", () => {

        popup.classList.add("hidden");

    });



    popup.addEventListener("click", e => {

        if (e.target === popup) {

            popup.classList.add("hidden");

        }

    });



    copyBtn.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(textarea.value);

            copyBtn.textContent = "Copied ✓";

            setTimeout(() => {

                copyBtn.textContent = "Copy Order Text";

            }, 1500);

        } catch {

            textarea.select();

            document.execCommand("copy");

        }

    });

});