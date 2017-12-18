$(document).ready(() => {

    const currentStudent = SDK.Student.currentStudent();
    const $eventList = $("#event-list");

    SDK.Event.getEvents((cb, Event) => {
        Event = JSON.parse(Event);

        Event.forEach((event) => {

            let eventHtml = `
<div class="container">
    <table class="table">
        <tr>
        <th>Navn</th>
        <th>Lokation</th>
        <th>Pris</th>
        <th>Dato</th>
        <th>Beskrivelse</th>
        <th>Deltag</th>
        <th>Se deltagere</th>
        </tr>
        
        <tbody>
        <tr>
        <td>${event.eventName}</td>
        <td>${event.location}</td>
        <td>${event.price}</td>
        <td>${event.eventDate}</td>
        <td>${event.description}</td>
        <td><button class="btn joinEventButton btn-default" data-event-id="${event.idEvent}">Deltag i begivenhed</button></td>
        <td><button class="btn attButton btn-default" data-event-id="${event.idEvent}" data-toggle="modal" data-target="#attStudents-modal">Se deltagere</button> </td>        
        </tr>
        </tbody>
    </table>                    
</div> `;
        $eventList.append(eventHtml);
    });

        $(".joinEventButton").click(function() {
            const idEvent = $(this).data("event-id");
            const event = Event.find((event) => event.idEvent === idEvent);
            console.log(idEvent);
            SDK.Event.joinEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && xhr.status === 401) {
                    $(".form-group").addClass("Error - 401");
                }
                else if (err) {
                    console.log(err.message);
                    alert("Kunne ikke deltage i begivenhed");
                } else {
                    window.location.href = "myAttEvents.html";
                }
        });
    });
        $(".attButton").click(function () {
            const idEvent = $(this).data("event-id");
            SDK.Event.getAttStudents(idEvent, (cb, students) => {
                if (students) {
                    students = JSON.parse(students);
                    students.forEach((student) => {

                        console.log(student.firstName);

                        const attStudentsHtml = `
                        <table class="table">
                            <thead>
                            <th>Fornavn</th>
                            <th>Efternavn</th>
                        </thead>
                            
                        <tbody>
                            <tr>       
                            <td>${student.firstName}</td>
                            <td>${student.lastName}</td>
                            </tr>
                        </tbody>
                        </table>
                         `;
                        $("#attListContent").append(attStudentsHtml)
                    });
                } else {
                $("#attButton").html("Fejl, prøv igen");
            }

            });
        });

        });
$("#closeModal").click(function () {
    $("#attListContent").children("table").remove();
    $("#attButton").html("");
});
});




