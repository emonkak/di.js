import { IInstantiable, Injectable } from '../types';

const instances = new WeakMap<Injectable, any>();

export default function singleton<T>(instantiable: IInstantiable<T>): T {
    const injectable = instantiable.injectable;

    if (instances.has(injectable)) {
        return instances.get(injectable);
    }

    const instance = instantiable.instantiate();

    instances.set(injectable, instance);

    return instance;
}
