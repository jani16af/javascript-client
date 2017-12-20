$(document).ready(() => {

    //Her hentes metoden i sdk'en under User, loadNav, som viser navbaren, som ligger i nav.html.

    SDK.User.loadNav();

    //Der oprettes en konstant, så listen med events kan indsættes på den korrekte plads i html filen.

    const $eventList = $("#event-list");

    //Metoden findAllEvents køres og alle events hentes fra databasen ved hjælp af et loop.

    SDK.Event.findAllEvents((err, events) => {

        events.forEach((event) => {

            //Nedenstående er den html som indsættes i Events.html.

            const eventHtml = `
        <div class="col-lg-6 book-container">
            <div class="panel panel-default">
            
                <div class="panel-heading">
                    <h3 class="panel-title">${event.title}</h3>
                </div>
                
                <div class="panel-body">
                    <div class="col-md-1-8">
                      <dl>
                      <dt>Created</dt>
                      <dd>${event.created}</dd>
                        <dt>Start date</dt>
                        <dd>${event.startDate}</dd>
                        <dt>End date</dt>
                        <dd>${event.endDate}</dd>
                        <dt>Description</dt>
                        <dd>${event.description}</dd>
                      </dl>
                    </div>
                </div>
                
                <div class="panel-footer">
                    <div class="row">
                            <button class="btn btn-default more-details" data-event-id="${event.id}">More Details</button>
                            <button class="btn btn-default attendEvent" data-event-id="${event.id}">Attend this event</button>
                    </div>
                   
                </div>
            </div>
            
        </div>`;

            $eventList.append(eventHtml);
        });

        /*Ved klik på knappen attendEvent, undersøges det først om brugeren er den
        nuværende bruger som er logget ind. Er dette tilfældet sættes userId og event-id
        til konstanter og metoden subscribeEvent sætter brugeren på deltagerlisten.
         */

        $(".attendEvent").click(function () {
            if (SDK.User.current()) {

                const user_id = SDK.Storage.load("userId");
                const event_id = $(this).data("event-id");

                SDK.Event.subscribeEvent(user_id, event_id, (err) => {

                    if (err && err.xhr.status === 500) {
                        $(".form-group").addClass("has-error");
                        window.alert("You are already attending this event")

                    } else {

                        window.alert("You are now attending this event!");
                        window.location.href = "Events.html";

                    }
                });

                //Er det ikke den nuværende bruger som prøver at kører medtoden, får han følgende fejl.

            } else {
                window.alert("Please login to attend event")
            }

        });

        /*Denne funktion aktiveres når der klikkes på more details knappen.
        Her bliver oprettet konstanter, som bruges til at få fat i informationerne omkring
        det event brugeren har valgt
         */


        $(".more-details").click(function () {

            const eventId = $(this).data("event-id");
            const ownerId = $(this).data(events.owner);
            const event = events.find((event) => event.id === eventId);

            //Her gemmes eventId til det pågælende event i localstorage

            SDK.Storage.persist("chosenEventId", eventId);

            //Brugeren føres til siden for det valgte event.

            window.location.href = "chosenEvent.html";

        });
    });


    //Klikkes der på create Event knappen, føres brugeren til siden createEvent.html, hvor han kan oprette et event.

    $("#createEvent-button").click(() => {
        window.location.href = "createEvent.html";
    });


});