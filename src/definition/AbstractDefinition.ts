import { IDefinition, IDependency, IInjectionPolicy, IResolver, IScope, InjectionKey } from '../types';

abstract class AbstractDefinition<T> implements IDefinition<T> {
    protected _injections: InjectionKey<any>[];

    protected _scope: IScope;

    in(scope: IScope): this {
        this._scope = scope;
        return this;
    }

    with(..._injections: InjectionKey<any>[]): this {
        this._injections = _injections;
        return this;
    }

    abstract resolveBy(resolver: IResolver, injectionPolicy: IInjectionPolicy): IDependency<T>;
}

export default AbstractDefinition;
