$(document).ready(() => {


$("#login-button").click(() => {

    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();

    SDK.User.login(password, email, (err, data) => {
        if (err && err.xhr.status === 401) {

            $(".form-group").addClass("has-error");
        }
        else if (err) {
            console.log(err, data);
            console.log("BAd stuff happened")
        } else {
            window.location.href = "../Html/HomePage.html";
        }
    });

});

$("#Register-button").click(() => {

    window.location.href = "../Html/SignUp.html";
});
});