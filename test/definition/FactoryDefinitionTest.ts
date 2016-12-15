import * as assert from 'assert';
import FactoryDefinition from '../../src/definition/FactoryDefinition';
import { IDependency, IInjectionPolicy, IInstantiable, IResolver, IScope, InjectionKey } from '../../src/types';

describe('FactoryDefinition', () => {
    describe('resolveBy()', () => {
        it('resolves the dependency of a target', () => {
            class Foo {
            }
            class Bar {
            }
            class Baz {
                constructor(public foo: Foo, public bar: Bar) {
                }
            }

            const factory = function(foo: Foo, bar: Bar): Baz {
               return new Baz(foo, bar);
            };

            const expected = new Baz(new Foo(), new Bar);

            const fooDependency: IDependency<Foo> = {
                get() {
                    return new Foo();
                }
            };
            const barDependency: IDependency<Bar> = {
                get() {
                    return new Bar();
                }
            };

            const resolver: IResolver = {
                resolve(target: InjectionKey<any>): IDependency<any> {
                    if (target === Foo) {
                        return fooDependency;
                    }
                    if (target === Bar) {
                        return barDependency;
                    }
                    return null as any;
                }
            };

            const prototype: IScope = <T>(instantiable: IInstantiable<T>) => {
                return instantiable.instantiate();
            };
            const singleton: IScope = <T>(instantiable: IInstantiable<T>) => {
                return expected as any;
            };

            const injectionPolicy: IInjectionPolicy = {
                getInjections(target) {
                    return target.$inject || [];
                },

                getScope(target) {
                    return prototype;
                },

                isInjectable(target) {
                    return true;
                },
            };

            assert.deepEqual(
                expected,
                new FactoryDefinition(factory)
                    .with(Foo, Bar)
                    .resolveBy(resolver, injectionPolicy)
                    .get()
            );
            assert.strictEqual(
                expected,
                new FactoryDefinition(factory)
                    .with(Foo, Bar)
                    .in(singleton)
                    .resolveBy(resolver, injectionPolicy)
                    .get()
            );
        });

        it('throws the exception if a target is not injectable', () => {
            const resolver: IResolver = {
                resolve(target: InjectionKey<any>): IDependency<any> {
                    return null as any;
                }
            };

            const injectionPolicy: IInjectionPolicy = {
                getInjections(target) {
                    return [];
                },

                getScope(target) {
                    return null as any;
                },

                isInjectable(target) {
                    return false;
                },
            };

            assert.throws(() => new FactoryDefinition(function() {}).resolveBy(resolver, injectionPolicy));
        });
    });
});
