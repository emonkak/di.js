import * as assert from 'assert';
import { Container, Inject, Named, Singleton, prototypeInjectionPolicy } from '../src/';

class IFoo {}
class IBar {}
class IBaz {}

@Inject
class Foo implements IFoo {
}

@Inject
class Bar implements IBar {
    constructor(public foo: IFoo) {
    }
}

@Inject
@Singleton
class Baz implements IBaz {
    constructor(public bar: IBar, @Named('qux') public qux: any, @Named('quux') public quux: any) {
    }
}

@Inject
class Qux {
    constructor() {
    }
}

class Quux {
    constructor(public foo: IFoo) {
    }
}

describe('Container', () => {
    const container = new Container(prototypeInjectionPolicy);

    container.factory(IFoo, () => new Foo());
    container.bind(IBar).to(Bar);
    container.bind(IBaz).to(Baz);
    container.alias('qux', Qux);
    container.set('quux', new Quux(new Foo()));

    describe('get()', () => {
        it('resolves the dependencies for a key and instantiate the dependency', () => {
            const expected = new Baz(new Bar(new Foo()), new Qux(), new Quux(new Foo()));

            assert.deepStrictEqual(expected, container.get(IBaz));
            assert.strictEqual(container.get(IBaz), container.get(IBaz));
        });

        it('throws exception if a key can not be resolved', () => {
            assert.throws(() => container.get(''));
            assert.throws(() => container.get(class { constructor(foo: any) {} }));
            assert.throws(() => container.get(Symbol()));
            assert.throws(() => container.get(Quux));
        });
    });

    describe('has()', () => {
        it('returns whether a key is injectable', () => {
            assert.strictEqual(true, container.has(IFoo));
            assert.strictEqual(true, container.has(IBar));
            assert.strictEqual(true, container.has(IBaz));
            assert.strictEqual(true, container.has(Foo));
            assert.strictEqual(true, container.has(Bar));
            assert.strictEqual(true, container.has(Baz));
            assert.strictEqual(true, container.has(Qux));
            assert.strictEqual(false, container.has(Quux));
            assert.strictEqual(true, container.has('qux'));
            assert.strictEqual(true, container.has('quux'));
            assert.strictEqual(false, container.has(Object));
        });
    });
});
