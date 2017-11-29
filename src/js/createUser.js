$(document).ready(() => {

    SDK.User.loadNav();

    $("#SignUp").click(() => {



        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const password = $("#inputPassword").val();
        const description = $("#inputDescription").val();

        SDK.User.createUser(firstName, lastName, email, description, gender, major, password, semester, (err, data) => {
            console.log(err, data);


            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }else{

                window.alert("Your user is now created. You will now be able to login!");
                window.location.href = "../src/Html/index.html";

            }

        });

    });

    $("#alreadyUser").click(() => {

        window.location.href = "../src/Html/Index.html";
    });
});