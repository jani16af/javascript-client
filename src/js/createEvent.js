$(document).ready(() => {

    SDK.User.loadNav();

    $("#createEvent-button").click(() => {

        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputEventDescription").val();
        const owner_id = SDK.User.current();

        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");


            }else{

                window.alert("Event created!");
                window.location.href = "../src/Html/Events.html";

            }



        });


    });

    $("#return-button").click(() => {

        window.location.href = "Events.html";
    });
});