$(document).ready(() => {

    SDK.User.loadNav();

    $("#SignUp").click(() => {


        const password = $("#inputPassword").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const description = $("#inputDescription").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();


        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err) => {
            if (err && err.xhr.status === 500) {
                $(".form-group").addClass("has-error");
                window.alert("Some of the information you have put in is in the wrong format or missing")

            }else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                window.alert("Some of the information you have put in is in the wrong format or missing")



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