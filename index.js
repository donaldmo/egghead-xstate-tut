const { Machine } = require('xstate')

const lit = {
    on: {
        BREAK: 'broken',
        TOGGLE: 'unlit'
    }
}

const unlit = {
    on: {
        BREAK: 'broken',
        TOGGLE: 'lit'
    }
}

const broken = {
    type: 'final'
}

const states = { lit, unlit, broken }

const initial = 'unlit'

const config = {
    id: 'lightBulb',
    initial,
    states,
    strict: true
}

const lightBulbMachine = Machine(config)

// console.log(lightBulbMachine.transition('unlit', 'TOGGLE').value)
// console.log(lightBulbMachine.transition('lit', 'TOGGLE').value)
// console.log(lightBulbMachine.transition('broken', 'TOGGLE').value)
// console.log(lightBulbMachine.transition('foo', 'TOGGLE').value)
console.log(lightBulbMachine.transition('lit', 'FOO').value)