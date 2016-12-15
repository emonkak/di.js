import { IDefinition, IDependency, IInjectionPolicy, IResolver, InjectionKey } from '../types';

export default class AliasDefinition<T> implements IDefinition<T> {
    constructor(private readonly _target: InjectionKey<T>) {
    }

    resolveBy(resolver: IResolver, injectionPolicy: IInjectionPolicy): IDependency<T> {
        return resolver.resolve(this._target);
    }
}
