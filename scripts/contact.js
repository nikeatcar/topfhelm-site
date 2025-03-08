document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script loaded!");

    // 🟢 Контактная форма
    const contactModal = document.getElementById("contactModal");
    const openContactBtn = document.getElementById("openContactForm");
    const closeModal = document.querySelector(".close-modal");

    if (contactModal && openContactBtn && closeModal) {
        openContactBtn.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("🟢 Открытие формы контактов");
            contactModal.classList.add("active");
            document.body.classList.add("no-scroll");
        });

        closeModal.addEventListener("click", function () {
            console.log("🟢 Закрытие формы контактов");
            contactModal.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });

        window.addEventListener("click", function (event) {
            if (event.target === contactModal) {
                contactModal.classList.remove("active");
                document.body.classList.remove("no-scroll");
            }
        });
    } else {
        console.error("❌ Contact modal elements not found. Check HTML structure.");
    }
});