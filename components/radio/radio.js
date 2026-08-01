class Radio {

    static initialized = false;

    static async init() {

        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        await Core.loadHTML(
            "radio",
            "/components/radio/radio.html"
        );

        await this.loadScripts();

        await RadioLoader.init();

        await window.radioManager.init();

    }

    static injectCSS() {

        if (document.getElementById("radio-css"))
            return;

        const link = document.createElement("link");

        link.id = "radio-css";
        link.rel = "stylesheet";
        link.href = "/components/radio/radio.css";

        document.head.appendChild(link);

    }

    static async loadScripts() {

        const files = [

            "/components/radio/loader.js",
            "/components/radio/AudioPlayer.js",
            "/components/radio/Playlist.js",
            "/components/radio/RadioManager.js"

        ];

        for (const src of files) {

            if (document.querySelector(`script[src="${src}"]`))
                continue;

            await new Promise(resolve => {

                const script = document.createElement("script");

                script.src = src;
                script.onload = resolve;

                document.body.appendChild(script);

            });

        }

    }

    static destroy() {

        this.initialized = false;

    }

}

window.Radio = Radio;