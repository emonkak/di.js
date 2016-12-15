import * as assert from 'assert';
import ClassDependency from '../../src/dependency/ClassDependency';
import { IInstantiable, IScope } from '../../src/types';

describe('ClassDependency', () => {
    describe('get injectable()', () => {
        it('returns a target', () => {
            class Foo {
            }

            const scope: IScope = function<T>(instantiable: IInstantiable<T>): T {
                return instantiable.instantiate();
            };

            assert.strictEqual(Foo, new ClassDependency(Foo, [], scope).injectable);
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

            const fooDependency = new ClassDependency(Foo, [], scope);
            const barDependency = new ClassDependency(Bar, [fooDependency], scope);
            const bazDependency = new ClassDependency(Baz, [barDependency], scope);

            assert.deepStrictEqual(new Baz(new Bar(new Foo())), bazDependency.get());
        });
    });

    it('throws exception if a target is not function', () => {
        const scope: IScope = function<T>(instantiable: IInstantiable<T>): T {
            return instantiable.instantiate();
        };

        assert.throws(() => new ClassDependency(null as any, [], scope));
    });
});
