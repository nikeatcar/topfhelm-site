document.addEventListener("DOMContentLoaded", function () {
    function rewriteURL() {
        let url = window.location.href;

        if (url.includes("index-ru.html")) {
            history.replaceState(null, "", "/ru");
        } else if (url.includes("index.html")) {
            history.replaceState(null, "", "/en");
        }
    }

    rewriteURL();

    window.addEventListener("popstate", function () {
        rewriteURL();
    });
});