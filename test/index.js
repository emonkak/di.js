var expect = require('expect.js')
var Injector = require('../lib/injector')
var singletonScope = require('../lib/singleton-scope')

describe('Injector', function() {
    function Foo(bar, baz) {
        this.bar = bar
        this.baz = baz
    }

    function Bar(qux, quux) {
        this.qux = qux
        this.quux = quux
    }

    function Baz(qux, quux) {
        this.qux = qux
        this.quux = quux
    }

    function Qux() {}

    function Quux() {}

    function fooFactory(bar, baz) {
        return new Foo(bar, baz)
    }

    var injector = new Injector()
        .define(Foo, [Bar, Baz], fooFactory)
        .defineClass(Bar, [Qux, Quux])
        .defineClass(Baz, [Qux, Quux])
        .defineClass(Qux, [], singletonScope)
        .defineClass(Quux, [])

    it('should be resolved dependencies', function() {
        var foo = injector.resolve(Foo)

        expect(foo).to.be.a(Foo)
        expect(foo.bar).to.be.a(Bar)
        expect(foo.bar.qux).to.be.a(Qux)
        expect(foo.bar.quux).to.be.a(Quux)
        expect(foo.baz).to.be.a(Baz)
        expect(foo.baz.qux).to.be.a(Qux)
        expect(foo.baz.quux).to.be.a(Quux)

        expect(foo.bar.qux).to.be(foo.baz.qux)
        expect(foo.bar.quux).not.to.be(foo.baz.quux)

        expect(foo.bar.qux).to.be(injector.resolve(Qux))
        expect(foo.bar.quux).not.to.be(injector.resolve(Quux))
    })
})
