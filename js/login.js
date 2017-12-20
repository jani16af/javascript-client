$(document).ready(() => {

    //Her hentes metoden i sdk'en under User, loadNav, som viser navbaren, som ligger i nav.html.

    SDK.User.loadNav();

    /* klikkes der på login knappen sættes de indtastede værdier til konstanter
    og metoden login i SDK fyres.
    */

    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();


        //Konstanterne indsættes i metoden, og bliver brugeren valideret sendes han videre til Homepage.html

        SDK.User.login(password, email, (err, data) => {
            if (err && err.xhr.status === 500) {

                $(".form-group").addClass("has-error");
                window.alert("Wrong username or password")
            }
            else if (err) {
                console.log(err, data);
                console.log("BAd stuff happened");
                window.alert("Wrong username or password")

            }


            else {

                window.location.href = "../Html/HomePage.html";
            }

        });


    });


});

//ved klik på already a Register knappen, bliver siden SignUp vist, og det er muligt at oprette en bruger.

$("#Register-button").click(() => {

    window.location.href = "../Html/SignUp.html";
});