class Preloader {

    static initialized = false;

    static SHOW_DELAY = 700;
    static FADE_DURATION = 400;

    static preloader = null;

    static async init() {

        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        this.cache();

        this.bind();

        this.initFadeIn();

    }

    static cache() {

        this.preloader = document.getElementById("preloader");

    }

    static bind() {

        const hide = () => {

            setTimeout(() => {

                this.hide();

            }, this.SHOW_DELAY);

        };

        if (document.readyState === "complete") {

            hide();
            return;

        }

        this.onLoad = hide;

        window.addEventListener("load", this.onLoad, {
            once: true
        });

    }

    static injectCSS() {

        if (document.getElementById("preloader-css"))
            return;

        const link = document.createElement("link");

        link.id = "preloader-css";
        link.rel = "stylesheet";
        link.href = "/components/preloader/preloader.css";

        document.head.appendChild(link);

    }

    static show() {

        if (!this.preloader)
            return;

        this.preloader.style.opacity = "1";

    }

    static hide() {

        if (!this.preloader)
            return;

        this.preloader.style.opacity = "0";

        setTimeout(() => {

            this.preloader.remove();
            this.preloader = null;

        }, this.FADE_DURATION);

    }

    static initFadeIn() {

        const sections = document.querySelectorAll(".fade-in");

        if (!sections.length)
            return;

        this.observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting)
                    entry.target.classList.add("visible");

            });

        }, {
            threshold: 0.1
        });

        sections.forEach(section => {

            this.observer.observe(section);

        });

    }

    static destroy() {

        if (this.onLoad)
            window.removeEventListener("load", this.onLoad);

        if (this.observer)
            this.observer.disconnect();

        this.preloader = null;

        this.initialized = false;

    }

}

window.Preloader = Preloader;