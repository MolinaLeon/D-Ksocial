
$(document).ready(() => {

    SDK.Student.loadNav();
    const currentStudent = SDK.Student.currentStudent();
    const $eventList = $("#event-list");

    //data istedet for events?
    SDK.Event.getEvents((err, events) => {
        events.forEach((event => {

            const eventHtml = `
            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${event.eventName}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>owner</dt>
                        <dd>${event.owner}</dd>
                        <dt>description</dt>
                        <dd>${event.description}</dd>
                        <dt>location</dt>
                        <dd>${event.location}</dd>
                        <dt>date</dt>
                        <dd>${event.eventDate}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${event.price}</span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success join-button" data-idEvent="${event.idEvent}">Deltag</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

            $eventList.append(eventHtml);
    }),

        $(".join-button").click(function() {
            const idEvent = $(this).data("idEvent");
            const event = events.find((event) => event.id === idEvent);
            SDK.Event.joinEvent(event);
        });
    });

});




