import * as assert from 'assert';
import Prototype from '../../src/annotation/Prototype';
import prototype from '../../src/scope/prototype';

describe('Prototype()', () => {
    it('sets the scope to an annotated class', () => {
        @Prototype
        class Foo {
            @Prototype
            foo() {
            }
        }

        assert.strictEqual((Foo as any).$scope, prototype);
        assert.strictEqual((Foo.prototype.foo as any).$scope, prototype);
    });
});


