import AbstractDefinition from './AbstractDefinition';
import FactoryDependency from '../dependency/FactoryDependency';
import { IDependency, IInjectionPolicy, IResolver, InjectableFunction } from '../types';

export default class FactoryDefinition<T> extends AbstractDefinition<T> {
    constructor(private readonly _factory: InjectableFunction<T>) {
        super();
    }

    resolveBy(resolver: IResolver, injectionPolicy: IInjectionPolicy): IDependency<T> {
        if (!this._injections && !injectionPolicy.isInjectable(this._factory)) {
            const name = this._factory.name !== '' ? this._factory.name : '(anonymouse function)';
            throw new Error(`"${name}" is not injectable.`);
        }

        const injections = this._injections || injectionPolicy.getInjections(this._factory);
        const dependencies = injections.map(injection => resolver.resolve(injection));
        const scope = this._scope || injectionPolicy.getScope(this._factory);
        return new FactoryDependency<T>(this._factory, dependencies, scope);
    }
}
