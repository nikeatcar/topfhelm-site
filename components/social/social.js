class Social {

    static initialized = false;

    static async init() {
        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        await Core.loadHTML(
            "social",
            "/components/social/social.html"
        );

        this.cache();
        this.bind();

    }

    static injectCSS() {

        if (document.getElementById("social-css"))
            return;

        const link = document.createElement("link");

        link.id = "social-css";
        link.rel = "stylesheet";
        link.href = "/components/social/social.css";

        document.head.appendChild(link);

    }

    static cache() {

        this.fixedBar =
            document.getElementById("fixed-social-bar");

    }

    static bind() {

        if (!this.fixedBar)
            return;

        this.lastScrollTop = window.scrollY || 0;

        this.scrollHandler = () => {

            const scrollTop = window.scrollY || 0;

            if (
                scrollTop > 300 &&
                scrollTop > this.lastScrollTop
            ) {

                this.fixedBar.classList.add("show");

            }
            else if (scrollTop < 350) {

                this.fixedBar.classList.remove("show");

            }

            this.lastScrollTop = scrollTop;

        };

        window.addEventListener(
            "scroll",
            this.scrollHandler
        );

        this.scrollHandler();

        this.homeLink = document.getElementById("home-link");

        this.homeClickHandler = (e) => {

            e.preventDefault();

            window.location.href = "/";

        };

        this.homeLink?.addEventListener(
            "click",
            this.homeClickHandler
        );

    }

    static destroy() {

        if (this.scrollHandler) {

            window.removeEventListener(
                "scroll",
                this.scrollHandler
            );

        }

        this.fixedBar = null;
        this.scrollHandler = null;
        this.lastScrollTop = 0;

        this.initialized = false;

        this.homeLink?.removeEventListener(
            "click",
            this.homeClickHandler
        );

        this.homeLink = null;
        this.homeClickHandler = null;

    }

}

window.Social = Social;