// fetch("http://localhost:8080/user").then(res => console.log(res))
let user_firstName
let save_User
let add_new_User

/*TODO Если убрать этот let, то тогда*/
// let edit_Button
let update_User

console.log("its meeeee")

const API = function() {
    return {
        showAllUsers: function (param) {
            $.get("/users", param)
        },
        addNewUser: function (user, param) {
            let roles2 = $("#roleAdd option:selected").map(function() {
                return {
                    roleId: $(this).attr("id"),
                    roleName: $(this).val(),
                    authority: $(this).val()
                };
            }).get();

            $.ajax({
                url: '/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    firstName: $("#exampleInputFirstName").val(),
                    lastName: $("#exampleInputLastName").val(),
                    email: $("#exampleInputEmail1").val(),
                    password: $("#exampleInputPassword1").val(),
                    userRoles: roles2
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
        updateUser: function () {

        console.log($("select#roleAdd2").val())
        console.log($("select#roleAdd2"))
        console.log($("select#roleAdd2").toArray())

        let test = $("select#roleAdd2").toArray()
        console.log(test[0])
        console.log(test[0].innerHTML)
        console.log(test[0].innerText)
        console.log(test[0][0].innerText)
        // console.log(test[0][1].innerText)
        //
        // console.log("Dont care")
        // console.log(test[0].innerText)
        // console.log(test[0].outerText)
        // console.log(test[1].outerText)
        // console.log(test[0].text)
        // console.log(test[0].textContent)

        //
        // let test1111 = $("select#roleAdd2").toArray()[0][1].innerText
        // console.log("test1111")
        // console.log(test1111)
        console.log($("#exampleInputFirstName").val())
        //TODO !!!!!! На основе разницы того что получается в этих двух строках понять что мне надо чтобы получить массив ролей
        console.log($("#user_firstName").val())
        console.log($("#user_firstName"))

        let formData = $("form#editUserForm").serializeArray();
        console.log(formData)
        let data = {};
        $(formData ).each(function(index, obj){
            data[obj.name] = obj.value;
        });
        let jsonData = JSON.stringify(data);
        console.log(jsonData);

            let roles = $("#roleAdd2").val().map(function(role) {
                return { roleName: role, authority: role };
            });

            let roles2 = $("#roleAdd2 option:selected").map(function() {
                return {
                    roleId: $(this).attr("id"),
                    roleName: $(this).val(),
                    authority: $(this).val()
                };
            }).get();


            console.log(roles)
            console.log(roles2)

            $.ajax({
                url: '/users',
                dataType: 'json',
                type: 'PUT',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: $("#user_id").val(),
                    firstName: $("#user_firstName").val(),
                    lastName: $("#user_lastName").val(),
                    email: $("#user_userEmail").val(),
                    username: $("#user_userName").val(),
                    password: $("#user_password").val(),
                    //TODO Если выбрать любую роль из списка - ошибка
                    userRoles: roles2
                }),
                success: function () {
                    console.log("Update_User (function updateUser())")
                    showUsersOnTable()
                }
            })
        },
        deleteUser: function () {
            let id = $("#id-delete").val()

            $.ajax({
                url: '/users/' + id,
                dataType: 'json',
                type: 'DELETE',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify(id),
                success: function () {
                    console.log("Delete_User (function deleteUser())")
                    showUsersOnTable()
                }
            }).fail(function (url) {
                console.log(url);
                console.log("Delete_Fail_User (function deleteUser())")
                showUsersOnTable()
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
                        <td id="' + users[i].id +'">\
                        <button type="submit" class="btn btn-info close-task" data-bs-toggle="modal" data-bs-target="#editUserFormDiv" data-bs-whatever="@mdo" onclick="eventUser()" id="'+ users[i].id +'" >Edit</button>\
                        </td>\
                        <td id="' + users[i].id +'">\
                            <button type="submit" class="btn btn-danger delete-task" data-bs-toggle="modal" data-bs-target="#deleteUserFormDiv" data-bs-whatever="@mdo" id="'+ users[i].id +'" >Delete</button>\
                        </td>\
                    </tr>\
                        ')
                }
            }
        )
}

function eventUser() {
    console.log("Hello, i am a eventUser function")
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
    console.log("edit_Button.onclick = function (event) ")
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

//TODO Работает, но форма перезагружает страницу - надо поправить
function updateUser() {
    console.log("Time to for function update_User")
    let api = new API();
    api.updateUser()
}

//TODO Не работает - почему?
function deleteUser() {
    console.log("Time to for function delete_User")
    let api = new API();
    api.deleteUser()
}

$(document).ready (function () {
    testRoles("roleAdd")

    const form = document.getElementById('editUserForm');
    const button = document.getElementById('update_User');

    button.addEventListener('click', function(event) {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        updateUser();
    });

    showUsersOnTable()
    user_firstName = $('#user_firstName')
    save_User = $('#save_User')
    add_new_User = $('#add_new_User')
    update_User = $('#update_User')
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
//TODO На элементы, написанные JS'ом не работают события
    update_User.click(function () {
        console.log("Time to add update_User")
        let api = new API();
        api.updateUser()
    })


   /* edit_Button.click(function () {
        console.log("Time to summon Form")

    })*/

    function showOneUserForEditForm(userId) {
        let id = userId;
        $.get('/users', function (data) {
            console.log("showOneUsers")

            let formUser

            for (i = 0; i < data.length;) {
                console.log("i = " + i)
                if (data[i].id === id) {
                    formUser = data[i]
                    break
                } else {
                    i++
                }
            }
/*TODO Delete*/
            console.log(formUser)
            console.log(formUser.id)
            console.log(formUser.firstName)

            let roles = formUser.userRoles
            console.log(roles)


            //TODO Прописать путь иначе?
            let myForm = $('div#1editUserForm');
            myForm.empty();
            myForm.append('\n' +
                '<form id="editUserForm">\n' +
                '    <label for="id">ID</label>\n' +
                '    <fieldset disabled>\n' +
                '        <input type="text" class="form-control" value="' + formUser.id + '" id="user_id"/>\n' +
                '    </fieldset>\n' +
                '    <br/>\n' +
                '    <label for="firstName">First name</label>\n' +
                '    <input type="text" class="form-control" value="' + formUser.firstName + '" name="firstName" id="user_firstName"/>\n' +
                '    <br/>\n' +
                '    <label for="lastName">Last name</label>\n' +
                '    <input type="text" class="form-control" value="' + formUser.lastName + '" name="lastName" id="user_lastName"/>\n' +
                '    <br/>\n' +
                '    <label for="email">Email</label>\n' +
                '    <input type="email" class="form-control" value="' + formUser.email + '" name="email" id="user_userEmail"/>\n' +
                '    <br/>\n' +
                '    <label for="username">Username</label>\n' +
                '    <input type="text" class="form-control" value="' + formUser.username + '" name="username" id="user_userName"/>\n' +
                '    <br/>\n' +
                '    <label for="password">Password</label>\n' +
                '    <input type="text" class="form-control" value="' + formUser.password + '" name="password" id="user_password"/>\n' +
                '    <br/>\n' +
                '    <div class="form-group"><label class="col-form-label" for="roleAdd2">Role</label>' +
                '<select class="custom-select form-control" multiple="" name="userRoles" id="roleAdd2">' +
                '</select></div>\n' +
                '    <div class="modal-footer">\n' +
                '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n' +
                '        <button type="button" class="btn btn-primary" id="update_User" onclick="updateUser()" data-bs-dismiss="modal" >Edit</button>\n' +
                '    </div>\n' +
                '</form>')

            testRoles("roleAdd2")
        });


    }

    function testRoles(selectForm) {
        $.get('/roles', function (data) {
            console.log(data)
            console.log("testRoles()")
            // TODO Выдает то что нужно - список ролей
            console.log(data[1].roleName)
            console.log(data[0].roleName)
            let select = document.getElementById(selectForm);
            data.forEach(function(option) {
                let optionElement = document.createElement("option");
                optionElement.value = option.roleName;
                optionElement.id = option.roleId;
                optionElement.text = option.roleName;
                select.add(optionElement);
            });

        })
    }

    function showOneUserForDeleteForm(userId) {
        let id = userId;
        $.get('/users', function (data) {
            console.log("showOneUsers")

            let formUser

            for (i = 0; i < data.length;) {
                console.log("i = " + i)
                if (data[i].id === id) {
                    formUser = data[i]
                    break
                } else {
                    i++
                }
            }
            /*TODO Delete*/
            console.log(formUser)
            console.log(formUser.id)
            console.log(formUser.firstName)

            //TODO Прописать путь иначе?
            let myForm = $('div#deleteUserForm');
            myForm.empty();
            myForm.append('' +
                '<form>\n' +
                '    <fieldset disabled>\n' +
                '        <label for="id-delete">ID</label>\n' +
                '        <input type="text" class="form-control" value="' + formUser.id + '" id="id-delete" />\n' +
                '        <br/>\n' +
                '        <label for="firstName-delete">First name</label>\n' +
                '        <input type="text" class="form-control" value="' + formUser.firstName + '" id="firstName-delete" />\n' +
                '        <br/>\n' +
                '        <label for="lastName-delete">Last name</label>\n' +
                '        <input type="text" class="form-control" value="' + formUser.lastName + '" id="lastName-delete"/>\n' +
                '        <br/>\n' +
                '        <label for="email-delete">Email</label>\n' +
                '        <input type="email" class="form-control" value="' + formUser.email + '" id="email-delete"/>\n' +
                '        <br/>\n' +
                '        <label for="username-delete">Username</label>\n' +
                '        <input type="text" class="form-control" value="' + formUser.username + '" id="username-delete"/>\n' +
                '        <br/>\n' +
                '        <label for="password-delete">Password</label>\n' +
                '        <input type="text" class="form-control" value="' + formUser.password + '" id="password-delete"/>\n' +
                '    </fieldset>\n' +
                '    <br/>\n' +
                '    <div class="modal-footer">\n' +
                '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n' +
                '        <button type="button" class="btn btn-danger" id="delete_User" onclick="deleteUser()" data-bs-dismiss="modal">Delete</button>\n' +
                '    </div>\n' +
                '</form>')

        });
    }

    edit_Button.onclick = function (event) {
        // вывести тип события, элемент и координаты клика
        console.log("edit_Button.click = function")
        console.log(event.type + " on " + event.currentTarget)
        console.log("Coordinate is " + event.clientX + ":" + event.clientY)
        console.log("id2 = " + event.target.id)

        // let number = Number(event.target.id)
        let number = Number(event.target.className)
        showOneUserForEditForm(number)


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
//TODO Well done
    function closeTask() {
        console.log("function closeTask")
    }
//TODO Работает на элементы, написанные JS'ом
    $(document).on('click', ".close-task", closeTask, function (event) {
        // вывести тип события, элемент и координаты клика
        console.log("edit_Button.click = function")
        console.log(event.type + " on " + event.currentTarget)
        console.log("Coordinate is " + event.clientX + ":" + event.clientY)
        console.log("id2 = " + event.target.id)

        let number = Number(event.target.id)
        // let number = Number(event.target.className)
        showOneUserForEditForm(number)
    })

    $(document).on('click', "#update_User", closeTask, function (event) {
        const form = document.getElementById('editUserForm');
        const button = document.getElementById('update_User');

            event.preventDefault(); // предотвращаем перезагрузку страницы
        });


    function deleteTask() {
        console.log("function closeTask")
    }

    $(document).on('click', ".delete-task", deleteTask, function (event) {
        // вывести тип события, элемент и координаты клика
        console.log("edit_Button.click = function")
        console.log(event.type + " on " + event.currentTarget)
        console.log("Coordinate is " + event.clientX + ":" + event.clientY)
        console.log("idDelete = " + event.target.id)

        let number = Number(event.target.id)
        // let number = Number(event.target.className)
        showOneUserForDeleteForm(number)

        let test = $.get('/roles', function (data) {
            console.log(data)
            // TODO Выдает то что нужно - список ролей
            console.log(data[1].roleName)
            console.log(data[0].roleName)
        })


        console.log("test test " + test)
        console.log(test)
        console.log("test test " + test.roles)
        console.log("test is... " + userRolesForTest(test))

    })



    $.get('/roles', function (data) {
        console.log(data)
    })

    let userRolesForTest = function (roles) {
        let arr = [];
        roles.forEach((role) => {
            arr.push(role.userRoles)
        })
        return arr
    }

    $("#update_User").click(function() {
        let formData = $("form").serializeArray();
        let data = {};
        $(formData ).each(function(index, obj){
            data[obj.name] = obj.value;
        });
        let jsonData = JSON.stringify(data);
        console.log(jsonData);
    });
})