document.addEventListener("DOMContentLoaded", async () => {

    const response = await fetch("/data/artists.json");

    window.DSArtists = await response.json();

    window.DSArtistsMap = {};

    window.DSArtists.forEach(artist => {

        window.DSArtistsMap[artist.id] = artist;

    });

    renderArtists();

    renderNavigation();

    initAccordion();

    initNavigation();

    initScrollSpy();

    if(window.initFilters){

        initFilters();

    }

    if(window.initSearch){

        initSearch();

    }

});

function getArtistTranslation(artist, lang){

    const english = artist.translations?.en || {};
    const localized = artist.translations?.[lang] || {};

    return {

        name:
            localized.name ||
            english.name ||
            artist.id,

        description:
            localized.description ||
            english.description ||
            ""

    };

}

function renderArtists(){

    const container = document.querySelector(".artists-list");

    container.innerHTML = "";

    const lang = window.currentLanguage || "en";
    const ui = window.ArtistsI18N?.[lang] || window.ArtistsI18N.en;

    window.DSArtists.forEach(artist=>{

        const t = getArtistTranslation(artist, lang);

        container.insertAdjacentHTML("beforeend",`

<article id="${artist.id}" class="artist-card">

    <button class="artist-header">

        <span class="artist-arrow">▼</span>

        <img
            loading="lazy"
            decoding="async"
            src="${artist.logo}"
            alt="${t.name}">

        <span class="artist-name">
            ${t.name}
        </span>

    </button>

    <div class="artist-body">

        <div class="artist-banner">

            <img
                loading="lazy"
                decoding="async"
                src="${artist.banner}"
                alt="${t.name} Banner">

        </div>

        <div class="artist-top">

            <div class="artist-info">

                <div class="artist-attributes">

                    <div>
                        <strong>${ui.country}</strong>
                        <span>${artist.country}</span>
                    </div>

                    <div>
                        <strong>${ui.mood}</strong>
                        <span>${artist.mood}</span>
                    </div>

                    <div>
                        <strong>${ui.tempo}</strong>
                        <span>${artist.tempo}</span>
                    </div>

                    <div>
                        <strong>${ui.style}</strong>
                        <span>${artist.style}</span>
                    </div>

                </div>

                <div class="artist-links">
                    ${renderLinks(artist)}
                </div>

            </div>

            <div class="artist-player"></div>

        </div>

        <div class="artist-description">

            <p>
                ${t.description}
            </p>

        </div>

    </div>

</article>

`);

    });

    updateArtistsCount();

}

function renderLinks(artist){

    let html = "";

    if(artist.links.spotify){

        html += `
            <a href="${artist.links.spotify}"
               target="_blank"
               rel="noopener">
                Spotify
            </a>
        `;

    }

    if(artist.links.bandcamp){

        html += `
            <a href="${artist.links.bandcamp}"
               target="_blank"
               rel="noopener">
                Bandcamp
            </a>
        `;

    }

    if(artist.links.youtube){

        html += `
            <a href="${artist.links.youtube}"
               target="_blank"
               rel="noopener">
                YouTube
            </a>
        `;

    }

        if(artist.links.apple_music){

        html += `
            <a href="${artist.links.apple_music}"
               target="_blank"
               rel="noopener">
                AppleMusic
            </a>
        `;

    }

    if(artist.links.website){

        html += `
            <a href="${artist.links.website}"
               target="_blank"
               rel="noopener">
                Instagram
            </a>
        `;

    }

    return html;

}

function updateArtistsCount(){

    const cards = document.querySelectorAll(".artist-card");

    let visibleCount = 0;

    cards.forEach(card => {

        const hidden =
            card.hidden ||
            card.style.display === "none";

        if (!hidden){
            visibleCount++;
        }

    });

    const counter = document.getElementById("artists-count");

    if (counter){
        counter.textContent = visibleCount;
    }

}

function renderPlayer(player){

    if(!player) return "";

    switch(player.type){

        case "bandcamp":

            return `
            <iframe
                class="artist-bandcamp-player"
                loading="lazy"
                src="https://bandcamp.com/EmbeddedPlayer/album=${player.id}/size=large/bgcol=333333/linkcol=ffffff/artwork=small/transparent=true/"
                seamless>
            </iframe>
            `;

        case "spotify":

            return `
            <iframe
                class="artist-spotify-player"
                loading="lazy"
                src="https://open.spotify.com/embed/album/${player.id}"
                width="100%"
                height="352"
                frameborder="0"
                allowfullscreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
            </iframe>
            `;

        default:

            return "";

    }

}

