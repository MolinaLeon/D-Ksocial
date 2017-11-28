$(document).ready(() => {

    SDK.Student.loadNav();
    const currentStudent = SDK.Student.currentStudent();
    const $attButton = $("#attButton");
    const $eventList = $("#event-list");

    SDK.Event.getEvents((err, data) => {
        data = JSON.parse(data);

        data.forEach((data) => {

            let eventHtml = `
<div class="container">
    <table class="table">
        <tr>
        <th>Navn</th>
        <th>Ejer</th>
        <th>Lokation</th>
        <th>Pris</th>
        <th>Dato</th>
        <th>Beskrivelse</th>
        <th>Deltag</th>
        <th>Se deltagende</th>
        </tr>
        
        <tbody>
        <tr>
        <td>${data.eventName}</td>
        <td>${data.owner}</td>
        <td>${data.location}</td>
        <td>${data.price}</td>
        <td>${data.eventDate}</td>
        <td>${data.description}</td>
        <td><button id="joinEvent-button" class="btn btn-default" data-data-id="${data.idEvent}">Deltage i begivenhed</button></td>
        <td><button id="attButton" class="btn btn-default" data-data-id="${data.idEvent}" data-toggle="modal" data-target="#attStudents-modal">Se deltagere</button> </td>        
        </tr>
        </tbody>
    </table>                    
</div> `;
        $eventList.append(eventHtml);
    }),

        $(".joinEvent-button").click(function() {
            const idEvent = $(this).data("data-id");
            const event = data.find((data) => data.idEvent === idEvent);
            SDK.Event.joinEvent(idEvent, data.eventName, data.owner, data.location, data.price, data.eventDate, data.description, (err,data) => {
                if (err && xhr.status === 401) {
                    $(".form-group").addClass("Error - 401");
                }
                else if (err) {
                    alert("Kunne ikke deltage i begivenhed");
                } else {
                    window.location.href = "yourEvents.html";
                }
        });
    });
        $(".seeAtt-button").click(function () {
            var idEvent = $(this).data("data-id");
            SDK.Event.getAttStudents(idEvent, (cb, students) => {
                if (students) {
                    students = JSON.parse(students);
                    students.forEach((student) => {
                        const attStudentsHtml = `
                        <td>${student.firstName} ${student.lastName}</td>
                        `;
                        $attButton.append(attStudentsHtml)
                    });
                } else {
                $("#attButton").html("Fejl, prøv igen");
            }

            });
        });

        });
$("#closeModal").click(function () {
    $("#attButton").html("");
});
});




