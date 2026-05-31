document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("topfhelm-timeline");
    if (!container) return;

    const pageLang =
        document.documentElement.lang ||
        document.body.getAttribute("lang") ||
        "en";

    const isRu = pageLang.toLowerCase().startsWith("ru");

    const titleEl = document.querySelector("[data-timeline-title]");
    const subtitleEl = document.querySelector("[data-timeline-subtitle]");

    if (titleEl) {
        titleEl.textContent = isRu ? "Хроника" : "The Chronicle";
    }

    if (subtitleEl) {
        subtitleEl.textContent = isRu
            ? "Краткий путь по релизам и мирам TopfHelm."
            : "A brief path through TopfHelm releases and worlds.";
    }

    const timelineData = [
        {
            date: {
                en: "Mar 28, 2025",
                ru: "28 марта 2025"
            },
            title: "Sanguis Et Mulsum",
            cover: "media/TopfHelm_Sanguis_Et_Mulsum.webp",
            albumKey: "sanguis"
        },
        {
            date: {
                en: "May 9, 2025",
                ru: "9 мая 2025"
            },
            title: "Sir Godric",
            cover: "media/TopfHelm_Sir_Godric.webp",
            albumKey: "sirgodric"
        },
        {
            date: {
                en: "Jul 11, 2025",
                ru: "11 июля 2025"
            },
            title: "40",
            cover: "media/40.webp",
            albumKey: "forty"
        },
        {
            date: {
                en: "Aug 15, 2025",
                ru: "15 августа 2025"
            },
            title: "Solemnis",
            cover: "media/TopfHelm_Solemnis.webp",
            albumKey: "solemnis"
        },
        {
            date: {
                en: "Dec 12, 2025",
                ru: "12 декабря 2025"
            },
            title: "Spadčyna",
            cover: "media/TopfHelm_Spadcyna.webp",
            albumKey: "spadcyna"
        },
        {
            date: {
                en: "2026",
                ru: "2026"
            },
            title: "TES: The Still Place",
            cover: "the-emerald-saga/media/The_Still_Place_cover.png",
            link: "/the-emerald-saga/"
        }
    ];

    container.innerHTML = `
        <div class="timeline-preview">
            <a class="timeline-cover-link" href="#">
                <img id="timeline-cover" src="" alt="">
            </a>

            <div class="timeline-title"></div>
            <div class="timeline-date"></div>

            <a class="timeline-link" href="#">
                ${isRu ? "Открыть" : "Explore"}
            </a>
        </div>

        <div class="timeline-rail">
            ${timelineData.map((item, index) => `
                <button class="timeline-point ${index === timelineData.length - 1 ? "active" : ""}"
                        type="button"
                        data-index="${index}"
                        aria-label="${item.title}">
                    <span class="timeline-dot"></span>
                    <span class="timeline-year">${item.date[isRu ? "ru" : "en"]}</span>
                </button>
            `).join("")}
        </div>
    `;

    const cover = container.querySelector("#timeline-cover");
    const coverLink = container.querySelector(".timeline-cover-link");
    const title = container.querySelector(".timeline-title");
    const date = container.querySelector(".timeline-date");
    const link = container.querySelector(".timeline-link");
    const buttons = container.querySelectorAll(".timeline-point");

    function renderTimelineItem(index) {

    const item = timelineData[index];
    const currentDate = item.date[isRu ? "ru" : "en"];

    container.dataset.activeIndex = index;

    container.classList.add("is-changing");

    setTimeout(() => {

        cover.src = item.cover;
        cover.alt = item.title;

        title.textContent = item.title;
        date.textContent = currentDate;

        if (item.albumKey) {
    coverLink.href = "#";
    link.href = "#";
} else {
    coverLink.href = item.link || "#";
    link.href = item.link || "#";
}

        container.classList.remove("is-changing");

    }, 160);
}

function openCurrentTimelineItem(event) {
    const activeIndex = Number(container.dataset.activeIndex);
    const item = timelineData[activeIndex];

    if (!item) return;

    if (item.albumKey) {
        event.preventDefault();

        if (typeof window.openAlbumFromTimeline === "function") {
            window.openAlbumFromTimeline(item.albumKey);
        } else {
            console.warn("openAlbumFromTimeline is not available. Check releases.js connection/order.");
        }

        return;
    }

    if (item.link) {
        window.location.href = item.link;
    }
}

link.addEventListener("click", openCurrentTimelineItem);
coverLink.addEventListener("click", openCurrentTimelineItem);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            renderTimelineItem(Number(button.dataset.index));
        });
    });

    renderTimelineItem(timelineData.length - 1);
});