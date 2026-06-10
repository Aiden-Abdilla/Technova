/* TechNova Electronics JavaScript */

$(document).ready(function () {

    const menuButton = $("#menu-toggle");
    const mainNavigation = $("#main-nav");


    /* Navigation menu */

    menuButton.on("click", function () {
        mainNavigation.toggleClass("is-open");

        const menuIsOpen =
            mainNavigation.hasClass("is-open");

        menuButton.attr(
            "aria-expanded",
            menuIsOpen
        );
    });


    mainNavigation.find("a").on("click", function () {
        if ($(window).width() <= 600) {
            mainNavigation.removeClass("is-open");

            menuButton.attr(
                "aria-expanded",
                "false"
            );
        }
    });


    /* Buy Now buttons */

    $(".buy-btn").on("click", function () {
        alert("Thank you for shopping with us");
    });


    /* Product information buttons */

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

        button.text(
            informationIsVisible
                ? "Hide Info"
                : "More Info"
        );
    });


    /* Magnific Popup gallery plugin */

    if ($.fn.magnificPopup) {
        $(".gallery-container").magnificPopup({
            delegate: "a",
            type: "image",

            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },

            image: {
                titleSrc: "title"
            },

            closeOnContentClick: true,
            mainClass: "mfp-img-mobile"
        });
    }


    /* Contact form validation */

    $("#contact-form").on("submit", function (event) {
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

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern =
            /^\+?[0-9\s-]{8,18}$/;


        $(".form-input").removeClass("is-invalid");
        $(".input-error").text("");

        $("#form-error")
            .removeClass("is-visible")
            .text("");


        if (nameValue.length < 2) {
            $("#user-name").addClass("is-invalid");

            $("#name-error").text(
                "Please enter your full name."
            );

            formIsValid = false;
        }


        if (!emailPattern.test(emailValue)) {
            $("#user-email").addClass("is-invalid");

            $("#email-error").text(
                "Please enter a valid email address."
            );

            formIsValid = false;
        }


        if (!phonePattern.test(phoneValue)) {
            $("#user-phone").addClass("is-invalid");

            $("#phone-error").text(
                "Please enter a valid contact number."
            );

            formIsValid = false;
        }


        if (messageValue.length < 10) {
            $("#user-message").addClass("is-invalid");

            $("#message-error").text(
                "Your message must contain at least 10 characters."
            );

            formIsValid = false;
        }


        if (!formIsValid) {
            $("#form-error")
                .text(
                    "Please correct the highlighted fields."
                )
                .addClass("is-visible");

            return;
        }


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

        const mailtoLink =
            "mailto:Info@abdilla.net" +
            "?subject=" +
            encodeURIComponent(emailSubject) +
            "&body=" +
            encodeURIComponent(emailBody);

        window.location.href = mailtoLink;
    });


    $(".form-input").on("input", function () {
        const input = $(this);

        input.removeClass("is-invalid");

        input
            .closest(".form-group")
            .find(".input-error")
            .text("");
    });

});
