$(document).ready(() => {

    //Her hentes metoden i sdk'en under User, loadNav, som viser navbaren, som ligger i nav.html.

    SDK.User.loadNav();

    //Her hentes user_id og event_id, som ligger i browseren i localstorage.

    const user_id = SDK.Storage.load("userId");
    const event_id = SDK.Storage.load("chosenEventId");

    /*Her køres funktionen når en bruger trykker på attendEvent knappen.
    Ved at klikke på denne køres funktionen suscribeEvent, som tager user_id
    og event_id og tilmelder brugeren til eventet.
     */

    $("#attendEvent-button").click(function () {
        if (SDK.User.current()) {

            SDK.Event.subscribeEvent(user_id, event_id, (err) => {
                if (err && err.xhr.status === 500) {
                    $(".form-group").addClass("has-error");
                    window.alert("You are already attending this event")

                } else {

                    window.alert("You are now attending this event!");
                    window.location.href = "Events.html";

                }
            });

        } else {
            window.alert("Please login to attend event")
        }

    });

    $("#return-buttonTop").click(function () {


        window.location.href = "Events.html";

    });

    //Her oprettes 2 konstanter som trækker op to lister i chosenEvent.html.

    const $specificEvent = $("#specificEvent-list");
    const $PostList = $("#post-list");

    /*Denne funktion går ind og henter informationerne omkring eventet
    som er valgt. Herunder de kommentarer og opslag der er på eventet.
     */

    SDK.Event.findEvent((err, event) => {


        const specificEventHtml = `

 <div class="page-header">
        <h1 align="CENTER">${event.title}</h1>
    </div>
            
           </div>`;

        /* Her gøres området i Html dokumentet klar til at de post
        som tilhører den pågælende event kan placeres der, efter at
        de er blevet hentet.

         */

        $specificEvent.append(specificEventHtml);

        const eventPosts = event.posts;

        eventPosts.forEach((eventPosts) => {

            SDK.Storage.persist("postOwnerId", eventPosts.owner.id);


            const postsHtml = `

        <div class="col-lg-12 post-container" >
            <div class="panel panel-default">
                <div class="panel-heading" align="CENTER">
                    <h3 class="panel-title"></h3>
                </div>
                
                <div class="panel-body">
                    <div class="col-lg-12">
                      <dl>
                      <dt>Created</dt>
                      <dd>${eventPosts.created}</dd>
                      <dt>Post</dt>
                      <dd>${eventPosts.content}</dd>
                      </dl>
                    </div>
                </div>
                
                <div class="panel-footer" align="RIGHT">
                    <div class="row">
                            <button class="btn btn-default thisPost-button" id="thisPost-button" data-post-comments="${eventPosts.id}" >Comment on the post</button>
                    </div>
                </div>
            </div>
            
           </div>`;
            $PostList.append(postsHtml);
        });

        SDK.Storage.remove("postOwnerId");

        /* Denne kode aktiveres når en bruger klikker kommenteringsknappen. her bliver
        chosenPostId gemt i localstorage da den skal bruges.
        Herefter vises en modal med kommentarerne til det valgte opslag.
         */

        $(".thisPost-button").click(function () {
            $("#comment-modal").modal("toggle");
            const postId = $(this).data("post-comments");
            SDK.Storage.persist("chosenPostId", postId);

        });


    });

    /*Når knappen til at oprette en ny post klikkes på fyres nedestående funktion.
    Dette event opretter 3 konstanter, som tager det du har skrevet,
    dit userId og chosenEventId og kalder server metoden createPost.
     */

    $("#newPost-button").click(function () {

        const ownerId = SDK.Storage.load("userId");
        const content = $("#inputNewPost").val();
        const eventId = SDK.Storage.load("chosenEventId");

        SDK.Post.createPost(ownerId, content, eventId, (err, data) => {

            //Er brugeren ikke logget ind sker der en fejl 500.

            if (err && err.xhr.status === 500) {
                $(".form-group").addClass("has-error");
                window.alert("Please login to post")

            }

        });

        window.location.href = "chosenEvent.html";


    });

    //Klikkes der på return knappen, vendes der tilbage til alle events siden.

    $("#return-buttonBottom").click(function () {


        window.location.href = "Events.html";

    });

    //Nedstående funktion er lavet med inspiration fra øvelseslæren Jesper øvelse DISbook.

    $("#comment-modal").on("shown.bs.modal", () => {

        /*Her køres sdk metoden find comments, for at finde de kommentarer som tilhører
        det valgte event.
             */

        SDK.Post.findComments((err, post) => {


            const postComments = post.comments;

            console.log(post);

            //Disse events sættes herefter ind i modal bodyen.

            postComments.forEach((posts) => {


                const $modalTbody = $("#modal-tbody");
                $modalTbody.append(`
        <dl>
                              
           <dt>${posts.owner.id}</dt>
           <dd>${posts.content}</dd>
           
                        
        </dl>
      `);
            });
        });
    });

    $("#comment-modal").on("hidden.bs.modal", function () {
        $("#modal-tbody").html("");
    });

    //Klikkes der på new comment knappen aktiveres nedstående funktion.

    $("#newComment-button").click(function () {

        /*Dette event opretter 3 konstanter, som tager det du har skrevet,
         dit userId og chosenEventId og kalder server metoden createcomment.
         */


        const ownerId = SDK.Storage.load("userId");
        const content = $("#inputNewComment").val();
        const parentId = SDK.Storage.load("chosenPostId");

        SDK.Post.createComment(ownerId, content, parentId, (err, data) => {

            if (err && err.xhr.status === 500) {
                $(".form-group").addClass("has-error");
                window.alert("Please login to create comment")

            }

        });

        $("#comment-modal").modal("toggle");

    });


});