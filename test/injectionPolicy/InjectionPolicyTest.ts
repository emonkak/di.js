import * as assert from 'assert';
import InjectionPolicy from '../../src/injectionPolicy/InjectionPolicy';

describe('InjectionPolicy', () => {
    describe('getInjections()', () => {
        it('returns the injection keys for a target', () => {
            class Foo {
            }
            class Bar {
            }
            class Baz {
                static $inject = [Foo, Bar];

                constructor(foo: Foo, bar: Bar) {
                }
            }

            const injectionPolicy = new InjectionPolicy(function() {} as any);

            assert.deepStrictEqual(injectionPolicy.getInjections(Baz), [Foo, Bar]);
        });
    });

    describe('getScope()', () => {
        it('returns the scope for a target', () => {
            const scope1 = function() {} as any;
            const scope2 = function() {} as any;

            class Foo {
                static $scope = scope1;
            }
            class Bar {
            }

            const injectionPolicy = new InjectionPolicy(scope2);

            assert.strictEqual(injectionPolicy.getScope(Foo), scope1);
            assert.strictEqual(injectionPolicy.getScope(Bar), scope2);
        });
    });

    describe('isInjectable()', () => {
        it('determines whether a target is injectable', () => {
            class Foo {
            }
            class Bar {
                constructor(foo: Foo) {
                }
            }
            class Baz {
                static $inject = [Foo];

                constructor(foo: Foo) {
                }
            }

            const injectionPolicy = new InjectionPolicy(function() {} as any);

            assert.strictEqual(injectionPolicy.isInjectable(Foo), true);
            assert.strictEqual(injectionPolicy.isInjectable(Bar), false);
            assert.strictEqual(injectionPolicy.isInjectable(Baz), true);
        });
    });
});
