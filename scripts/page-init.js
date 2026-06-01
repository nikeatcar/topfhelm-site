function initializePage() {

    // Timeline
    if (typeof initTimeline === "function") {
        initTimeline();
    }

    // Releases
    if (typeof initReleases === "function") {
        initReleases();
    }

    // Articles
    if (typeof initReadMore === "function") {
        initReadMore();
    }

    // Composer
    if (typeof initTpPlayers === "function") {
    initTpPlayers();
    }

    // Footer
    if (typeof initFooter === "function") {
        initFooter();
    }

    // Share
    if (typeof initShare === "function") {
    initShare();
    }

    if (typeof initSocialBar === "function") {
    initSocialBar();
    }

    if (typeof initLangChange === "function") {
    initLangChange();
    }
}

document.addEventListener("DOMContentLoaded", initializePage);

$(document).on("pjax:complete", function () {
    initializePage();
});

window.addEventListener("popstate", function () {
    window.location.reload();
});