import * as assert from 'assert';
import AliasDefinition from '../../src/definition/AliasDefinition';
import { IDependency, IInjectionPolicy, IResolver, InjectionKey } from '../../src/types';

describe('AliasDefinition', () => {
    describe('resolveBy()', () => {
        it('delegates the resolving to a resolver', () => {
            const dependency: IDependency<{}> = {
                get() {
                    return null as any;
                }
            };

            const resolver: IResolver = {
                resolve(target: InjectionKey<any>): IDependency<any> {
                    return dependency;
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
                    return true;
                },
            };

            const definition = new AliasDefinition('alias');
            assert.strictEqual(dependency, definition.resolveBy(resolver, injectionPolicy));
        });
    });
});
