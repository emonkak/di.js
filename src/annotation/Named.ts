import { InjectionKey } from '../types';

export default function Named(key: InjectionKey<any>) {
    return (target: any, propertyKey: string | symbol, parameterIndex: number): any => {
        target.$inject = target.$inject || new Array(target.length);
        target.$inject[parameterIndex] = key;
        return target;
    };
}
