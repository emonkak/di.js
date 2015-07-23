var inject = require('./inject')

function singletonScope() {
    var instance = null

    return function getInstance(injector, definition) {
        return instance = instance || inject(injector, definition)
    }
}

module.exports = singletonScope
