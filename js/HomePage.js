$(document).ready(() => {

    SDK.User.loadNav();
    /*const currentUser = SDK.User.current();
    const user_id = SDK.Storage.load("userId");
    const event_id = SDK.Storage.load("chosenEventId")*/
    const $myEventList = $("#my-events-list");
    const $emptyList = $("#Nothing-in-my-events-list");

    /*$emptyList.hide();

    /*SDK.Event.findMyEvents((events, err) => {


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
                
                
            </div>
            
        </div>`;

            $myEventList.append(eventHtml);
        });


    });*/
});