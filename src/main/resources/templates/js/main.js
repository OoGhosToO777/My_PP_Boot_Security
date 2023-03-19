// alert('lolkek')


/*

let test = 12
const kek = 22
const name = 'Oleg'
const age = 20
const output = 'My name is ' + name + ' and i am a ' + age + ' years old.'
const output_good = `My name is ${name} and i am a ${age} years old.`
console.log(output);
console.log(output_good);

function createMember(name) {
    return function(lastName) {
        console.log(name + lastName)
    }
}

const logWithLastName =  createMember('Vladilen')
console.log(logWithLastName)

console.log(logWithLastName('Minin'))
*/

const cars = ['Lexus', 'BMW', 'Mercedes', 'Ford']

console.log(cars)


const text = 'Oh shit, here we go again.'

const reverseText = text.split('').reverse().join('') // split - Делит строчку на символы и преображает в массив. Мы задаем по какому символу делить.  В нашем примере это ничего. .join() - преобразовывает массив в строку
console.log(reverseText);