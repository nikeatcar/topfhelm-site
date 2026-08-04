class Core {

    static components = [

        {
            class: "LangChange",
            script: "/components/langchange/langchange.js",
            attribute: "data-langchange"
        },

        {
            class: "Social",
            script: "/components/social/social.js",
            attribute: "data-social"
        },

        {
            class: "Share",
            script: "/components/share/share.js",
            attribute: "data-share"
        },

        {
            class: "Footer",
            script: "/components/footer/footer.js",
            attribute: "data-footer"
        },

        {
            class: "ContactButton",
            script: "/components/contact/contact-button.js",
            attribute: "data-contact-button"
        },
        {
            class: "Contact",
            script: "/components/contact/contact.js",
            attribute: "data-contact"
        },

        {
            class: "Preloader",
            script: "/components/preloader/preloader.js",
            attribute: "data-preloader"
        },

        {
            class: "UpButton",
            script: "/components/up_button/up_button.js",
            attribute: "data-up-button"
        },

        {
            class: "Radio",
            script: "/components/radio/radio.js",
            attribute: "data-radio"
        },

        {
            class: "Lightbox",
            script: "/components/lightbox/lightbox.js",
            attribute: "data-lightbox"
        }

    ];

    static async init() {

    await this.initOnce();
    await this.initPage();

    }

    static async initOnce() {

        console.log("Core.initOnce()");

    }

    static async initPage() {

        console.log("Core.initPage()");

        for (const component of this.components) {

            if (!document.body.hasAttribute(component.attribute))
                continue;

            await this.loadScript(component.script);

            const instance = window[component.class];

            if (instance?.init)
                await instance.init();

        }

        console.log("TopfHelm Core loaded.");

    }

    static loadScript(src) {

    return new Promise((resolve, reject) => {

        const existing = document.querySelector(
            `script[src="${src}"]`
        );

        if (existing) {

            if (existing.dataset.loaded === "true") {
                resolve();
                return;
            }

            existing.addEventListener("load", resolve, { once: true });
            existing.addEventListener("error", reject, { once: true });

            return;
        }

        const script = document.createElement("script");

        script.src = src;

        script.onload = () => {

            script.dataset.loaded = "true";
            resolve();

        };

        script.onerror = reject;

        document.head.appendChild(script);

    });

    }

    static async loadHTML(component, file) {

    const container = document.querySelector(
        `[data-component="${component}"]`
    );

    if (!container)
        return null;

    const response = await fetch(file);

    if (!response.ok)
        throw new Error(`Cannot load ${file}`);

    const html = await response.text();

    container.outerHTML = html;

}

}

Core.init();