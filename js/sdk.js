const SDK = {
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

    Post: {},
    User: {

        myInfo: (cb) =>{
            SDK.request({
                    method: "GET",
                    url: "/users"


                },
                (err, data) =>{

                    SDK.Storage.persist("token", data);

                },
                cb)
        },

        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const user = SDK.User.current();
                if (currentUser) {
                    $(".navbar-right").html(`
            <li><a href="profile.html">Profile</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                /*} else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);*/
                }
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
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
            }, cb)
        },

        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users"
                },

                cb);
        },

        current: () => {
            return SDK.Storage.load("user");
        },
        logOut: () => {
            SDK.Storage.remove("token");
            window.alert("lol")
            window.location.href = "../Html/HomePage.html";
        },

        login: (password, email, cb) => {
            SDK.request({
                data: {
                    password: password,
                    email: email
                },
                url: "/auth",
                method: "POST"
            }, (err, data) => {


                //If login fails
                if (err) return cb(err);
                debugger;
                // SDK.Storage.persist("tokenId", data.id);
                // SDK.Storage.persist("userId", data.userId);
                // SDK.Storage.persist("user", data.user);

                let token = data;

                    var base64Url = token.split('.')[0];
                    var base64 = base64Url.replace('-','+').replace('_','/');
                console.log(JSON.parse(window.atob(base64)));

                SDK.Storage.persist("userId", JSON.parse(window.atob(base64)).kid);
                SDK.Storage.persist("token", data);
                cb(null, data);
            });
        },


        /*Event: {
            addEvent: (event) => {
                let basket = SDK.Storage.load("basket")

                //If something has been added to your basket before do the following:

                if (!basket) {
                    return SDK.Storage.persist("basket", [{
                        count: 1,
                        event: event
                    }]);
                }
                //Does the event already exist?
                let foundEvent = basket.find(b => b.event.id === event.id);
                if (foundEvent) {
                    let i = basket.indexOf(foundEvent);
                    basket[i].count++;
                else
                    {
                        basket.push({
                            count: 1,
                            event: event
                        });
                    }
                    SDK.Storage.persist("basket", basket);
                }
            }
        },*/


        Storage:
            {
                prefix: "CafeNexusSDK",
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

        encrypt: (encrypt) => {
            if (encrypt !== undefined && encrypt.length !== 0) {
                const key = ['L', 'O', 'L'];
                let isEncrypted = "";
                for (let i = 0; i < encrypt.length; i++) {
                    isEncrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
                }
                return isEncrypted;
            } else {
                return encrypt;
            }
        },

        decrypt:
            (decrypt) => {
                if (decrypt !== undefined && decrypt.length !== 0) {
                    const key = ['L', 'O', 'L'];
                    let isDecrypted = "";
                    for (let i = 0; i < decrypt.length; i++) {
                        isDecrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
                    }
                    return isDecrypted;
                } else {
                    return decrypt;
                }
            }
    },
}
