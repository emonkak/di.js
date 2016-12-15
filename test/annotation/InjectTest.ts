import * as assert from 'assert';
import Inject from '../../src/annotation/Inject';

describe('Inject()', () => {
    it('sets the injection to an annotated class', () => {
        @Inject
        class Foo {
            constructor() {
            }
        }

        @Inject
        class Bar {
            constructor(foo: Foo) {
            }
        }

        @Inject
        class Baz {
            constructor(foo: Foo, Bar: Bar) {
            }
        }

        @Inject
        class Foobar {
            static $inject: any = [null, null, 'qux'];

            constructor(foo: Foo, bar: Bar, qux: any) {
            }
        }

        assert.deepStrictEqual((Foo as any).$inject, []);
        assert.deepStrictEqual((Bar as any).$inject, [Foo]);
        assert.deepStrictEqual((Baz as any).$inject, [Foo, Bar]);
        assert.deepStrictEqual((Foobar as any).$inject, [Foo, Bar, 'qux']);
    });

    it('injects the dependencies to an annotated method', () => {
        @Inject
        class Foo {
            constructor() {
            }
        }

        @Inject
        class Bar {
            constructor(foo: Foo) {
            }
        }

        @Inject
        class Baz {
            @Inject
            inject(foo: Foo, bar: Bar) {
            }
        }

        assert.deepStrictEqual((Baz.prototype.inject as any).$inject, [Foo, Bar]);
    });
});
