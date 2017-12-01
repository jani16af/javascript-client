$(document).ready(() => {

SDK.User.loadNav();



$("#login-button").click(() => {

    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();

    SDK.User.login(password, email, (err, data) => {
        if (err && err.xhr.status === 500) {

            $(".form-group").addClass("has-error");
            window.alert("Wrong username or password")
        }
        else if (err) {
            console.log(err, data);
            console.log("BAd stuff happened")
            window.alert("Wrong username or password")


        } else {

                window.location.href = "../Html/HomePage.html";
        }

});


});


});

$("#Register-button").click(() => {

    window.location.href = "../Html/SignUp.html";
});