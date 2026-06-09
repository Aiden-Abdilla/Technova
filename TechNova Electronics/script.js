/* --- TechNova Electronics Script --- */

/*
 * Adds a product to the cart.
 * Currently displays a confirmation alert.
 */
function addToCart() {
    alert("Product was successfully added to your cart!");
}

/*
 * Shows or hides a selected product description.
 */
function showInfo(id) {
    const infoBox = document.getElementById(id);

    if (infoBox) {
        infoBox.classList.toggle("is-visible");
    }
}

/*
 * Checks whether an email address has a valid format.
 */
function isValidEmail(email) {
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}

/*
 * Runs after the page and jQuery have loaded.
 */
$(document).ready(function () {
    const menuButton = $("#menu-toggle");
    const mainNavigation = $("#main-nav");

    /*
     * Opens and closes the navigation menu.
     */
    menuButton.on("click", function () {
        mainNavigation.toggleClass("is-open");

        const menuIsOpen = mainNavigation.hasClass("is-open");

        $(this).attr("aria-expanded", menuIsOpen);
    });

    /*
     * Closes the mobile menu when a navigation link is selected.
     */
    mainNavigation.find("a").on("click", function () {
        if ($(window).width() <= 600) {
            mainNavigation.removeClass("is-open");
            menuButton.attr("aria-expanded", "false");
        }
    });

    /*
     * Resets the menu when the browser window is resized.
     */
    $(window).on("resize", function () {
        if ($(window).width() > 600) {
            mainNavigation.removeClass("is-open");
            menuButton.attr("aria-expanded", "false");
        }
    });

    /*
     * Validates the contact form before it is submitted.
     */
    $("#contact-form").on("submit", function (event) {
        let formIsValid = true;

        const userName = $("#user-name").val().trim();
        const userEmail = $("#user-email").val().trim();
        const messageContent = $("#user-message").val().trim();

        /*
         * Checks that all required fields contain information.
         */
        $(this).find(".form-input").each(function () {
            const fieldValue = $(this).val().trim();

            if (fieldValue === "") {
                $(this).addClass("is-invalid");
                formIsValid = false;
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        /*
         * Checks that the email address has a valid format.
         */
        if (userEmail !== "" && !isValidEmail(userEmail)) {
            $("#user-email").addClass("is-invalid");
            formIsValid = false;
        }

        /*
         * Stops submission and displays an error when validation fails.
         */
        if (!formIsValid) {
            event.preventDefault();

            $("#form-error")
                .text(
                    "Please complete all fields and enter a valid email address, " +
                    "for example name@example.com."
                )
                .addClass("is-visible");

            return;
        }

        /*
         * Hides the error message after successful validation.
         */
        $("#form-error").removeClass("is-visible");

        /*
         * Creates the email content from the submitted information.
         */
        const emailBody =
            "Name: " +
            userName +
            "\nEmail: " +
            userEmail +
            "\n\nMessage:\n" +
            messageContent;

        const cleanMailto =
            "mailto:info@abdilla.net" +
            "?subject=" +
            encodeURIComponent("Customer Inquiry: " + userName) +
            "&body=" +
            encodeURIComponent(emailBody);

        /*
         * Updates the form action before submission.
         */
        $(this).attr("action", cleanMailto);
    });

    /*
     * Removes validation errors while the user corrects the form.
     */
    $(".form-input").on("input", function () {
        const fieldValue = $(this).val().trim();

        if (fieldValue !== "") {
            $(this).removeClass("is-invalid");
        }

        /*
         * Validates the email field while it is being edited.
         */
        if ($(this).attr("id") === "user-email") {
            if (fieldValue !== "" && !isValidEmail(fieldValue)) {
                $(this).addClass("is-invalid");
            } else {
                $(this).removeClass("is-invalid");
            }
        }

        const nameIsValid = $("#user-name").val().trim() !== "";

        const emailValue = $("#user-email").val().trim();
        const emailIsValid =
            emailValue !== "" && isValidEmail(emailValue);

        const messageIsValid =
            $("#user-message").val().trim() !== "";

        /*
         * Hides the general error after every field becomes valid.
         */
        if (nameIsValid && emailIsValid && messageIsValid) {
            $("#form-error").removeClass("is-visible");
        }
    });
});
