$(document).ready(() => {

    SDK.User.loadNav();

    $("#SignUp").click(() => {



        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const password = $("#inputPassword").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const description = $("#inputDescription").val();

        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }else{

                window.alert("Your user is now created. You will now be able to login!");
                window.location.href = "../Html/index.html";

            }

        });

    });

    $("#alreadyUser").click(() => {

        window.location.href = "../Html/Index.html";
    });
});