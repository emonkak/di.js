import { Injectable, IInjectionPolicy, IScope, InjectionKey } from '../types';

export default class InjectionPolicy implements IInjectionPolicy {
    constructor(private readonly _defaultScope: IScope) {
    }

    getInjections(target: Injectable): InjectionKey<any>[] {
        return target.$inject || [];
    }

    getScope(target: Injectable): IScope {
        return target.$scope || this._defaultScope;
    }

    isInjectable(target: Injectable): boolean {
        return (target.$inject ? target.$inject.length : 0) === target.length;
    }
}
