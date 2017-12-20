$(document).ready(() => {

    //Her hentes metoden i sdk'en under User, loadNav, som viser navbaren, som ligger i nav.html.

    SDK.User.loadNav();

    /*Ved klik på createEvent knappen fyres nedstående funktion.
    Denne funktion tager de værdier brugeren har indtastet og opretter dem
    som konstanter. Disse konstanter kan herefter indsættes i SDK metoden
    createEvent.
     */

    $("#createEvent-button").click(() => {

        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();
        const owner_id = SDK.User.current();

        //Her køres metoden createEvent. Denne metode opretter et nyt event, hvis der ikke opstår en fejl.

        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err) => {

        if (err && err.xhr.status === 500) {
            $(".form-group").addClass("has-error");
            window.alert("Some of the information you have put in is in the wrong format or missing")

        }else if (err && err.xhr.status === 400) {
            $(".form-group").addClass("has-error");
            window.alert("The time you have entered is before the time to date.")

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