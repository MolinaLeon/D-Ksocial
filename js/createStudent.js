$(document).ready(() => {

    $("#createUser-button").click(() => {

        const firstName = $("#regFirstName").val();
        const lastName = $("#regLastName").val();
        const email = $("#regMail").val();
        const password = $("#regPassword").val();
        const verifyPassword = $("#regVerifyPassword");

        if (!firstName || !lastName || !email || !password || !verifyPassword) {
            alert("Alle felter skal udfyldes")
        } else {
            if (password !== verifyPassword) {
                alert("De indtastede koder stemmer ikke overens");
                return;
            }

                SDK.Student.register(regFirstName, regLastName, regMail, regPassword, regVerifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        $(".form-group").addClass("has-error");
                    } else {
                        alert("Du er nu oprettet som: " + firstName + "\nDin mail er dit brugernavn");
                        window.location.href = "login.html";
                    }
                });
            }
    });
$ ("#back-button").click(() => {
    window.location.href = "index.html"
});
});
