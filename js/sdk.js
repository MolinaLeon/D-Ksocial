const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {


        let token = {
            "Authorization": SDK.Storage.load("token")
        };

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(SDK.Encryption.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                cb(null, SDK.Encryption.decrypt(data), status, xhr);
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
                    if(cb) cb(null, data);
                });
        },

        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentStudent = SDK.Student.currentStudent();
                if (currentStudent) {
                    $(".navbar-right").html(`
            <li><a href="firstPage.html">Profil</a></li>
            <li><a href="events.html">Alle begivenheder</a></li>
            <li><a href="myEvents.html">Mine begivenheder</a></li>
            <li><a href="createEvent.html">Opret begivenhed</a></li>
            <li><a href="myAttEvents.html">Deltagende</a></li>
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
            getEvents: (cb, events) => {
                SDK.request({
                    method: "GET",
                    url: "/events",
                    headers: {
                        filter: {
                            include: ["events"]
                        }
                    }
                }, (err, data) => {
                    if (err) return cb(err);
                    cb(null, data);
                });
            },

            joinEvent: (idEvent, eventName, location, price, eventDate, description, cb) => {
                SDK.request({
                    data: {
                        idEvent: idEvent,
                        eventName: eventName,
                        location: location,
                        price: price,
                        description: description,
                    },
                    method: "POST",
                    url: "/events/join",
                    authorization: SDK.Storage.load("token"),
                }, (err, data) => {
                    if (err)
                        return cb(err);
                    cb(null, data);
                });
            },

            getAttStudents: (idEvent, cb) => {
                SDK.request({
                    method: "GET",
                    url: "/events/" + idEvent + "/students",
                    headers: {
                        Authorization: SDK.Storage.load("token")
                    },
                }, cb);
            },

            getAttEvents: (cb) => {
                SDK.request({
                    method: "GET",
                    url: "/students/" + SDK.Storage.load("getCurrentStudent").idStudent + "/events",
                    headers: {
                        filter: {
                            include: ["events"]
                        }
                    }
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
                    headers: {
                        Authorization: SDK.Storage.load("token")
                    }
                }, cb);
            },

            myEvents: (cb) => {
                SDK.request({
                    method: "GET",
                    url: "/events/myEvents",
                    headers: {
                        Authorization: SDK.Storage.load("token")
                    },

                }, cb)
            },

            updateEvent: (idEvent, eventName, location, eventDate, price, description, cb) => {
                SDK.request({
                    method: "PUT",
                    url: "/events/" + idEvent + "/update-event",
                    data: {
                        eventName: eventName,
                        location: location,
                        eventDate: eventDate,
                        price: price,
                        description: description,
                    }
                }, (err, data) => {
                    if (err)
                        return cb(err);

                    SDK.Storage.persist("crypted", data);
                    cb(null, data);
                });
            },

            deleteEvent: (idEvent, eventName, location, price, eventDate, description, cb) => {
                SDK.request({
                    method: "PUT",
                    url: "/events/" + idEvent + "/delete-event",
                    data:{
                        dEvent: idEvent,
                        eventName: eventName,
                        location: location,
                        price: price,
                        eventDate: eventDate,
                        description: description,
                    },
                }, cb)
            }
        },

    //Metode lånt fra https://github.com/Ibenfoldager/STFUClient/commit/98e93ad94c02d4980cf0e9512677d1e470565efc
    // for at få updateEvent til at virke
    Url: {
        getParameterByName: (name) => {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
    },

    Encryption: {
        encrypt: (encrypt) => {
            if (encrypt !== undefined && encrypt.length !== 0){
            const fields = ['J', 'M', 'F'];
            let encrypted = '';
            for (let i = 0; i <encrypt.length; i++) {
                encrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
            }
            return encrypted;
            } else {
                return encrypt;
            }
        },

        decrypt:(decrypt) => {
            if (decrypt.length > 0 && decrypt !== undefined) {
                const fields = ['J', 'M', 'F'];
                let decrypted = '';
                for (let i = 0; i < decrypt.length; i++) {
                    decrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return decrypted;
            } else {
                return decrypt;
            }

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









