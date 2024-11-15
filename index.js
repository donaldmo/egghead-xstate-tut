const { Machine, interpret } = require('xstate');

const lit = {
    on: {
        BREAK: 'broken',
        TOGGLE: 'unlit',
    },
    exit: (context, event) => console.log('Exit state: ', event.type)
};

const unlit = {
    on: {
        BREAK: 'broken',
        TOGGLE: 'lit',
    },
};

const broken = {
    entry: 'logBroken'
};

const states = { lit, unlit, broken };

const actions = {
    logBroken: (context, event) => {
        console.log('Log broken: ', event)
    },
};

const lightBulbMachine = Machine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QBsCWUAWAXAQgV2QCMA6NLAYhwCUBRAQQGkBtABgF1FQAHAe1lSyoeAO04gAHogDMADhnEWAFgBsATgCM6lkpUB2AKwAaEAE9EAJnP6FU9VakGW51ftcBfN8bSZcBEmXIAFQB5AHFQgBkaVg4kEF5+QRExSQR1ZSliVRlFWXU5RRVbc2MzNJkWYk1FfVVzJRlzXRZ1XQ8vdGx8ImI8YQDqemZ2MQSBIVE41PVXBW1tVQNLZSNTRBl1Yn15lil6gwzbdpBvLr9e-oEgsMjokbixpMnQadmdlkX9ZdWy8ylK5TqGoyZQfFjNFjKRQeTwgYQ8CBwMSnXxEUZ8cbJKaIAC0ylKuOUc20dm2ll0dj2+mOKO6-gE6MSExSFlUlSUahaVksTh+FisW2K+gcZJc7lhtPOfTIjMxzwkiEUJTWCB5xD+LhkBgqHykNM6qJIhAATjwANZgeWPZnYhDbRTEKRs5RQxoGfSKXQE1XpYiAmq6EFSfS6ZwwtxAA */
        id: 'lightBulb',
        initial: 'unlit',
        states,
        strict: true,
    },
    {
        actions,
    }
);

const service = interpret(lightBulbMachine).start();

service.onTransition((state) => {
    if (state.changed) {
        console.log('State changed to ', state.value);
    }

    if (state.matches('broken')) {
        console.log('State is broken: ', state.value);
    }
});

service.send('TOGGLE'); // unlit -> lit
service.send('TOGGLE'); // lit -> unlit
service.send({ 'type': 'BREAK', 'location': 'office' });  // unlit -> broken
