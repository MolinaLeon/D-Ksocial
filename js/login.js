//Udviklet med udgangspunkt i Jesper Bruun Hansens repo: https://github.com/Distribuerede-Systemer-2017/javascript-client/
//Branch: Master, exercise & solution
//og hjælp fra Laust Færge

$(document).ready(() => {

    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        SDK.Student.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".login-button").addClass("Error - 401");
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