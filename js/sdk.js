const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        /* Bruges umiddelbart ikke grundet anden storage metode
        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }
*/
        let token = {
            "Authorization": SDK.Storage.load("token")
        };

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, (data), status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });


    },


    Student: {

        register: (regFirstName, regLastName, regMail, regPassword, regVerifyPassword, cb ) => {
            SDK.request({
                data: {
                    firstName: regFirstName,
                    lastName: regLastName,
                    email: regMail,
                    password: regPassword,
                    verifyPassword: regVerifyPassword
                },
                url: "/register",
                method: "POST"
                }, (err, data) => {
                    if (err) {
                        return cb(err);
                    }
                    cb(null, data);
                });
        },

        currentStudent: () => {
            return SDK.Storage.load("token");
        },
        logOut: (cb) => {
            SDK.request({
                method: "POST",
                url: "/students/logout",
            }, (err, data) => {
                if (err) {
                   return cb(err);
                }
                cb(null, data);
            });
        },
        login: (email, password, cb) => {
            SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/login",
                method: "POST"
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);

                SDK.Storage.persist("token", data);

                cb(null, data);

            });
        },

            getCurrentStudent: (cb) => {
                SDK.request({
                    method: "GET",
                    url: "/students/profile",
                    headers: {
                        Authorization: SDK.Storage.load("token"),
                    },
                }, (err, data) => {
                    if (err) {
                        return cb(err);
                    }
                    SDK.Storage.persist("Student", data);
                    cb(null, data);
                });
        },

        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentStudent = SDK.Student.currentStudent();
                if (currentStudent) {
                    $(".navbar-right").html(`
            <li><a href="firstPage.html">Profil</a></li>
            <li><a href="events.html">Alle begivenheder</a></li>
            <li><a href="myEvents.html">Dine begivenheder</a></li>
            <li><a href="createEvent.html">Opret begivenhed</a></li>
            <li><a href="attStudents.html">Deltagere</a></li>
            <li><a href="updateEvent.html">Opdater begivenhed</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Log ind <span class="sr-only">(currentStudent)</span></a></li>
            <li><a href="createStudent.html">Opret bruger</a></li>
          `);
                }
                $("#logout-link").click(() => {
                    SDK.Student.logOut((err, data) => {
                        if (err & err.xhr.status === 401) {
                            $(".form-group").addClass("has-error");
                        } else {
                            SDK.Storage.remove("token");
                            SDK.Storage.remove("student");
                            window.location.href = "index.html";
                        }
                    });

                });
                cb && cb();
            });
        }
    },


        Event: {
            getEvents: (cb) => {
                SDK.request({
                    method: "GET",
                    url: "/events",
                    headers: {
                        Authorization: SDK.Storage.load("token"),
                        filter: {
                            include: ["events"]
                        }
                    }
                }, (err, data) => {
                    if (err) return cb(err);
                    cb(null, data);
            });
            },

            joinEvent: (cb) => {
                SDK.request({
                    method: "POST",
                    url: "/events/join",
                    headers:{
                        Authorization: SDK.Storage.load("token")
                    }
                }, cb)
            },

            getAttStudents: (idEvent, cb) => {
                SDK.request({
                    method: "GET",
                    url: "/events/" + idEvent + "/students",
                }, cb);
            },

            createEvent: (regEventPrice, regEventName, regEventLocation, regEventDescription, regEventDate, cb) => {
                SDK.request({
                    method: "POST",
                    url: "/events",
                    data: {
                        price: regEventPrice,
                        eventName: regEventName,
                        location: regEventLocation,
                        description: regEventDescription,
                        eventDate: regEventDate,
                    },
                    headers:{
                        Authorization: SDK.Storage.load("token")
                            }
                    }, cb);
            },

            myEvents: (cb) => {
                SDK.request({
                    method: "GET",
                    url: "/events/myEvents",
                    headers:{
                        Authorization: SDK.Storage.load("token")
                    }

                }, cb)
            },

            deleteEvent: (idEvent, price, eventName, location, description, eventDate, cb) => {
                SDK.request({
                    method: "PUT",
                    url: "/events/" + idEvent + "/delete-event",
                    data:{
                        idEvent: delIdEvent,
                        price: delPrice,
                        eventName: delEventName,
                        location: delLocation,
                        description: delDescription,
                        eventDate: delEventDate
                    },
                }, cb)
            }
        },



    Storage: {
        prefix: "DØKSocial",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    }
};









