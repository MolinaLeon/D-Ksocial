$(document).ready(() => {

    const $attEvents = $("#att-events");

    SDK.Event.getAttEvents((cb, events) => {
        events = JSON.parse(events);

            events.forEach((event) => {
                console.log(event);

                const attEventHtml = `
                    <div class="container">
                        <table class="table">
                            <tr>
                            <th>Navn</th>
                            <th>Lokation</th>
                            <th>Pris</th>
                            <th>Dato</th>
                            <th>Beskrivelse</th>
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