import * as assert from 'assert';
import singleton from '../../src/scope/singleton';

describe('singleton()', () => {
    it('instantiates the object just once', () => {
        class Foo {
        }

        const instantiable = {
            injectable: Foo,
            instantiate() { return new Foo(); },
        };

        assert(singleton(instantiable) instanceof Foo);
        assert.strictEqual(singleton(instantiable), singleton(instantiable));
    });
});


