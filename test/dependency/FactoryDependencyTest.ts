import * as assert from 'assert';
import FactoryDependency from '../../src/dependency/FactoryDependency';
import { IInstantiable, IScope } from '../../src/types';

describe('FactoryDependency', () => {
    describe('get injectable()', () => {
        it('returns a factory', () => {
            class Foo {
            }

            const fooFactory = () => new Foo();

            const scope: IScope = function<T>(instantiable: IInstantiable<T>): T {
                return instantiable.instantiate();
            };

            assert.strictEqual(fooFactory, new FactoryDependency(fooFactory, [], scope).injectable);
        });
    });

    describe('get()', () => {
        it('instantiates a target', () => {
            class Foo {
            }
            class Bar {
                constructor(public foo: Foo) {
                }
            }
            class Baz {
                constructor(public bar: Bar) {
                }
            }

            const scope: IScope = function<T>(instantiable: IInstantiable<T>): T {
                return instantiable.instantiate();
            };

            const fooDependency = new FactoryDependency(() => new Foo(), [], scope);
            const barDependency = new FactoryDependency((foo: Foo) => new Bar(foo), [fooDependency], scope);
            const bazDependency = new FactoryDependency((bar: Bar) => new Baz(bar), [barDependency], scope);

            assert.deepStrictEqual(new Baz(new Bar(new Foo())), bazDependency.get());
        });
    });

    it('throws exception if a target is not function', () => {
        const scope: IScope = function<T>(instantiable: IInstantiable<T>): T {
            return instantiable.instantiate();
        };

        assert.throws(() => new FactoryDependency(null as any, [], scope));
    });
});
