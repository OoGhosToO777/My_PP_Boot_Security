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
const person = {
    name: 'Oleg',
    age: 42,
    isProgrammer: true
}

const logger = {
    keys() {
        console.log('Object Keys: ', Object.keys(this))
    }
}

const bound = logger.keys.bind(person)
bound()

logger.keys.call(person)