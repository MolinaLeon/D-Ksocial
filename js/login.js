$(document).ready(() => {

    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        SDK.Student.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".login-button").addClass("has-error");
            }
            else if (err) {
                console.log(err)
            } else {
                window.location.href = "firstPage.html";
            }
        });

    });

});