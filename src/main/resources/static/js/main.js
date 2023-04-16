// fetch("http://localhost:8080/user").then(res => console.log(res))
let user_firstName
let save_User
let add_new_User
/*TODO Если убрать этот let, то тогда*/
// let edit_Button

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
                    firstName: $("#exampleInputFirstName").val(),
                    lastName: $("#exampleInputLastName").val(),
                    email: $("#exampleInputEmail1").val(),
                    password: $("#exampleInputPassword1").val()
                    // ,userRoles: $("#roleAdd").val()
                }),
                success: function () {
                    console.log("Save Complete")
                    showUsersOnTable()
                }
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

// Не сработало - удалить
/*$("#edit_Button").bind("click", function () {
        console.log("edit_button_bind")
    }
)*/

function showUsersOnTable() {
        let myTabTest = $('tbody#tbody');
        let api = new API();
        api.showAllUsers(
            function (users) {
                // console.log("showAllUsersTest")
                console.log(users[0])
                myTabTest.empty();
                for (let i = 0; i < users.length; i++) {
                    myTabTest
                        .append('\
                    <tr>\
                        <td>' + users[i].id + '</td>\
                        <td>' + users[i].firstName + '</td>\
                        <td>' + users[i].lastName + '</td>\
                        <td>' + users[i].email + '</td>\
                        <td>' + userRole(users[i].userRoles) + '</td>\
                        <td id="users[i].id" >\
                        <button type="submit" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editUserForm" data-bs-whatever="@mdo" onclick="eventUser()" id="edit_Button" >Edit</button>\
                        <!-- <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#' + users[i].id +'" data-bs-whatever="@mdo" id="edit_Button" >Edit</button>\ \
                        <button type="submit" class="btn btn-primary" id="add_new_User">Add new user</button>-->\
                        </td>\
                        <td id="' + users[i].id +'">Delete button</td>\
                    </tr>\
                        ')
                }
            }
        )
}
/*
edit_Button.onclick = function (event) {
    // вывести тип события, элемент и координаты клика
    console.log(event.type + " on " + event.currentTarget)
    console.log("Coordinate is " + event.clientX + ":" + event.clientY )
    console.log("id = " + event.target.id)
}*/

/*TODO Это начинает работать. почему?*/
edit_Button.onclick = function (event) {
    // вывести тип события, элемент и координаты клика
    console.log(event.type + " on " + event.currentTarget)
    console.log("Coordinate is " + event.clientX + ":" + event.clientY )
    console.log("id = " + event.target.id)
}


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
    showUsersOnTable()
    user_firstName = $('#user_firstName')
    save_User = $('#save_User')
    add_new_User = $('#add_new_User')
    // edit_Button = $('#edit_Button')

    save_User.click(function () {
        console.log("Time to save User")
        let api = new API();
        api.addNewUser()
    })

    add_new_User.click(function () {
        console.log("Time to add new User")
        let api = new API();
        api.addNewUser()
    })

   /* edit_Button.click(function () {
        console.log("Time to summon Form")

    })*/

    edit_Button.onclick = function (event) {
        // вывести тип события, элемент и координаты клика
        console.log("edit_Button.click = function")
        console.log(event.type + " on " + event.currentTarget)
        console.log("Coordinate is " + event.clientX + ":" + event.clientY)
        console.log("id2 = " + event.target.id)

        //TODO Прописать путь иначе?
        let myTabTest = $('div#editUserForm');
        myTabTest.empty();
    }

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

    $("#edit_Button").bind("click", function () {
            console.log("edit_button_bind")
        }
    )


})