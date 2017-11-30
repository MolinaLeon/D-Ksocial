$(document).ready(() => {

    const $myEvents = $("#myEvents");
    const $emptyEvents = $("#emptyEvents");
    const $deleteButton = $("#deleteButton");
    const $updateButton = $("#updateButton");
    $emptyEvents.hide();

    SDK.Event.myEvents((err, data) => {
        data = JSON.parse(data);

        if (data.length === 0) {
            $emptyEvents.show();
        }

        data.forEach((event) => {

            let myEventsHtml = `
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
            <td><button id="deleteButton" class="btn btn-default" data-id-delete="${event.idEvent}">Slet Begivenhed</button></td>
            <td> <a href="updateEvent.html?eventId=${event.idEvent}"<button id="updateButton" class="btn btn-default">Opdater begivenhed</button></a></td>
            </tr>
        </tbody>
    </table>
</div> `;
            $myEvents.append(myEventsHtml);
        });

        $(".deleteButton").click(function () {
            let idEvent = $(this).data("id-delete");
            let event = event.find((event) => event.idEvent === idEvent);

            SDK.Event.deleteEvent(idEvent, event.price, event.eventDate, event.location, event.description, event.eventDate, (err, data) => {
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

