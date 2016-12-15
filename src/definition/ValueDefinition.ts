import { IDefinition, IDependency, IInjectionPolicy, IResolver } from '../types';

export default class ValueDefinition<T> implements IDefinition<T>, IDependency<T> {
    constructor(private readonly _value: T) {
    }

    resolveBy(resolver: IResolver, injectionPolicy: IInjectionPolicy): IDependency<T> {
        return this;
    }

    get(): T {
        return this._value;
    }
}
