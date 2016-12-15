import * as assert from 'assert';
import prototype from '../../src/scope/prototype';

describe('prototype()', () => {
    it('instantiates the object each time', () => {
        class Foo {
        }

        const instantiable = {
            injectable: Foo,
            instantiate() { return new Foo(); },
        };

        assert(prototype(instantiable) instanceof Foo);
        assert.notStrictEqual(prototype(instantiable), prototype(instantiable));
    });
});

