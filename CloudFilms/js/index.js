function LoadSignup() {
    //! When page loads it defaults to Sign Up Form
    $("body").css("background-image", "url('../assets/Images/Background/Sign_up.png')");
    $(".sign-up-form").show();
    $(".Log-in-form").hide();
}    

// jquery document.ready
$(document).ready(function () {

    $(".social").hover(function () {
        $(this).css("filter", "invert(74%) sepia(30%) saturate(3440%) hue-rotate(173deg) brightness(90%) contrast(84%)");
    }, function () {
        $(this).css("filter", "invert(97%) sepia(4%) saturate(1028%) hue-rotate(308deg) brightness(111%) contrast(100%)");
    });

    $("#ShowPasswordCheck").click(function () {
        var x = document.getElementById("InputPasswordLogin");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });

    $("#ShowSignUpbtn").click(function () {
        $(".sign-up-form").show();
        $(".Log-in-form").hide();
        $("body").css("background-image", "url('../assets/Images/Background/Sign_up.png')");
    });

    $("#ShowLoginbtn").click(function () {
        $(".sign-up-form").hide();
        $(".Log-in-form").show();
        $("body").css("background-image", "url('../assets/Images/Background/Log_in.png')");
    });

});
