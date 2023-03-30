// fetch("http://localhost:8080/user").then(res => console.log(res))
let user_firstName
let save_User

console.log("its meeeee")

const API = function() {
    return {
        showAllUsers: function (param) {
            $.get("/users", param)
        },
        addNewUser: function (user, param) {
            $.ajax({
                url: '/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    firstName: user_firstName.val()
                })
            })
        },
        /*
        addNewUser: function (user, param) {
            $.ajax({
                url: '/users',
                type: 'POST',
                data: JSON.stringify(user),
                success: param
            })
        },
        */
        updateUser: function (user, param) {
            $.ajax({
                url: '/users',
                type: 'PUT',
                data: JSON.stringify(user),
                success: param
            })
        },
        deleteUser: function (id, param) {
            $.ajax({
                url: '/users/' + id,
                type: 'DELETE',
                data: JSON.stringify(id),
                success: param
            })
        }

    }
}

let userRole = function (roles) {
    let arr = [];
    roles.forEach((role) => {
        arr.push(role.roleName)
    })
    return arr
}

$(function() {
    let myTab = $('tbody#tbody');
    let api = new API();
    api.showAllUsers(
        function (users) {
            // console.log(users[0])
            myTab.empty();
            for (let i = 0; i < users.length; i++) {
                myTab
                    .append('\
                    <tr>\
                        <td>' + users[i].id + '</td>\
                        <td>' + users[i].firstName + '</td>\
                        <td>' + users[i].lastName + '</td>\
                        <td>' + users[i].email + '</td>\
                        <td>' + userRole(users[i].userRoles) + '</td>\
                    </tr>\
                        ')
            }
        }
    )
}
);

let content = $('div#app'); //наш див с результатами поиска
content.empty(); //очистит все внутри него;

let data = [{name:'Миша',age:'17'}, {name:'Саша',age:'18'}]; //допустим так выглядит твой АЯКС ответ
for (let i = 0; i < data.length; i++) { //объявляем цикл с количеством итераций равной количеству данный в ответе
    content.append('\
        <div class="main">\
            <div>\
                <div>' + data[i].name + '</div>\
                <div>' + data[i].age + '</div>\
            </div>\
        </div>\
    ');
}

function funcSuccess (data) {
    $("#information").text ("hello")
    console.log("DONE")
}
/*

function sendUser() {

    $.ajax({
        url: '/users',
        dataType: 'json',
        type: 'POST',
        cache: false,
        contentType: 'json',
        data: JSON.stringify({
            firstName: $("#user_firstName").val(),
            lastName: $("#user_lastName").val(),
            email: $("#user_userEmail").val(),
            password: $(null),
            username: $(null),
            enabled: $(null),
            credentialsNonExpired: $(null),
            accountNonLocked: $(null),
            userRoles: $(null),
            accountNonExpired: $(null)
        }),
        success: function () {
        }
    })
}
*/


$(document).ready (function () {
    user_firstName = $('#user_firstName')
    save_User = $('#save_User')

    save_User.click(function () {
        let api = new API();
        api.addNewUser()
    })

    $("#load").bind("click", function () {
        $.ajax({
            url: "/users",
            type: "POST",
            data: ({firstName: "SuperOleg"}),
            dataType: "html",
            success: funcSuccess
        })
        $.get('/users/22', function (data) {
            console.log(data)
        })
    })


})