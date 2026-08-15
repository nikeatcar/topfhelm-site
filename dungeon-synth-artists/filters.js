document.addEventListener("DOMContentLoaded", () => {

    initFilters();

});

/* ==========================================================
   Filters
========================================================== */

function initFilters() {

    const artists = window.DSArtists || [];

    const country = document.getElementById("filter-country");
    const style   = document.getElementById("filter-style");
    const mood    = document.getElementById("filter-mood");
    const tempo   = document.getElementById("filter-tempo");

    const lang = window.currentLanguage || "en";
    const ui = window.ArtistsI18N?.[lang] || window.ArtistsI18N.en;

    fillSelect(country, artists, "country", ui.country);
    fillSelect(style, artists, "style", ui.style);
    fillSelect(mood, artists, "mood", ui.mood);
    fillSelect(tempo, artists, "tempo", ui.tempo);

    [country, style, mood, tempo].forEach(select => {

        select.addEventListener("change", filterArtists);

    });

    function filterArtists() {

        artists.forEach(artist => {

            const card = document.getElementById(artist.id);

            if (!card) return;

            const visible =

                matches(country.value, artist.country, "Country") &&
                matches(style.value, artist.style, "Style") &&
                matches(mood.value, artist.mood, "Mood") &&
                matches(tempo.value, artist.tempo, "Tempo");

            card.style.display = visible ? "" : "none";

        });

    }

}

/* ==========================================================
   Helpers
========================================================== */

function fillSelect(select, artists, field, placeholder) {

    const values = [...new Set(
        artists
            .map(a => a[field])
            .filter(Boolean)
            .sort()
    )];

    select.innerHTML = "";

    select.appendChild(new Option(placeholder, ""));

    values.forEach(value => {

        select.appendChild(new Option(value, value));

    });

}

function matches(selected, actual, placeholder) {

    return selected === "" ||
           selected === placeholder ||
           selected === actual;

}