function setArtistBackground(artist){

    const page = document.querySelector(".artists-page");

    if (!page) return;

    const background = artist?.background?.trim();

    if (!background){

        resetArtistBackground();
        return;

    }

    const isImage =
        background.startsWith("http://") ||
        background.startsWith("https://");

    if (isImage){

        page.style.setProperty(
            "--artist-background-image",
            `url("${background}")`
        );

        page.style.setProperty(
            "--artist-background-color",
            "transparent"
        );

    }
    else{

        page.style.setProperty(
            "--artist-background-image",
            "none"
        );

        page.style.setProperty(
            "--artist-background-color",
            background
        );

    }

    requestAnimationFrame(() => {

        page.classList.add(
            "has-artist-background"
        );

    });

}


function resetArtistBackground(){

    const page = document.querySelector(".artists-page");

    if (!page) return;

    page.classList.remove(
        "has-artist-background"
    );

    setTimeout(() => {

        if (
            !page.classList.contains(
                "has-artist-background"
            )
        ){

            page.style.removeProperty(
                "--artist-background-image"
            );

            page.style.removeProperty(
                "--artist-background-color"
            );

        }

    }, 1000);

}

/* ==========================================================
   Accordion
========================================================== */

function initAccordion(){

    const cards = document.querySelectorAll(".artist-card");

    cards.forEach(card => {

        const button = card.querySelector(".artist-header");

        button.addEventListener("click", () => {

            const opened = card.classList.contains("open");

            // Закрываем все карточки
            cards.forEach(c => {

                c.classList.remove("open");

                // Удаляем предыдущий плеер
                const player = c.querySelector(".artist-player");

                if(player){

                    player.innerHTML = "";

                    delete player.dataset.loaded;

                }

            });

            if(opened){

                resetArtistBackground();

                return;

            }

            card.classList.add("open");

            const artist = window.DSArtistsMap[card.id];

            setArtistBackground(artist);

            const player = card.querySelector(".artist-player");

            if(player){

                player.innerHTML = renderPlayer(artist.player);

                player.dataset.loaded = "1";

            }

        });

    });

}

function renderNavigation() {

    const nav = document.getElementById("artists-nav");

    if (!nav) return;

    nav.innerHTML = "";

    const lang = window.currentLanguage || "en";

    window.DSArtists.forEach(artist => {

        const t = getArtistTranslation(artist, lang);

        const li = document.createElement("li");

        li.innerHTML = `
            <a href="#${artist.id}">
                ${t.name}
            </a>
        `;

        nav.appendChild(li);

    });

}

/* ==========================================================
   Navigation
========================================================== */

function initNavigation(){

    document.querySelectorAll("#artists-nav a").forEach(link=>{

        link.addEventListener("click",e=>{

            e.preventDefault();

            const target=document.querySelector(link.getAttribute("href"));

            if(!target) return;

            const offset = 400;

            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: "smooth"
            });

        });

    });

}


/* ==========================================================
   Scroll Spy
========================================================== */

function initScrollSpy(){

    const links=document.querySelectorAll("#artists-nav a");

    const cards=document.querySelectorAll(".artist-card");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            links.forEach(link=>link.classList.remove("active"));

            const active=document.querySelector(
                '#artists-nav a[href="#'+entry.target.id+'"]'
            );

            if(active){

                active.classList.add("active");

            }

        });

    },{

        rootMargin:"-30% 0px -60% 0px"

    });

    cards.forEach(card=>observer.observe(card));

}

const artistsSidebar = document.querySelector('.artists-sidebar');
const artistsSidebarToggle = document.querySelector('.artists-sidebar-toggle');

if (artistsSidebar && artistsSidebarToggle) {

    artistsSidebarToggle.addEventListener('click', () => {

        const isOpen = artistsSidebar.classList.toggle('open');

        artistsSidebarToggle.setAttribute(
            'aria-expanded',
            isOpen
        );

    });

}

if (artistsSidebar) {

    artistsSidebar.addEventListener('click', event => {

        const artistLink = event.target.closest('#artists-nav a');

        if (!artistLink) return;

        if (window.innerWidth <= 1100) {

            artistsSidebar.classList.remove('open');

            artistsSidebarToggle?.setAttribute(
                'aria-expanded',
                'false'
            );

        }

    });

}