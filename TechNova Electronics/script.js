/* TechNova Electronics JavaScript */

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-toggle");
    const mainNavigation = document.getElementById("main-nav");

    /*
     * Open and close the navigation menu.
     */
    if (menuButton && mainNavigation) {
        menuButton.addEventListener("click", function () {
            mainNavigation.classList.toggle("is-open");

            const menuIsOpen =
                mainNavigation.classList.contains("is-open");

            menuButton.setAttribute(
                "aria-expanded",
                menuIsOpen.toString()
            );
        });
    }

    /*
     * Display the required alert when any Buy Now button is pressed.
     */
    const buyButtons = document.querySelectorAll(".buy-btn");

    buyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            alert("Thank you for shopping with us");
        });
    });

    /*
     * Show or hide the information underneath a product.
     */
    const infoButtons = document.querySelectorAll(".info-btn");

    infoButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const informationId =
                button.getAttribute("data-info");

            const informationBox =
                document.getElementById(informationId);

            if (!informationBox) {
                return;
            }

            informationBox.classList.toggle("is-visible");

            const informationIsVisible =
                informationBox.classList.contains("is-visible");

            button.textContent =
                informationIsVisible
                    ? "Hide Info"
                    : "More Info";

            button.setAttribute(
                "aria-expanded",
                informationIsVisible.toString()
            );
        });
    });

    /*
     * Close the navigation menu when a link is pressed
     * on a small screen.
     */
    const navigationLinks =
        document.querySelectorAll("#main-nav a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                window.innerWidth <= 600 &&
                mainNavigation &&
                menuButton
            ) {
                mainNavigation.classList.remove("is-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    });

    /*
     * Contact form validation.
     */
    const contactForm =
        document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            function (event) {
                const nameField =
                    document.getElementById("user-name");

                const emailField =
                    document.getElementById("user-email");

                const messageField =
                    document.getElementById("user-message");

                const formError =
                    document.getElementById("form-error");

                const nameValue =
                    nameField
                        ? nameField.value.trim()
                        : "";

                const emailValue =
                    emailField
                        ? emailField.value.trim()
                        : "";

                const messageValue =
                    messageField
                        ? messageField.value.trim()
                        : "";

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    nameValue === "" ||
                    !emailPattern.test(emailValue) ||
                    messageValue === ""
                ) {
                    event.preventDefault();

                    if (formError) {
                        formError.textContent =
                            "Please complete all fields and enter " +
                            "a valid email address.";

                        formError.classList.add("is-visible");
                    }
                }
            }
        );
    }
});
