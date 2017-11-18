$(document).ready(() => {

    SDK.User.loadNav();

    $("#createuser-button").click(() => {

        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const password = $("#inputPassword").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const description = $("#inputDescription").val();

        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err, data) => {
            console.log(err, data);
        });

        window.alert("Bruger oprettet!");
        window.location.href = "login.html";

    });

    $("#alreadyUser-button").click(() => {

        window.location.href = "login.html";
    });
});