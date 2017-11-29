$(document).ready(() => {

    $("#createEvent-button").click(() => {

        const eventName = $("#regEventName").val();
        const eventLocation = $("#regEventLocation").val();
        const eventDate = $("#regEventDate").val();
        const eventPrice = $("#regEventPrice").val();
        const eventDescription = $("#regEventDescription").val();

        if (!eventName || !eventLocation || !eventDate || !eventPrice || !eventDescription) {
            alert("Alle felter skal udfyldes");
        }
            SDK.Event.createEvent(regEventName, regEventLocation, regEventDate, regEventPrice, regEventDescription, (err, data) => {
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