
const API = function() {
    return {
        showAllUsers: function (param) {
            $.get("/users", param)
        },
        addNewUser: function () {
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
                    username: $("#exampleInputUsername").val(),
                    password: $("#exampleInputPassword1").val(),
                    userRoles: roles2
                }),
                success: function () {
                    console.log("Save Complete")
                    showUsersOnTable()
                }
            })
        },
        updateUser: function () {
            let formData = $("form#editUserForm").serializeArray();
            let data = {};
            $(formData ).each(function(index, obj){
                data[obj.name] = obj.value;
            });

            let roles2 = $("#roleAdd2 option:selected").map(function() {
                return {
                    roleId: $(this).attr("id"),
                    roleName: $(this).val(),
                    authority: $(this).val()
                };
            }).get();

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
                    userRoles: roles2
                }),
                success: function () {
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
                    showUsersOnTable()
                }
            }).fail(function () {
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

function showUsersOnTable() {
        let myTabTest = $('tbody#tbody');
        let api = new API();
        api.showAllUsers(
            function (users) {
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
                        <button type="submit" class="btn btn-info close-task" data-bs-toggle="modal" data-bs-target="#editUserFormDiv" data-bs-whatever="@mdo" id="'+ users[i].id +'" >Edit</button>\
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

function showUsersOnTableForUserPage() {
        let myTabTest = $('tbody#tbodyUser');
        let api = new API();
        api.showAllUsers(
            function (users) {
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
                    </tr>\
                        ')
                }
            }
        )
}

function updateUser() {
    let api = new API();
    api.updateUser()
}

function deleteUser() {
    let api = new API();
    api.deleteUser()
}

function getAuthUser() {
    $.get('user/auth', function (data) {
        $('a#userEmail').empty().append('' + data.email + '')
        $('a#listRoles').empty().append('' + userRole(data.userRoles).join(', ') + ' ')
    })
}

$(document).ready (function () {
    getAuthUser()
    showUsersOnTable()
    showUsersOnTableForUserPage()

    $('#profile-tab').click(giveMeAllRolesList("roleAdd"))

    $('#add_new_User').click(function () {
        let api = new API();
        api.addNewUser()
    })

    function showOneUserForEditForm(userId) {
        let id = userId;
        $.get('/users', function (data) {
            let formUser
            for (let i = 0; i < data.length;) {
                if (data[i].id === id) {
                    formUser = data[i]
                    break
                } else {
                    i++
                }
            }

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

            giveMeAllRolesList("roleAdd2")
        });

    }

    function giveMeAllRolesList(selectForm) {
        $.get('/roles', function (data) {
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
            let formUser
            for (let i = 0; i < data.length;) {
                if (data[i].id === id) {
                    formUser = data[i]
                    break
                } else {
                    i++
                }
            }

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

    $(document).on('click', ".close-task", null, function (event) {
        let number = Number(event.target.id)
        showOneUserForEditForm(number)
    })

    $(document).on('click', ".delete-task", null, function (event) {
        let number = Number(event.target.id)
        showOneUserForDeleteForm(number)
    })

})