# di.js

[![Build Status](https://travis-ci.org/emonkak/di.js.svg?branch=master)](https://travis-ci.org/emonkak/di.js)
[![Coverage Status](https://coveralls.io/repos/emonkak/di.js/badge.svg?branch=master&service=github)](https://coveralls.io/github/emonkak/di.js?branch=master)

## Example

```javascript
import {Injector, singletonScope} from '@emonkak/di'

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

const injector = new Injector()
    .define(Foo, [Bar, Baz], fooFactory)
    .defineClass(Bar, [Qux, Quux])
    .defineClass(Baz, [Qux, Quux])
    .defineClass(Qux, [], singletonScope)
    .defineClass(Quux, [])

// Resolves the dependencies for 'Foo'
injector.resolve(Foo)
```
