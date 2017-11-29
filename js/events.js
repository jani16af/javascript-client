

$(document).ready(() => {


    SDK.User.loadNav();
    const $eventList = $("#event-list");


    SDK.Event.findAllEvents((err, events) => {

        events.forEach((event) => {
            const eventHtml = `
        <div class="col-lg-6 book-container">
            <div class="panel panel-default">
            
                <div class="panel-heading">
                    <h3 class="panel-title">${event.title}</h3>
                </div>
                
                <div class="panel-body">
                    <div class="col-md-1-8">
                      <dl>
                      <dt>Oprettet</dt>
                      <dd>${event.created}</dd>
                        <dt>Startdato</dt>
                        <dd>${event.startDate}</dd>
                        <dt>Slutdato</dt>
                        <dd>${event.endDate}</dd>
                        <dt>Beskrivelse</dt>
                        <dd>${event.description}</dd>
                      </dl>
                    </div>
                </div>
                
                <div class="panel-footer">
                    <div class="row">
                            <button class="btn btn-default more-details" data-event-id="${event.id}">More Details</button>
                            <button class="btn btn-default attend" data-event-id="${event.id}">Attend this event</button>
                    </div>
                   
                </div>
            </div>
            
        </div>`;

            $eventList.append(eventHtml);
        });


        $(".more-details").click(function () {

            const eventId = $(this).data("event-id");
            const ownerId = $(this).data(events.owner);
            const event = events.find((event) => event.id === eventId);

            SDK.Storage.persist("chosenEventId", eventId);


            window.location.href = "chosenEvent.html";

        });
    });

    $("#showEvent-button").click(() => {


    });

    $("#createEvent-button").click(() => {
        window.location.href = "createEvent.html";
    });


});