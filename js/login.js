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
                SDK.Student.getCurrentStudent((err,data) => {
                        if (err) {
                            cb(err);
                        } else {
                            window.location.href = "firstPage.html";
                        }
                    }
                );
            }
        });

    });

});