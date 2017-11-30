$(document).ready(() => {

SDK.User.loadNav();

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
            window.alert("Wrong username or password")
        } else {
            SDK.Event.fineMineEvents((err) => {
                if (err) console.log('error', err);


                window.location.href = "../Html/HomePage.html";

            });
        }

});

$("#Register-button").click(() => {

    window.location.href = "../Html/SignUp.html";
});
});
});