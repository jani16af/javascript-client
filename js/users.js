$(document).ready(() => {

    //Her hentes metoden i sdk'en under User, loadNav, som viser navbaren, som ligger i nav.html.

    SDK.User.loadNav();

    //Der oprettes en konstant, så listen med brugere kan indsættes på den korrekte plads i html filen.

    const $listOfUsers = $("#list-of-users");

    //Metoden findAll køres og alle brugerne hentes fra databasen ved hjælp af et loop

    SDK.User.findAll((err, users) => {
        users.forEach((user) => {

            //Nedenstående er den html som indsættes i Users.html.

            $listOfUsers.append(`
<div class="row">
        <div class="co-lg-6">
            <div class="user-list">
            <table>
            <tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.major}</td>
                <td>${user.semester}</td>
                <td>${user.description}</td>
            </tr>
            </table>
            <div id="load-test"></div>
            </div>
                `
            );
        });

    });

});