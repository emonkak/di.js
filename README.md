# @emonkak/di

[![Build Status](https://travis-ci.org/emonkak/js-di.svg?branch=master)](https://travis-ci.org/emonkak/js-di)
[![Coverage Status](https://coveralls.io/repos/emonkak/js-di/badge.svg?branch=master)](https://coveralls.io/r/emonkak/js-di?branch=master)

## Example

```typescript
import { Container, Inject, Named, Singleton, prototypeInjectionPolicy } from '@emonkak/di';

class IFoo {
    bar: IBar;
}

class IBar {
    baz: IBaz;
    qux: IQux;
    quux: any;
}

class IBaz {
    qux: IQux;
}

class IQux {}

@Inject
class Foo {
    constructor(public bar: IBar) {
    }
}

@Inject
class Bar {
    constructor(public baz: IBaz, public qux: IQux, @Named('quux') public quux: any) {
    }
}

@Inject
class Baz {
    constructor(public qux: IQux) {
    }
}

@Inject
@Singleton
class Qux {
    constructor() {
    }
}

const container = new Container(prototypeInjectionPolicy);
container.bind(IFoo).to(Foo);
container.bind(IBar).to(Bar);
container.bind(IBaz).to(Baz);
container.bind(IQux).to(Qux);
container.set('quux', 'quux');

const foo = container.get(Foo);

console.assert(foo instanceof Foo);
console.assert(foo.bar instanceof Bar);
console.assert(foo.bar.baz instanceof Baz);
console.assert(foo.bar.qux instanceof Qux);
console.assert(foo.bar.qux === foo.bar.baz.qux);
console.assert(foo.bar.quux === 'quux');
```
