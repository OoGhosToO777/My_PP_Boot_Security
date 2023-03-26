// fetch("http://localhost:8080/user").then(res => console.log(res))

console.log("its meeeee")



const API = function() {
    return {
        showAllUsers: function (param) {
            $.get("/users", param)
        },
        addNewUser: function (user, param) {
            $.ajax({url: '/users',
                type: 'POST',
                data: JSON.stringify(user),
                success: param
            })
        }
    }
}

$(function() {
    let myTab = $('tbody#tbody');
    let api = new API();
    api.showAllUsers(
        function (users) {
            users.forEach(
                function (user) {
                    console.log('one')
                    let tr = $('tbody tr')
                        .append('td').text(user.id)
                        .append('td').text(user.firstName)
                        .append('td').text(user.lastName)
                        .append('td').text(user.email + user.id)
                    myTab.append(tr)
                }
            )
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