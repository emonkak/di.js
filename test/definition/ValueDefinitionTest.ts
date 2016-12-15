import * as assert from 'assert';
import ValueDefinition from '../../src/definition/ValueDefinition';
import { IDependency, IInjectionPolicy, IResolver, InjectionKey } from '../../src/types';

describe('ValueDefinition', () => {
    describe('resolveBy()', () => {
        it('returns the object itself', () => {
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

            const definition = new ValueDefinition(123);

            assert.strictEqual(definition, definition.resolveBy(resolver, injectionPolicy));
        });
    });

    describe('get()', () => {
        it('returns the value', () => {
            const definition = new ValueDefinition(123);

            assert.strictEqual(123, definition.get());
        });
    });
});
