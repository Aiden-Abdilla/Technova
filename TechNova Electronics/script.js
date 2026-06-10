/* TechNova Electronics JavaScript */

$(document).ready(function () {

    const menuButton = $("#menu-toggle");
    const mainNavigation = $("#main-nav");


    /* =====================================
       NAVIGATION MENU
       ===================================== */

    menuButton.on("click", function () {
        mainNavigation.toggleClass("is-open");

        const menuIsOpen =
            mainNavigation.hasClass("is-open");

        menuButton.attr(
            "aria-expanded",
            menuIsOpen
        );
    });


    /*
     * Close the menu after a navigation link is selected
     * on a screen that is 600px wide or smaller.
     */
    mainNavigation.find("a").on("click", function () {
        if ($(window).width() <= 600) {
            mainNavigation.removeClass("is-open");

            menuButton.attr(
                "aria-expanded",
                "false"
            );
        }
    });


    /* =====================================
       BUY NOW BUTTONS
       ===================================== */

    $(".buy-btn").on("click", function () {
        alert("Thank you for shopping with us");
    });


    /* =====================================
       PRODUCT INFORMATION BUTTONS
       ===================================== */

    $(".info-btn").on("click", function () {
        const button = $(this);

        const informationId =
            button.attr("data-info");

        const informationBox =
            $("#" + informationId);

        if (informationBox.length === 0) {
            return;
        }

        informationBox.toggleClass("is-visible");

        const informationIsVisible =
            informationBox.hasClass("is-visible");

        button.attr(
            "aria-expanded",
            informationIsVisible
        );

        if (informationIsVisible) {
            button.text("Hide Info");
        } else {
            button.text("More Info");
        }
    });


    /* =====================================
       CONTACT FORM VALIDATION
       ===================================== */

    $("#contact-form").on("submit", function (event) {

        /*
         * Stop the form temporarily so that all fields
         * can be checked using jQuery.
         */
        event.preventDefault();

        let formIsValid = true;

        const nameValue =
            $("#user-name").val().trim();

        const emailValue =
            $("#user-email").val().trim();

        const phoneValue =
            $("#user-phone").val().trim();

        const messageValue =
            $("#user-message").val().trim();


        /*
         * Email must contain a valid email structure.
         */
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        /*
         * Phone number may contain:
         * numbers, spaces, plus signs and hyphens.
         *
         * It must contain between 8 and 15 digits.
         */
        const phonePattern =
            /^\+?[0-9\s-]{8,18}$/;


        /*
         * Remove previous validation messages.
         */
        $(".form-input").removeClass("is-invalid");

        $(".input-error").text("");

        $("#form-error")
            .removeClass("is-visible")
            .text("");


        /* Validate full name */

        if (nameValue.length < 2) {
            $("#user-name").addClass("is-invalid");

            $("#name-error").text(
                "Please enter your full name."
            );

            formIsValid = false;
        }


        /* Validate email address */

        if (!emailPattern.test(emailValue)) {
            $("#user-email").addClass("is-invalid");

            $("#email-error").text(
                "Please enter a valid email address."
            );

            formIsValid = false;
        }


        /* Validate contact number */

        if (!phonePattern.test(phoneValue)) {
            $("#user-phone").addClass("is-invalid");

            $("#phone-error").text(
                "Please enter a valid contact number."
            );

            formIsValid = false;
        }


        /* Validate message */

        if (messageValue.length < 10) {
            $("#user-message").addClass("is-invalid");

            $("#message-error").text(
                "Your message must contain at least 10 characters."
            );

            formIsValid = false;
        }


        /*
         * Display a general error when one or more
         * inputs are invalid.
         */
        if (!formIsValid) {
            $("#form-error")
                .text(
                    "Please correct the highlighted fields."
                )
                .addClass("is-visible");

            return;
        }


        /*
         * Create the email subject and content.
         */
        const emailSubject =
            "TechNova Contact Form - " + nameValue;

        const emailBody =
            "Full Name: " +
            nameValue +
            "\n\nEmail Address: " +
            emailValue +
            "\n\nContact Number: " +
            phoneValue +
            "\n\nMessage:\n" +
            messageValue;


        /*
         * Open the user's email application using mailto.
         */
        const mailtoLink =
            "mailto:aabdilla132@gmail.com" +
            "?subject=" +
            encodeURIComponent(emailSubject) +
            "&body=" +
            encodeURIComponent(emailBody);

        window.location.href = mailtoLink;
    });


    /*
     * Remove an input's error while the user is
     * correcting its value.
     */
    $(".form-input").on("input", function () {
        const input = $(this);

        input.removeClass("is-invalid");

        input
            .closest(".form-group")
            .find(".input-error")
            .text("");
    });

});
