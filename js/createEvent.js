$(document).ready(() => {

    $("#createEvent-button").click(() => {

        let eventName = $("#regEventName").val();
        let eventLocation = $("#regEventLocation").val();
        let eventDate = $("#regEventDate").val();
        let eventPrice = $("#regEventPrice").val();
        let eventDescription = $("#regEventDescription").val();

        if (!eventName || !eventLocation || !eventDate || !eventPrice || !eventDescription) {
            alert("Alle felter skal udfyldes");
        }
            SDK.Event.createEvent(eventPrice, eventName, eventLocation, eventDescription , eventDate, (err, data) => {
                if (err && err.xhr.status === 400) {
                    $(".form-group").addClass("has-error");
                } else if (err) {
                    console.log(err)
                } else {
                    console.log(err)
                    alert("Du har nu opretter begivenheden: " + eventName);
                    window.location.href = "yourEvents.html"
                }
            });
        });
});