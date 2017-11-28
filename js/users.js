$(document).ready(() => {


    SDK.User.loadNav();


    const $listOfUsers = $("#list-of-users");



    SDK.User.findAll((err, users) => {
        users.forEach((user) => {


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