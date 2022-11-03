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
    // //+ check wether a user is logged in
    // if (checkLogIn == null) {
    //     //+ check wether current url path is not index.html
    //     if (currentPath !== "/CloudFilms/index.html") {
    //         //+ send user to index.html if not logged in
    //         window.location.href = "../index.html";
    //     }
    // }

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

    // On Poster Click return movie id
    $('.poster').click(function () {
        var id = $(this).attr('id');
        // console.log(id);
        sessionStorage.setItem("movieID", id);
        window.location.href = "IndividualMoviePage.html";
    });

    var SingleMovie = null
    var movieID = sessionStorage.getItem("movieID");

    // Using the ajax function
    $.ajax({
        type: "GET", // I want to GET data from the API
        url: "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=256a35c109969ca8fc077726003b1ca4", // API URL & API KEY
        success: function (data) { // Run if API call worked (success)
            SingleMovie = data; // Set data fetched equal to var
        },
        error: function () {
            // alert("Movie not Found, please refresh the page!");
        }
    }).done(function () { // Wait for API data to come in before updating HTML

        //access data like an object

        // console.log(SingleMovie);

        // tmdb base url for posters, w500 indicates size
        var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
        var moviePosterPath = SingleMovie.poster_path;
        $("#MovieCover").attr("src", posterBaseUrl + moviePosterPath);

        $("#movieTitle").text(SingleMovie.original_title);

        var genres = ""
        // loop amount of genres to create string
        for (let x = 0; x < SingleMovie.genres.length; x++) {
            genres = genres + "<button type='button' class='text-light bg-dark genrebtn'>" + SingleMovie.genres[x].name + "</button>";
        }
        $("#movieGenre").append(genres);


        $("#movieRating").append("<div class='rating left'>" + SingleMovie.vote_average.toFixed(1) + "</div>" + "<div class='rating10'>/10</div>");
        $("#movieDescription").text(SingleMovie.overview);
        $("#movieRuntime").text(SingleMovie.runtime + "min");
        $("#movieReleaseDate").text(SingleMovie.release_date);

    });

    //library page



    // home page header slider

    var popularMovies = null;

    // Using the ajax function
    $.ajax({
        type: "GET", // I want to GET data from the API
        url: "https://api.themoviedb.org/3/movie/popular?api_key=256a35c109969ca8fc077726003b1ca4&language=en-US&page=1", // API URL & API KEY
        success: function (data) { // Run if API call worked (success)
            popularMovies = data; // Set data fetched equal to var
        },
        error: function () {
            alert("Something went wrong");
        }
    }).done(function () { // Wait for API data to come in before updating HTML

        var currentMovie = null;
        // console.log(popularMovies);

        for (let x = 0; x < 3; x++) {

            currentMovie = popularMovies.results[x];

            var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
            var moviePosterPath = currentMovie.poster_path;
            $("#movieCover" + [x]).attr("src", posterBaseUrl + moviePosterPath);

            // $("#movieCover" + [x]).attr("class", "poster");
            $("#movieCover" + [x]).attr("id", currentMovie.id);
            $("#playButton" + [x]).attr("id", currentMovie.id);
            $("#watchLaterbtn" + [x]).attr("id", currentMovie.id);

            $("#movieName" + [x]).text(currentMovie.original_title);
            $("#movieInfo" + [x]).text(currentMovie.overview);


        }

        // On Poster Click return movie id
        $('.poster').click(function () {
            var id = $(this).attr('id');
            // console.log(id);
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });

        // On Play Button Click
        $('.playbtn').click(function () {
            var id = $(this).attr('id');
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });


    });

    var trendingMovies = null;

    // Using the ajax function
    $.ajax({
        type: "GET", // I want to GET data from the API
        url: "https://api.themoviedb.org/3/movie/popular?api_key=256a35c109969ca8fc077726003b1ca4&language=en-US&page=1", // API URL & API KEY
        success: function (data) { // Run if API call worked (success)
            trendingMovies = data; // Set data fetched equal to var
        },
        error: function () {
            alert("Something went wrong");
        }
    }).done(function () { // Wait for API data to come in before updating HTML

        var currentMovie = null;
        // console.log(trendingMovies);

        for (let x = 0; x < 10; x++) {

            currentMovie = trendingMovies.results[x];

            var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
            var moviePosterPath = currentMovie.poster_path;
            $("#poster" + [x]).attr("src", posterBaseUrl + moviePosterPath);

            // $("#movieCover" + [x]).attr("class", "poster");
            // $("#poster" + [x]).attr("id", currentMovie.id);
            // $("#Overlay" + [x]).attr("id", currentMovie.id);
            $("#btnPlay" + [x]).attr("id", currentMovie.id);
            $("#popWatchLaterbtn" + [x]).attr("id", currentMovie.id);

            // $("#movieName" + [x]).text(currentMovie.original_title);
            // $("#movieInfo" + [x]).text(currentMovie.overview);


        }

        // On Poster Click return movie id
        $('.poster').click(function () {
            var id = $(this).attr('id');
            // console.log(id);
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });

        // On Play Button Click
        $('.playbtn').click(function () {
            var id = $(this).attr('id');
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });


    });

    var latestMovies = null;

    // Using the ajax function
    $.ajax({
        type: "GET", // I want to GET data from the API
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=256a35c109969ca8fc077726003b1ca4&language=en-US&page=1", // API URL & API KEY
        success: function (data) { // Run if API call worked (success)
            latestMovies = data; // Set data fetched equal to var
        },
        error: function () {
            alert("Something went wrong");
        }
    }).done(function () { // Wait for API data to come in before updating HTML

        var currentMovie = null;
        console.log("here");
        console.log(latestMovies);

        for (let x = 0; x < 10; x++) {

            currentMovie = latestMovies.results[x];

            var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
            var moviePosterPath = currentMovie.poster_path;
            $("#lposter" + [x]).attr("src", posterBaseUrl + moviePosterPath);

            // $("#movieCover" + [x]).attr("class", "poster");
            // $("#poster" + [x]).attr("id", currentMovie.id);
            // $("#lOverlay" + [x]).attr("id", currentMovie.id);

            $("#upcbtnPlay" + [x]).attr("id", currentMovie.id);
            $("#upcWatchLaterbtn" + [x]).attr("id", currentMovie.id);

            // $("#movieName" + [x]).text(currentMovie.original_title);
            // $("#movieInfo" + [x]).text(currentMovie.overview);


        }

        // On Poster Click return movie id
        $('.poster').click(function () {
            var id = $(this).attr('id');
            // console.log(id);
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });

        // On Play Button Click
        $('.playbtn').click(function () {
            var id = $(this).attr('id');
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });


    });

    var topMovies = null;

    // Using the ajax function
    $.ajax({
        type: "GET", // I want to GET data from the API
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=256a35c109969ca8fc077726003b1ca4&language=en-US&page=1", // API URL & API KEY
        success: function (data) { // Run if API call worked (success)
            topMovies = data; // Set data fetched equal to var
        },
        error: function () {
            alert("Something went wrong");
        }
    }).done(function () { // Wait for API data to come in before updating HTML

        var currentMovie = null;
        // console.log(trendingMovies);

        for (let x = 0; x < 20; x++) {

            currentMovie = topMovies.results[x];

            var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
            var moviePosterPath = currentMovie.poster_path;
            $("#topposter" + [x]).attr("src", posterBaseUrl + moviePosterPath);

            $("#topbtnPlay" + [x]).attr("id", currentMovie.id);
            $("#topWatchLaterbtn" + [x]).attr("id", currentMovie.id);
        }

        // On Poster Click return movie id
        $('.poster').click(function () {
            var id = $(this).attr('id');
            // console.log(id);
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });

        // On Play Button Click
        $('.playbtn').click(function () {
            var id = $(this).attr('id');
            sessionStorage.setItem("movieID", id);
            window.location.href = "IndividualMoviePage.html";
        });


    });

});

