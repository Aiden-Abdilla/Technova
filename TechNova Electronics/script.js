/* --- TechNova Electronics - Final Submission Script --- */

/**
 * 1. ADD TO CART FUNCTION (Requirement Q3e)
 * Displays a simple alert when a user adds an item to their cart.
 */
function addToCart() {
    alert("Product was successfully added to your cart!");
}

/**
 * 2. PRODUCT INFO TOGGLE (Requirement Q3f)
 * Standard JavaScript to show or hide the detailed description of products.
 * Used for the "More Info" buttons on the Home and Shop pages.
 */
function showInfo(id) {
    var x = document.getElementById(id);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

/**
 * 3. JQUERY FUNCTIONS
 * All interactive jQuery logic is contained within the document ready function.
 */
$(document).ready(function() {
    
    // --- NAVIGATION MENU TOGGLE ---
    // Listens for a click on the 'Menu' button and slides the nav open/shut.
    // Ensure your HTML button has id="menu-toggle" and nav has id="main-nav".
    $("#menu-toggle").click(function() {
        $("#main-nav").stop().slideToggle(400);
    });

    // --- DESKTOP RESIZE REPAIR ---
    // If the user resizes the window back to desktop size, 
    // this ensures the navigation menu is forced back to visible.
    $(window).resize(function() {
        if ($(window).width() >= 600) {
            $("#main-nav").removeAttr("style"); 
        }
    });

    // --- CONTACT FORM VALIDATION & CLEAN MAILTO ---
    // Validates inputs and prepares a professional email body.
    $("#contact-form").submit(function(event) {
        var isValid = true;
        
        // Loop through all inputs with the class .form-input to check for empty values
        $(this).find(".form-input").each(function() {
            if ($(this).val().trim() === "") {
                isValid = false;
                $(this).css("border", "2px solid #e74c3c"); // Highlight empty fields in red
            } else {
                $(this).css("border", "1px solid #ccc"); // Reset border for filled fields
            }
        });

        if (!isValid) {
            // Stop form from opening the email client if validation fails
            event.preventDefault(); 
            alert("Please fill in all fields before sending.");
        } else {
            // Build the 'Mailto' string dynamically for a cleaner email experience
            var userName = $("#user-name").val();
            var messageContent = $("#user-message").val();
            
            var cleanMailto = "mailto:info@abdilla.net" +
                              "?subject=" + encodeURIComponent("Customer Inquiry: " + userName) +
                              "&body=" + encodeURIComponent(messageContent);
            
            // Set the form action to our custom mailto link right before submission
            $(this).attr("action", cleanMailto);
        }
    });
});
