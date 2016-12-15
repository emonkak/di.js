import * as assert from 'assert';
import Scope from '../../src/annotation/Scope';
import prototype from '../../src/scope/prototype';
import singleton from '../../src/scope/singleton';

describe('Scope()', () => {
    it('sets the scope to an annotated class', () => {
        @Scope(prototype)
        class Foo {
            @Scope(prototype)
            foo() {
            }
        }

        @Scope(singleton)
        class Bar {
            @Scope(singleton)
            bar() {
            }
        }

        assert.strictEqual((Foo as any).$scope, prototype);
        assert.strictEqual((Foo.prototype.foo as any).$scope, prototype);
        assert.strictEqual((Bar as any).$scope, singleton);
        assert.strictEqual((Bar.prototype.bar as any).$scope, singleton);
    });
});

