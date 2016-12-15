import * as assert from 'assert';
import Singleton from '../../src/annotation/Singleton';
import singleton from '../../src/scope/singleton';

describe('Singleton()', () => {
    it('sets the scope to an annotated class', () => {
        @Singleton
        class Foo {
            @Singleton
            foo() {
            }
        }

        assert.strictEqual((Foo as any).$scope, singleton);
        assert.strictEqual((Foo.prototype.foo as any).$scope, singleton);
    });
});