// sessionStorage.clear();

var watchLaterList = []

// On Play Button Click
$('.watchlaterbtn').click(function () {
    var id = $(this).attr('id');
    getWatchLater = sessionStorage.getItem("listWatchLater")
    if (getWatchLater == null) {
        // watchLaterList = JSON.parse(getWatchLater);
        watchLaterList.push(id);
        var watchList = JSON.stringify(watchLaterList);
        sessionStorage.setItem("listWatchLater", watchList);
    } else {
        watchLaterList = JSON.parse(getWatchLater);
        if (watchLaterList.indexOf(id) == -1) {
            alert("Added item to watchlist");
            watchLaterList.push(id);
            var watchList = JSON.stringify(watchLaterList);
            sessionStorage.setItem("listWatchLater", watchList);
        } else {
            alert("Watch list already contains this item");
        };
    }
});

function loadWatchLater() {
    currentWatchLater = sessionStorage.getItem("listWatchLater")
    currentWatchLaterList = JSON.parse(currentWatchLater);

    for (let i = 0; i < currentWatchLaterList.length; i++) {

        // alert(currentWatchLaterList[i]);

        var currentWatchLaterItem = null;

        // Using the ajax function
        $.ajax({
            type: "GET", // I want to GET data from the API
            url: "https://api.themoviedb.org/3/movie/" + currentWatchLaterList[i] + "?api_key=256a35c109969ca8fc077726003b1ca4", // API URL & API KEY
            success: function (data) { // Run if API call worked (success)
                currentWatchLaterItem = data; // Set data fetched equal to var
            },
            error: function () {
                // alert("Movie not Found, please refresh the page!");
            }
        }).done(function () { // Wait for API data to come in before updating HTML

            //access data like an object
            
            // alert(currentWatchLaterItem.original_title);
            var id = currentWatchLaterList[i];
            var title = currentWatchLaterItem.original_title;
            var overview = currentWatchLaterItem.overview;
            var releaseDate = currentWatchLaterItem.release_date;
            var runTime = currentWatchLaterItem.runtime + "min";
            // tmdb base url for posters, w500 indicates size
            var posterBaseUrl = "https://image.tmdb.org/t/p/w500";
            var moviePosterPath = currentWatchLaterItem.poster_path;
            var posterFullPath = posterBaseUrl + moviePosterPath;
            
            $("#divWatchListContainer").append('<div class="box1wl" id="' + id + '"><div class="poster" id="' + id + '"><img id="movieposter-wl" src="' + posterFullPath + '" alt="avatar" width="300" height="400"></div><div class="title"><h6>Title :</h6><h3 id="Title">' + title + '</h3></div><div class="overview"><h6>Overview :</h6><h6 id="Overview">' + overview + '</h6></div><div class="releasedate"><h6>Release date :</h6><h6 id="Release_date">' + releaseDate + '</h6></div><div class="runtime"><h6>Runtime:</h6><h6 id="Runtime">' + runTime + '</h6><button class="playwl-btn poster" id="' + id + '">PLAY</button><button class="remove-btn" id="' + id + '">REMOVE</button><hr class="hline"></div></div>');

            // On Remove button Click hide div with id
            $('.remove-btn').click(function () {
                var removeid = $(this).attr('id');
                $('#' + removeid).hide();
            });

        });


    }
    
}

// On Remove button Click hide div with id
$('.remove-btn').click(function () {
    var removeid = $(this).attr('id');
    $('#' + removeid).hide();
});

// On Remove all button Click hide all
$('.remove-all').click(function () {
    $('.hline').hide();
    $('.box1wl').hide();
    sessionStorage.removeItem('listWatchLater');
});

