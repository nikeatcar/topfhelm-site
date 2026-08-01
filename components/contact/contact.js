class Contact {

    static initialized = false;

    static async init() {

        if (this.initialized)
            return;

        this.initialized = true;

        this.injectCSS();

        await Core.loadHTML(
            "contact",
            "/components/contact/contact.html"
        );

        this.bind();

    }

    static injectCSS() {

        if (document.getElementById("contact-css"))
            return;

        const link = document.createElement("link");

        link.id = "contact-css";
        link.rel = "stylesheet";
        link.href = "/components/contact/contact.css";

        document.head.appendChild(link);

    }

    static bind() {

        this.modal = document.getElementById("contactModal");
        this.close = document.querySelector(".close-modal");
        this.form = document.getElementById("contactForm");
        this.status = document.getElementById("form-status");

        if (!this.modal || !this.close || !this.form)
            return;

        document.addEventListener(
            "contact:open",
            this.openModal
        );

        this.close.addEventListener(
            "click",
            this.closeModal
        );

        this.form.addEventListener(
            "submit",
            this.submitForm
        );

        window.addEventListener(
            "click",
            this.overlayClick
        );

    }

    static openModal = () => {

        this.modal.classList.add("active");
        document.body.classList.add("no-scroll");

    }

    static closeModal = () => {

        this.modal.classList.remove("active");
        document.body.classList.remove("no-scroll");

    }

    static overlayClick = (event) => {

        if (event.target === this.modal)
            this.closeModal();

    }

    static submitForm = async (event) => {

        event.preventDefault();

        const response = await fetch(
            this.form.action,
            {
                method: this.form.method,
                body: new FormData(this.form),
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const lang = document.body.lang || "en";

        if (response.ok) {

            this.form.reset();

            this.status.textContent =
                lang === "ru"
                    ? "Сообщение успешно отправлено!"
                    : "Message sent successfully!";

            setTimeout(() => {

                this.status.textContent = "";

                this.closeModal();

            }, 2500);

        } else {

            this.status.textContent =
                lang === "ru"
                    ? "Ошибка при отправке сообщения."
                    : "Error sending message.";

        }

    }

    static destroy() {

        document.removeEventListener(
            "contact:open",
            this.openModal
        );

        if (this.close)
            this.close.removeEventListener(
                "click",
                this.closeModal
            );

        if (this.form)
            this.form.removeEventListener(
                "submit",
                this.submitForm
            );

        window.removeEventListener(
            "click",
            this.overlayClick
        );

        this.modal = null;
        this.close = null;
        this.form = null;
        this.status = null;

        this.initialized = false;

    }

}

window.Contact = Contact;