/* --- TechNova Electronics Script --- */


/*
 * Displays a confirmation when a product is added to the cart.
 */
function addToCart() {
    alert("Product was successfully added to your cart!");
}


/*
 * Opens or closes product information.
 *
 * This function supports buttons that use:
 * onclick="showInfo('info1', this)"
 */
function showInfo(infoId, clickedButton) {
    const infoBox = document.getElementById(infoId);

    if (!infoBox) {
        console.error("Information box not found: " + infoId);
        return;
    }

    const informationIsVisible =
        infoBox.classList.toggle("is-visible");

    /*
     * Change the text of the button that was pressed.
     */
    if (clickedButton) {
        clickedButton.textContent = informationIsVisible
            ? "Hide Info"
            : "More Info";

        clickedButton.setAttribute(
            "aria-expanded",
            informationIsVisible
        );
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
        mainNavigation.stop(true, true).slideToggle(400);

        const menuIsOpen =
            $(this).attr("aria-expanded") === "true";

        $(this).attr("aria-expanded", !menuIsOpen);
    });


    /*
     * Repairs the menu when the viewport is resized.
     */
    $(window).on("resize", function () {
        if ($(window).width() > 600) {
            mainNavigation.removeAttr("style");
            menuButton.attr("aria-expanded", "false");
        }
    });


    /*
     * Controls Info buttons that use data-info attributes.
     *
     * Example:
     * <button class="info-btn" data-info="info1">More Info</button>
     */
    $(".info-btn").on("click", function () {
        const button = $(this);
        const infoId = button.attr("data-info");
        const infoBox = $("#" + infoId);

        if (infoBox.length === 0) {
            console.error("Information box not found: " + infoId);
            return;
        }

        infoBox.toggleClass("is-visible");

        const informationIsVisible =
            infoBox.hasClass("is-visible");

        button.text(
            informationIsVisible
                ? "Hide Info"
                : "More Info"
        );

        button.attr(
            "aria-expanded",
            informationIsVisible
        );
    });


    /*
     * Validates the contact form.
     */
    $("#contact-form").on("submit", function (event) {
        let formIsValid = true;

        $(this).find(".form-input").each(function () {
            const fieldValue = $(this).val().trim();

            if (fieldValue === "") {
                $(this).addClass("is-invalid");
                formIsValid = false;
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        const userName =
            $("#user-name").val()?.trim() || "";

        const userEmail =
            $("#user-email").val()?.trim() || "";

        const messageContent =
            $("#user-message").val()?.trim() || "";

        if (
            userEmail !== "" &&
            !isValidEmail(userEmail)
        ) {
            $("#user-email").addClass("is-invalid");
            formIsValid = false;
        }

        if (!formIsValid) {
            event.preventDefault();

            $("#form-error")
                .text(
                    "Please complete all fields and enter a valid email address."
                )
                .addClass("is-visible");

            return;
        }

        $("#form-error").removeClass("is-visible");

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
            encodeURIComponent(
                "Customer Inquiry: " + userName
            ) +
            "&body=" +
            encodeURIComponent(emailBody);

        $(this).attr("action", cleanMailto);
    });


    /*
     * Removes validation errors while fields are corrected.
     */
    $(".form-input").on("input", function () {
        if ($(this).val().trim() !== "") {
            $(this).removeClass("is-invalid");
        }
    });
});
