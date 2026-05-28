window.addEventListener("load", () => {
    const form = document.getElementById("commissionForm");

    if (!form) return;

    const submitButton = form.querySelector(".commission-submit");

    const status = document.createElement("p");
    status.className = "commission-form-status";
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    const requiredFields = form.querySelectorAll("[required]");

    function clearFieldError(field) {
        const wrapper = field.closest("label");
        if (!wrapper) return;

        wrapper.classList.remove("has-error");

        const error = wrapper.querySelector(".field-error");
        if (error) error.remove();
    }

    function showFieldError(field, message) {
        const wrapper = field.closest("label");
        if (!wrapper) return;

        clearFieldError(field);

        wrapper.classList.add("has-error");

        const error = document.createElement("span");
        error.className = "field-error";
        error.textContent = message;

        wrapper.appendChild(error);
    }

    function validateForm() {
        let isValid = true;
        let firstInvalid = null;

        requiredFields.forEach((field) => {
            clearFieldError(field);

            const value = field.value.trim();

            if (!value) {
                isValid = false;
                if (!firstInvalid) firstInvalid = field;

                showFieldError(field, "This field is required.");
                return;
            }

            if (field.type === "email" && !field.validity.valid) {
                isValid = false;
                if (!firstInvalid) firstInvalid = field;

                showFieldError(field, "Please enter a valid email address.");
            }
        });

        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return isValid;
    }

    requiredFields.forEach((field) => {
        field.addEventListener("input", () => clearFieldError(field));
        field.addEventListener("change", () => clearFieldError(field));
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "";
        status.classList.remove("is-success", "is-error");

        if (!validateForm()) {
            status.textContent = "Please fill in the required fields.";
            status.classList.add("is-error");
            return;
        }

        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const formData = new FormData(form);

            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                form.reset();

                status.textContent = "Your commission request has been sent. I will reply as soon as possible.";
                status.classList.add("is-success");
            } else {
                status.textContent = "Something went wrong. Please try again or contact me by email.";
                status.classList.add("is-error");
            }
        } catch (error) {
            status.textContent = "Connection error. Please try again later or contact me by email.";
            status.classList.add("is-error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});