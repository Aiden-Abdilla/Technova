```javascript
/* --- TechNova Electronics - Final Submission Script --- */

/**
 * 1. ADD TO CART FUNCTION (Requirement Q3e)
 * Displays an alert when a user adds a product to the cart.
 */
function addToCart() {
    alert("Product was successfully added to your cart!");
}

/**
 * 2. PRODUCT INFO TOGGLE (Requirement Q3f)
 * Shows or hides the selected product description.
 * The visual styling is controlled through the .is-visible CSS class.
 */
function showInfo(id) {
    const infoBox = document.getElementById(id);

    if (infoBox) {
        infoBox.classList.toggle("is-visible");
    }
}

/**
 * 3. JQUERY FUNCTIONS
 * All jQuery functionality runs after the page has loaded.
 */
$(document).ready(function () {

    /* Navigation Menu Toggle */
    $("#menu-toggle").on("click", function () {
        $("#main-nav").toggleClass("is-open");

        const menuIsOpen = $("#main-nav").hasClass("is-open");

        $(this).attr("aria-expanded", menuIsOpen);
    });

    /* Reset the navigation menu when the browser is resized */
    $(window).on("resize", function () {
        if ($(window).width() > 600) {
            $("#main-nav").removeClass("is-open");
            $("#menu-toggle").attr("aria-expanded", "false");
        }
    });

    /* Contact Form Validation */
    $("#contact-form").on("submit", function (event) {
        let formIsValid = true;

        const userName = $("#user-name").val().trim();
        const userEmail = $("#user-email").val().trim();
        const messageContent = $("#user-message").val().trim();

        /*
         * Check every field that uses the .form-input class.
         * Empty fields receive the .is-invalid class.
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
         * Check that the email contains:
         * - Text before the @ symbol
         * - An @ symbol
         * - A valid domain name
         * - A domain extension of at least two letters
         */
        if (userEmail !== "" && !isValidEmail(userEmail)) {
            $("#user-email").addClass("is-invalid");
            formIsValid = false;
        }

        if (!formIsValid) {
            /*
             * Prevent the email application from opening when the
             * form contains missing or invalid information.
             */
            event.preventDefault();

            $("#form-error")
                .text(
                    "Please complete all fields and enter a valid email address, " +
                    "for example name@example.com."
                )
                .addClass("is-visible");

            return;
        }

        /* Hide the error message when validation is successful */
        $("#form-error").removeClass("is-visible");

        /* Create the mailto link using the submitted information */
        const emailBody =
            "Name: " + userName +
            "\nEmail: " + userEmail +
            "\n\nMessage:\n" + messageContent;

        const cleanMailto =
            "mailto:info@abdilla.net" +
            "?subject=" +
            encodeURIComponent("Customer Inquiry: " + userName) +
            "&body=" +
            encodeURIComponent(emailBody);

        /* Update the form action immediately before submission */
        $(this).attr("action", cleanMailto);
    });

    /* Remove error styling while the user corrects a field */
    $(".form-input").on("input", function () {
        const fieldValue = $(this).val().trim();

        if (fieldValue !== "") {
            $(this).removeClass("is-invalid");
        }

        /*
         * Check the email format while the email field is edited.
         */
        if ($(this).attr("id") === "user-email") {
            if (fieldValue !== "" && !isValidEmail(fieldValue)) {
                $(this).addClass("is-invalid");
            } else if (isValidEmail(fieldValue)) {
                $(this).removeClass("is-invalid");
            }
        }

        /*
         * Hide the general error message once every field contains
         * valid information.
         */
        const nameIsValid = $("#user-name").val().trim() !== "";
        const emailValue = $("#user-email").val().trim();
        const emailIsValid =
            emailValue !== "" && isValidEmail(emailValue);
        const messageIsValid =
            $("#user-message").val().trim() !== "";

        if (nameIsValid && emailIsValid && messageIsValid) {
            $("#form-error").removeClass("is-visible");
        }
    });
});

/**
 * Checks whether an email address contains an @ symbol,
 * a valid domain and a domain extension.
 *
 * Valid examples:
 * name@gmail.com
 * student@mcast.edu.mt
 * support@abdilla.net
 
function isValidEmail(email) {
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}
```
