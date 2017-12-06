$(document).ready(() => {

    $("#updateButton").click(() => {

       const eventName = $("#updateEventName").val();
       const location = $("#updateEventLocation").val();
       const eventDate = $("#updateEventName").val();
       const price = $("#updateEventName").val();
       const description = $("#updateEventDescription");
       const idEvent = SDK.Event.Url.getParameterByName("eventId");

       SDK.Event.updateEvent(idEvent, eventName, location, eventDate, price, description, (err, cb) => {
           console.log(eventName);
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