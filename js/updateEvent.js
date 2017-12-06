$(document).ready(() => {

    $("#updateButton").click(() => {
        const idEvent = SDK.Url.getParameterByName("eventId");
       const eventName = $("#updateEventName").val();
       const location = $("#updateEventLocation").val();
       const eventDate = $("#updateEventName").val();
       const price = $("#updateEventName").val();
       const description = $("#updateEventDescription");

       SDK.Event.updateEvent(idEvent, eventName, location, eventDate, price, description, (err, cb) => {
           if(err && err.xhr.status === 401) {
               $(".form-group").addClass("Error - 401");
           }
           else if (err) {
               alert("Fejl, prøv igen");
               console.log(err.message);
           } else {
               alert("Din begivenhed blev opdateret");
               window.location.href = "myEvents.html";
           }
       })
    });
});