import { IDependency, IInstantiable, IScope, Injectable, InjectableFunction } from '../types';

export default class FactoryDependency<T> implements IDependency<T>, IInstantiable<T> {
    constructor(private readonly _factory: InjectableFunction<T>,
                private readonly _dependencies: IDependency<any>[],
                private readonly _scope: IScope) {
        if (typeof _factory !== 'function') {
            throw new Error(`"The factory must be a function, got "${typeof _factory}".`);
        }
    }

    get injectable(): Injectable {
        return this._factory;
    }

    get(): T {
        return this._scope(this);
    }

    instantiate(): T {
        const args = this._dependencies.map(dependency => dependency.get());
        return this._factory(...args);
    }
}

