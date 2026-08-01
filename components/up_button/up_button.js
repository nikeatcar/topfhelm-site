class UpButton {

    static initialized = false;

    static async init() {

    if (this.initialized)
        return;

    this.initialized = true;

    this.injectCSS();

    await Core.loadHTML(
    "up_button",
    "/components/up_button/up_button.html"
    );

    this.cache();
    this.bind();

}

    static injectCSS() {

        if (document.getElementById("up-button-css"))
            return;

        const link = document.createElement("link");

        link.id = "up-button-css";
        link.rel = "stylesheet";
        link.href = "/components/up_button/up_button.css";

        document.head.appendChild(link);

    }

    static cache() {

        this.button =
            document.getElementById("scrollToTopBtn");

    }

    static bind() {

        if (!this.button)
            return;

        this.scrollHandler = () => {

            if (window.scrollY > 300) {

                this.button.classList.add("show");
                this.button.classList.remove("fade-out");

            }
            else {

                this.button.classList.add("fade-out");
                this.button.classList.remove("show");

            }

        };

        this.clickHandler = () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        };

        window.addEventListener(
            "scroll",
            this.scrollHandler
        );

        this.button.addEventListener(
            "click",
            this.clickHandler
        );

        this.scrollHandler();

    }

    static destroy() {

        window.removeEventListener(
            "scroll",
            this.scrollHandler
        );

        this.button?.removeEventListener(
            "click",
            this.clickHandler
        );

        this.button = null;
        this.scrollHandler = null;
        this.clickHandler = null;

        this.initialized = false;

    }

}

window.UpButton = UpButton;