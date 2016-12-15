import { IInstantiable } from '../types';

export default function prototypeScope<T>(instantiable: IInstantiable<T>): T {
    return instantiable.instantiate();
}
