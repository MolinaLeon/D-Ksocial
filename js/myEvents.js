//Udviklet med udgangspunkt i Jesper Bruun Hansens repo: https://github.com/Distribuerede-Systemer-2017/javascript-client/
//Branch: Master, exercise & solution

$(document).ready(() => {

    const $myEvents = $("#myEvents");
    const $emptyEvents = $("#emptyEvents");
    const $updateButton = $("#updateButton");
    $emptyEvents.hide();


    //Gets the events where you're the owner
    SDK.Event.myEvents((err, events) => {
        events = JSON.parse(events);

        if (events.length === 0) {
            $emptyEvents.show();
        }

        events.forEach((event) => {

            const myEventsHtml = `
<div class="container">

    <table class="table">
       
       <thread>
           <tr>
              <th>Ejer</th>
              <th>Navn</th>
              <th>Beskrivelse</th> 
              <th>Lokation</th>
              <th>Dato</th> 
              <th>Pris</th> 
           </tr>     
        </thread>

        <tbody>
            <tr>
            <td>${event.owner}</td>
            <td>${event.eventName}</td>
            <td>${event.description}</td>
            <td>${event.location}</td>
            <td>${event.eventDate}</td>
            <td>${event.price}</td>
            <td><button class="btn deleteButton btn-default" data-id-delete="${event.idEvent}">Slet Begivenhed</button></td>
            <td> <a href="updateEvent.html?eventId=${event.idEvent}"<button id="updateButton" class="btn btn-default">Opdater begivenhed</button></a></td>
            </tr>
        </tbody>
    </table>
</div> `;
            $myEvents.append(myEventsHtml);
        });

        $(".deleteButton").click(function () {
            const idEvent = $(this).data("id-delete");
            const event = events.find((event) => event.idEvent === idEvent);

            SDK.Event.deleteEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("Error - 401")
                }
                else if (err) {
                    window.alert("Kunne ikke slettes - prøv igen")
                } else {
                    window.location.href = "myEvents.html";
                }
            });
        });
    });
});

