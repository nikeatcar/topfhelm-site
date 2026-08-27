/* ==========================================================
   Filters
========================================================== */

function initFilters() {

    const artists = window.DSArtists || [];

    const country = document.getElementById("filter-country");
    const invention   = document.getElementById("filter-invention");
    const label   = document.getElementById("filter-label");
    const style   = document.getElementById("filter-style");
    const mood    = document.getElementById("filter-mood");
    const tempo   = document.getElementById("filter-tempo");

    if (!label || !country || !invention || !style || !mood || !tempo) {
        return;
    }

    const lang = window.currentLanguage || "en";
    const ui = window.ArtistsI18N?.[lang] || window.ArtistsI18N.en;

    fillSelect(country, artists, "country", ui.country);
    fillSelect(invention, artists, "invention", ui.invention);
    fillLabelSelect(label, artists, ui.label, ui.noLabel);
    fillSelect(style, artists, "style", ui.style);
    fillSelect(mood, artists, "mood", ui.mood);
    fillSelect(tempo, artists, "tempo", ui.tempo);

    [country, invention, label, style, mood, tempo].forEach(select => {

        select.addEventListener("change", filterArtists);

    });

    function fillLabelSelect(select, artists, placeholder, noLabelText) {

        const values = [...new Set(
            artists
                .map(a => a.label_name)
                .filter(Boolean)
                .sort()
        )];

        select.innerHTML = "";

        select.appendChild(
            new Option(placeholder, "")
        );

        select.appendChild(
            new Option(noLabelText, "__NO_LABEL__")
        );

        values.forEach(value => {

            select.appendChild(
                new Option(value, value)
            );

        });

    }

    function filterArtists() {

        artists.forEach(artist => {

            const card = document.getElementById(artist.id);

            if (!card) return;

            const labelMatches =
                label.value === "" ||

                (
                    label.value === "__NO_LABEL__" &&
                    !artist.label_name
                ) ||

                label.value === artist.label_name;


            const visible =

                matches(country.value, artist.country) &&
                labelMatches &&
                matches(invention.value, artist.invention) &&
                matches(style.value, artist.style) &&
                matches(mood.value, artist.mood) &&
                matches(tempo.value, artist.tempo);


            card.style.display = visible ? "" : "none";

        });

        updateArtistsCount();
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

    select.appendChild(
        new Option(placeholder, "")
    );

    values.forEach(value => {

        select.appendChild(
            new Option(value, value)
        );

    });

}


function matches(selected, actual) {

    return selected === "" ||
           selected === actual;

}