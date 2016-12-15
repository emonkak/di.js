import { IDependency, IInstantiable, IScope, Injectable, InjectableClass } from '../types';

export default class ClassDependency<T> implements IDependency<T>, IInstantiable<T> {
    constructor(private readonly _target: InjectableClass<T>,
                private readonly _dependencies: IDependency<any>[],
                private readonly _scope: IScope) {
        if (typeof _target !== 'function') {
            throw new Error(`"The class must be a function, got "${typeof _target}".`);
        }
    }

    get injectable(): Injectable {
        return this._target;
    }

    get(): T {
        return this._scope(this);
    }

    instantiate(): T {
        const args = this._dependencies.map(dependency => dependency.get());
        return new this._target(...args);
    }
}
