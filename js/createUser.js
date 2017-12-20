$(document).ready(() => {

    //Her hentes metoden i sdk'en under User, loadNav, som viser navbaren, som ligger i nav.html.

    SDK.User.loadNav();

    /*Ved klik på SignUp knappen fyres nedstående funktion.
    Denne funktion tager de værdier brugeren har indtastet og opretter dem
    som konstanter. Disse konstanter kan herefter indsættes i SDK metoden
    createUser.
     */

    $("#SignUp").click(() => {


        const password = $("#inputPassword").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const description = $("#inputDescription").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();

        /*Her køres metoden createEvent. Denne metode opretter et ny bruger, hvis der ikke opstår en fejl.
        Brugeren vil blive oprettet så længe ingen af nedstående fejl er til stede, og brugeren ikke eksistere
        i forvejen.
        */

        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err) => {
            if (err && err.xhr.status === 500) {
                $(".form-group").addClass("has-error");
                window.alert("Some of the information you have put in is in the wrong format or missing")

            } else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                window.alert("Some of the information you have put in is in the wrong format or missing")

            } else if (err && err.xhr.status === 400) {

                $(".form-group").addClass("has-error");
                window.alert("Email needs to be a CBS mail or a user with this CBS mail is already registered")


            } else {

                window.alert("Your user is now created. You will now be able to login!");
                window.location.href = "../Html/index.html";

            }

        });

    });

    //ved klik på already a User knappen, vendes der tilbage til login siden Index.html

    $("#alreadyUser").click(() => {

        window.location.href = "../Html/Index.html";
    });
});