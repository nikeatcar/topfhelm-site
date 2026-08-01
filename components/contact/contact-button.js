class ContactButton {

    static initialized = false;

    static async init() {

        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        await Core.loadHTML(
            "contact-button",
            "/components/contact/contact-button.html"
        );

        this.bind();

    }

    static injectCSS() {

        if (document.getElementById("contact-button-css"))
            return;

        const link = document.createElement("link");

        link.id = "contact-button-css";
        link.rel = "stylesheet";
        link.href = "/components/contact/contact-button.css";

        document.head.appendChild(link);

    }

    static bind() {

    this.button = document.querySelector(".button.contact");

    if (!this.button)
        return;

    const lang = document.body.lang || "en";

    this.button.textContent =
        lang === "ru"
            ? "Связаться"
            : "Contact Us";

    this.button.addEventListener(
        "click",
        this.openContact
    );

}

    static openContact(event) {

        event.preventDefault();

        document.dispatchEvent(
            new CustomEvent("contact:open")
        );

    }

    static destroy() {

        if (this.button) {

            this.button.removeEventListener(
                "click",
                this.openContact
            );

            this.button = null;

        }

        this.initialized = false;

    }

}

window.ContactButton = ContactButton;