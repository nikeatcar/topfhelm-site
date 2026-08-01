class Lightbox {

    constructor() {

        this.isOpen = false;

        this.create();
        this.bind();

    }

    create() {

        this.overlay = document.createElement("div");
        this.image = document.createElement("img");

        this.overlay.style.cssText = `
            position:fixed;
            inset:0;
            display:flex;
            justify-content:center;
            align-items:center;
            background:rgba(0,0,0,.92);
            opacity:0;
            visibility:hidden;
            transition:opacity .2s ease;
            z-index:100000;
            cursor:zoom-out;
        `;

        this.image.style.cssText = `
            max-width:90vw;
            max-height:90vh;
            border:2px solid #5b4725;
            box-shadow:0 0 30px rgba(0,0,0,.8);
            transform:scale(.96);
            transition:transform .2s ease;
            user-select:none;
            pointer-events:none;
        `;

        this.overlay.appendChild(this.image);
        document.body.appendChild(this.overlay);

    }

    bind() {

        document.addEventListener("click", (e) => {

            const target = e.target.closest("[data-lightbox]");

            if (!target) return;

            const src =
                target.dataset.lightbox ||
                target.currentSrc ||
                target.src ||
                target.href;

            if (!src) return;

            this.open(src);

        });

        this.overlay.addEventListener("click", () => {

            this.close();

        });

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {
                this.close();
            }

        });

    }

    open(src) {

        if (this.isOpen) return;

        this.isOpen = true;

        this.image.src = src;

        document.body.style.overflow = "hidden";

        this.overlay.style.visibility = "visible";
        this.overlay.style.opacity = "1";
        this.image.style.transform = "scale(1)";

    }

    close() {

        if (!this.isOpen) return;

        this.isOpen = false;

        document.body.style.overflow = "";

        this.overlay.style.opacity = "0";
        this.image.style.transform = "scale(.96)";

        setTimeout(() => {

            this.overlay.style.visibility = "hidden";
            this.image.src = "";

        }, 200);

    }

}

window.lightbox = new Lightbox();