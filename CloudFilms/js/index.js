function LoadSignup() {
    //! When page loads it defaults to Sign Up Form
    $("body").css("background-image", "url('assets/Images/Background/Sign_up.png')");
    $(".sign-up-form").show();
    $(".Log-in-form").hide();
}

// jquery document.ready
$(document).ready(function () {

    var checkLogIn = sessionStorage.getItem("userEmailLoggedIn");
    var currentPath = window.location.pathname;
    //+ check wether a user is logged in
    if (checkLogIn == null) {
        //+ check wether current url path is not index.html
        if (currentPath !== "/CloudFilms/index.html") {
            //+ send user to index.html if not logged in
            window.location.href = "../index.html";
        }
    }

    $(".social").hover(function () {
        $(this).css("filter", "invert(74%) sepia(30%) saturate(3440%) hue-rotate(173deg) brightness(90%) contrast(84%)");
    }, function () {
        $(this).css("filter", "invert(97%) sepia(4%) saturate(1028%) hue-rotate(308deg) brightness(111%) contrast(100%)");
    });

    var loggedInUser = sessionStorage.getItem("userEmailLoggedIn");
    $("#welcomeMessage").append("Welcome " + loggedInUser);

    $("#logOutbtn").click(function () {
        sessionStorage.clear()
        window.location.href = "../index.html";
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
        $("body").css("background-image", "url('assets/Images/Background/Sign_up.png')");
        //+ Clear Form
        $(':input', '#formSignUp')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
        //+ Clear Form js plugin Messages
        var validator = $("#formSignUp").validate();
        validator.resetForm();
    });

    $("#ShowLoginbtn").click(function () {
        $(".sign-up-form").hide();
        $(".Log-in-form").show();
        $("body").css("background-image", "url('assets/Images/Background/Log_in.png')");
        //+ Clear Form
        $(':input', '#formLogIn')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
        //+ Clear Form js plugin Messages
        var validator = $("#formLogIn").validate();
        validator.resetForm();
    });

    $("#submitSignUp").click(function () {

        $("#formSignUp").validate({
            // in 'rules' user have to specify all the constraints for respective fields
            rules: {
                // firstname: "required",
                // lastname: "required",
                // username: {
                //     required: true,
                //     minlength: 2 //for length of lastname
                // },
                InputEmail: {
                    required: true,
                    email: true
                },
                InputPassword: {
                    required: true,
                    minlength: 5
                },
                InputConfirmPassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#InputPassword" //for checking both passwords are same or not
                },
                tcCheck: "required"
            },
            // in 'messages' user have to specify message as per rules
            messages: {
                // firstname: " Please enter your firstname",
                // lastname: " Please enter your lastname",
                // username: {
                //     required: " Please enter a username",
                //     minlength: " Your username must consist of at least 2 characters"
                // },
                InputPassword: {
                    required: " Please enter a password",
                    minlength: " Your password must be consist of at least 5 characters"
                },
                InputConfirmPassword: {
                    required: " Please enter a password",
                    minlength: " Your password must be consist of at least 5 characters",
                    equalTo: " Please enter the same password as above"
                },
                tcCheck: "Please accept our policy"
            }
        });

        var isValid = $("#formSignUp").valid(); // returns true if valid
        // alert(isValid);

        //! if form is valid store new user in local storage
        if (isValid) {
            var email = $('input[name=InputEmail]').val();
            var password = $('input[name=InputPassword]').val();
            localStorage.setItem("userEmailNew", email);
            localStorage.setItem("userPasswordNew", password);
        }

    });

    $("#submitLogIn").click(function () {

        $("#formLogIn").validate({
            // in 'rules' user have to specify all the constraints for respective fields
            rules: {
                InputEmailLogin: {
                    required: true,
                    email: true
                },
                InputPasswordLogin: {
                    required: true,
                    minlength: 5
                }
            },
            // in 'messages' user have to specify message as per rules
            messages: {
                InputPasswordLogin: {
                    required: " Please enter a password",
                    minlength: " Your password must be consist of at least 5 characters"
                }
            }
        });

        var isValid = $("#formLogIn").valid(); // returns true if valid

        //! if form is valid store new user in local storage
        if (isValid) {
            var email = $('input[name=InputEmailLogin]').val();
            var password = $('input[name=InputPasswordLogin]').val();
            var fetchedEmail = localStorage.getItem("userEmailNew");
            var fetchedPassword = localStorage.getItem("userPasswordNew");

            if (email == fetchedEmail) {
                if (password == fetchedPassword) {
                    sessionStorage.setItem("userEmailLoggedIn", email);
                    sessionStorage.setItem("userPasswordLoggedIn", password);
                    window.location.href = "pages/Homepage.html";
                } else {
                    alert("Incorrect Email or Password")
                }
            } else {
                alert("Incorrect Email or Password")
            }

        }

    });



});
