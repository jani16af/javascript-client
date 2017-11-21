$(document).ready(() => {

    SDK.User.loadNav();

    $("#SignUp").click(() => {

        console.log("what")

        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const password = $("#inputPassword").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const description = $("#inputDescription").val();

        SDK.User.createUser(password, firstName, lastName, email, gender, major, semester, description, (err, data) => {
            console.log(err, data);
        });

        window.alert("Bruger oprettet!");
        window.location.href = "../Html/index.html";

    });

    $("#alreadyUser").click(() => {

        window.location.href = "../Html/Index.html";
    });
});