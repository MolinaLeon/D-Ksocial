$(document).ready(() => {

    $("#updateButton").click(() => {

        //Needs bindestreg to avoid "Duplicated jQuery selector" - duplicated selectors could be cached
       const eventName = $("#update-event-name").val();
       const location = $("#update-event-location").val();
       const eventDate = $("#update-event-date").val();
       const price = $("#update-event-price").val();
       const description = $("#update-event-description").val();
       const idEvent = SDK.Url.getParameterByName("eventId");

       SDK.Event.updateEvent(idEvent, eventName, location, eventDate, price, description, (err, cb) => {
           console.log(eventName);
           if(err && err.xhr.status === 401) {
               $(".form-group").addClass("Error - 401");
           }
           else if (err) {
               alert("Fejl, prøv igen");
           } else {
               alert("Din begivenhed blev opdateret");
               window.location.href = "myEvents.html";
           }
       })
    });
});