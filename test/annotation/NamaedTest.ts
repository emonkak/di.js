import * as assert from 'assert';
import Named from '../../src/annotation/Named';

describe('Named()', () => {
    it('sets the injection to an annotated parameter', () => {
        class Foo {
            constructor() {
            }
        }
        class Bar {
            static $inject = [Foo];

            constructor(foo: Foo, @Named('bar') bar: any) {
            }
        }

        assert.deepStrictEqual((Bar as any).$inject, [Foo, 'bar']);
    });
});
