$(document).ready(() => {

    window.alert("HEJSA")
    const $userlist = $("#user-list");

    SDK.User.findAll((err, users) => {
        users.forEach((user) => {

            const userHtml = `
        <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${user.firstName}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-4">
                    </div>
                    <div class="col-lg-8">
                      <dl>
                        <dt>Subtitle</dt>
                        <dd>${user.gender}</dd>
                        <dt>Publisher</dt>
                        <dd>${user.major}</dd>
                        <dt>ISBN</dt>
                        <dd>${user.semester}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${user.description}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        })



    })

});