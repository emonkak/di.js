import AbstractDefinition from './AbstractDefinition';
import ClassDependency from '../dependency/ClassDependency';
import { IDependency, IInjectionPolicy, IResolver, InjectableClass } from '../types';

export default class BindDefinition<T> extends AbstractDefinition<T> {
    constructor(private _target: InjectableClass<T>) {
        super();
    }

    to(target: InjectableClass<T>): this {
        this._target = target;
        return this;
    }

    resolveBy(resolver: IResolver, injectionPolicy: IInjectionPolicy): IDependency<T> {
        if (!this._injections && !injectionPolicy.isInjectable(this._target)) {
            const name = this._target.name !== '' ? this._target.name : '(anonymouse function)';
            throw new Error(`"${name}" is not injectable.`);
        }

        const injections = this._injections || injectionPolicy.getInjections(this._target);
        const dependencies = injections.map(injection => resolver.resolve(injection));
        const scope = this._scope || injectionPolicy.getScope(this._target);
        return new ClassDependency<T>(this._target, dependencies, scope);
    }
}
