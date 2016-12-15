import { IScope } from '../types';

export default function Scope(scope: IScope) {
    return (target: any, key?: string): any => {
        if (typeof key !== 'undefined') {
            target[key].$scope = scope;
            return target[key];
        } else {
            target.$scope = scope;
            return target;
        }
    };
}
