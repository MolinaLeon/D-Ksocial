$(document).ready(() => {

    $("#registerStudent".click(() => {

        const firstName = $("#regFirstName").val();
        const lastName = $("#regLastName").val();
        const email = $("#regMail").val();
        const password = $("#regPassword").val();
        const verifyPassword = $("#regVerifyPassword");

        if (!firstName || !lastName || !email || !password || !verifyPassword) {
            Window.alert("Alle felter skal udfyldes")
        } else {
            if (password.valueOf() === verifyPassword.valueOf()) {
                SDK.Student.register(regfFirstName, regLastName, regMail, regPassword, regVerifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        $(".form-group").addClass("Fejl fra klient - 400");
                    } else {
                        window.alert("Du er nu oprettet som: " + firstName + "\nDin mail er dit brugernavn");
                        window.location.href = "login.html";
                    }
                });
            } else {
                alert("De indtastede koder stemmer ikke overens")
            }
        }
    })
$ ("#back-button").click(() => {
    window.location.href = "index.html"
});
});
