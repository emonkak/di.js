var prototypeScope = require('./prototype-scope')

/**
 * @class
 */
function Injector() {
    this._definitions = new Map()
}

/**
 * Defines a dependency definition with any factory.
 *
 * @param {Object}         target
 * @param {Array.<Object>} deps
 * @param {?Function}      factory
 * @param {?Function}      scope
 */
Injector.prototype.define = function(target, deps, factory, scope) {
    this._definitions.set(target, {
        target: target,
        deps: deps,
        factory: factory,
        scope: (scope || prototypeScope)()
    })
    return this
}

/**
 * Defines a dependency definition with a class.
 *
 * @param {Object}         target
 * @param {Array.<Object>} deps
 * @param {?Function}      scope
 */
Injector.prototype.defineClass = function(target, deps, scope) {
    function classFactory() {
        var instance = Object.create(target.prototype)
        target.apply(instance, arguments)
        return instance
    }

    return this.define(target, deps, classFactory, scope)
}

/**
 * Resolves the dependencies for given object.
 *
 * @param {Object} target
 * @return {Object}
 */
Injector.prototype.resolve = function(target) {
    if (!this._definitions.has(target)) {
        throw "Can't resolve dependencies because the definition for given object is not registered: " + target
    }

    var definition = this._definitions.get(target)

    return definition.scope(this, definition)
}

module.exports = Injector
