function inject(injector, definition) {
    var args = definition.deps.map(injector.resolve, injector)
    return definition.factory.apply(null, args)
}

module.exports = inject
