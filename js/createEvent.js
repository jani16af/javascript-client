$(document).ready(() => {

    SDK.User.loadNav();

    $("#createEvent-button").click(() => {

        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();
        const owner_id = SDK.User.current();

        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err) => {

        if (err && err.xhr.status === 500) {
            $(".form-group").addClass("has-error");
            window.alert("Some of the information you have put in is in the wrong format or missing")

        }else{

            window.alert("Event created!");
            window.location.href = "Events.html";

        }

        });

        });

        $("#return-button").click(() => {

            window.location.href = "Events.html";
        });
        });