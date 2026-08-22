window.initSearch = function(){

    const input = document.getElementById("artists-search");

    if (!input){
        console.warn("Artist search input not found.");
        return;
    }

    input.addEventListener("input", function(){

        const query = input.value
            .trim()
            .toLowerCase();

        searchArtists(query);

    });

};


function searchArtists(query){

    if (!window.DSArtists){
        return;
    }

    const lang = window.currentLanguage || "en";

    window.DSArtists.forEach(artist => {

        const card = document.getElementById(artist.id);

        if (!card){
            return;
        }

        const localized =
            artist.translations?.[lang] || {};

        const english =
            artist.translations?.en || {};

        const text = [

            localized.name,
            english.name,

            artist.label_name,

            artist.country,
            artist.genre,
            artist.style,
            artist.mood,
            artist.tempo,
            artist.tags

        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


        const found =
            query === "" ||
            text.includes(query);


        card.hidden = !found;


        const navLink = document.querySelector(
            `#artists-nav a[href="#${artist.id}"]`
        );

        if (navLink){

            const li = navLink.closest("li");

            if (li){
                li.hidden = !found;
            }

        }

    });


    if (typeof updateArtistsCount === "function"){
        updateArtistsCount();
    }

}