//Nedenfor bliver der oprettet en konstant af SDK, hvilket gør at det er muligt at kalde metoderne fra andre .js sider.

const SDK = {

    //Opretter forbindelse til Serverens API og gør det muligt at kalde de tilhørende funktioner.
    //Nedstpende kode fra linje 8-34 er taget fra DISbook, som er udleveret af øvelseslæren Jesper.

    serverURL: "http://localhost:8080/api",
    request: (options, cb) => { //Vigtigste funktioner, der laver en AJAX request. Kan sende et request, asynkront.

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),

            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    //Her foretages alle server kaldende som omhandler brugeren.
    User: {

        myInfo: (cb) => {
            SDK.request({
                    //Her defineres metoden GET, da informationer skal hentes.
                    method: "GET",
                    //Her tilgås userEndpointet på serveren.

                    url: "/users",
                    /*Nedenfor defineres headeren, som sendes til API'et. Uden denne vil brugeren ikke kunne tilgå
                    den pågældende metode.
                     */
                    headers: {
                        Authorization: "Bearer " + SDK.Storage.load("token")
                    }

                },
                cb);
        },

        findUser: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users/" + SDK.Storage.load("postOwnerId"),
                    headers: {
                        Authorization: "Bearer " + SDK.Storage.load("token")
                    }

                },
                cb);

        },


        createUser: (password, firstName, lastName, email, description, gender, major, semester, cb) => {
            SDK.request({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    email: email,
                    gender: gender,
                    major: major,
                    semester: semester,
                    description: description
                },
                url: "/users",
                method: "POST"
            }, (err, data) => {

                if (err) return cb(err);

                cb(null, data);

            }, cb);
        },

        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users",
                    headers: {
                        Authorization: "Bearer " + SDK.Storage.load("token")
                    }
                },

                cb);
        },

        current: () => {
            return SDK.Storage.load("userId");
        },

        //Ved logout fjernes alt der ligger i localstorage, og brugeren sendes til login siden.

        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            SDK.Storage.remove("postOwnerId");
            SDK.Storage.remove("chosenPostId");
            SDK.Storage.remove("chosenEventId");
            window.location.href = "../Html/index.html";
        },

        login: (password, email, cb) => {
            SDK.request({
                data: {
                    password: password,
                    email: email
                },
                url: "/auth",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, (err, data) => {
                if (err) return cb(err);

                // Nedenstående kode er hentet fra https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
                let token = data;

                var base64Url = token.split('.')[0];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                console.log(JSON.parse(window.atob(base64)));

                SDK.Storage.persist("userId", JSON.parse(window.atob(base64)).kid);
                SDK.Storage.persist("token", data);


                cb(null, data);

            }, cb);
        },

        //loadNav er taget fra DISbook, som er udleveret af øvelseslæren Jesper.

        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {


                const currentUser = SDK.User.current();


                if (currentUser) {
                    $(".navbar-right").html(`
            <li><a href="#" id="logout-link">Log out</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="Index.html">Login <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => {
                    SDK.User.logOut()


                });
                cb && cb();

            })
        },
    },

    //Her foretages alle server kaldende som omhandler posts.

    Post: {

        createPost: (ownerId, content, eventId, cb) => {
            SDK.request({
                data: {
                    owner: ownerId,
                    content: content,
                    event: eventId,

                },
                url: "/posts",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }

            }, cb)
        },

        findComments: (cb) => {
            SDK.request({
                url: "/posts/" + SDK.Storage.load("chosenPostId"),
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },

        createComment: (ownerId, content, parentId, cb) => {
            SDK.request({
                data: {
                    owner: ownerId,
                    content: content,
                    parent: parentId,
                },
                url: "/posts",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },

    },

    //Her foretages alle server kaldende som omhandler events.

    Event: {
        createEvent: (owner_id, title, startDate, endDate, description, cb) => {
            SDK.request({
                data: {
                    owner_id: owner_id,
                    title: title,
                    startDate: startDate,
                    endDate: endDate,
                    description: description
                },
                url: "/events",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },

        findEvent: (cb) => {
            SDK.request({
                url: "/events/" + SDK.Storage.load("chosenEventId"),
                method: "GET",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },
            }, cb)
        },

        findAllEvents: (cb) => {
            SDK.request({
                url: "/events",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },
            }, cb)
        },

        subscribeEvent: (user_id, event_id, cb) => {
            SDK.request({
                data: {
                    user_id: user_id,
                    event_id: event_id
                },
                url: "/users/subscribe",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },
            }, cb)
        },


    },


    //Disse metoder gør det muligt at gemme informationer i localstorage, så de kan bruges senere.
    //Metoderne er tage fra DISbook, udleveret af øvelseslærer Jesper.


    Storage:
        {
            prefix: "NexusSDK",
            persist:
                (key, value) => {
                    window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
                },
            load:
                (key) => {
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

        },


};

