class Footer {

    static initialized = false;

    static async init() {

        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        await Core.loadHTML(
            "footer",
            "/components/footer/footer.html"
        );

    }

    static injectCSS() {

        if (document.getElementById("footer-css"))
            return;

        const link = document.createElement("link");

        link.id = "footer-css";
        link.rel = "stylesheet";
        link.href = "/components/footer/footer.css";

        document.head.appendChild(link);

    }

    static destroy() {

        this.initialized = false;

    }

}

window.Footer = Footer;