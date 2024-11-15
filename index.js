const { Machine, interpret } = require('xstate')

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

const broken = { type: 'final' }

const states = { lit, unlit, broken }

const config = {
    id: 'lightBulb',
    initial: 'unlit',
    states,
    strict: true
}

const lightBulbMachine = Machine({
    id: 'lightBulb',
    initial: 'unlit',
    states,
    strict: true
})

const service = interpret(
    lightBulbMachine
).start()

service.onTransition(state => {

    if (state.changed) {
        console.log('State changed: ', state.value)
    }

    if (state.matches('broken')) {
        console.log('State is broken: ', state.value)
    }
})

service.send('TOGGLE')
service.send('TOGGLE')
service.send('BREAK')

