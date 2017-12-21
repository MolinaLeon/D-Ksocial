//Udviklet med udgangspunkt i Jesper Bruun Hansens repo: https://github.com/Distribuerede-Systemer-2017/javascript-client/
//Branch: Master, exercise & solution

$(document).ready(() => {

    $("#createUser-button").click(() => {

        let firstName = $("#regFirstName").val();
        let lastName = $("#regLastName").val();
        let email = $("#regMail").val();
        let password = $("#regPassword").val();
        let verifyPassword = $("#regVerifyPassword").val();

        if (!firstName || !lastName || !email || !password || !verifyPassword) {
            alert("Alle felter skal udfyldes")
        } else {
            if (password.valueOf() === verifyPassword.valueOf()) {
                SDK.Student.register(firstName, lastName, email, password, verifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        $(".form-group").addClass("has-error");

                    }else if (err){
                        console.log(err);
                    } else {
                        alert("Du er nu oprettet som: " + firstName + "\nDin mail, " + email + ", er dit brugernavn");
                        window.location.href = "login.html";
                    }
                });
            } else {
                alert("De indtastede koder stemmer ikke overens")
            }
        }
    });
$ ("#back-button").click(() => {
    window.location.href = "index.html"
});
});
