$(document).ready(() => {

    const $attEvents = $("att-events");
    const $noAttEvents = $("no-att-events");

    $noAttEvents.hide();

    SDK.Student.getAttEvents((cb, events) => {
        events = JSON.parse(events);

            if (events.length === 0) {
                $noAttEvents.show();
            }

            events.forEach((event) => {

                const attEventHtml = `
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
                            </tr>
                            </tbody>
                        </table>
                    </div>`;

                $attEvents.append(attEventHtml);
            });
    });
});