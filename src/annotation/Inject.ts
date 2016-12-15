import 'reflect-metadata';

export default function Inject(target: any, key?: any): any {
    if (typeof key !== 'undefined') {
        target[key].$inject = merge(
            Reflect.getMetadata('design:paramtypes', target, key),
            target[key].$inject || []
        );
        return target[key];
    } else {
        target.$inject = merge(
            Reflect.getMetadata('design:paramtypes', target),
            target.$inject || []
        );
        return target;
    }
}

function merge<T>(xs: T[], ys: T[]): T[] {
    const zs = [];
    for (let i = 0, l = Math.max(xs.length, ys.length); i < l; i++) {
        zs[i] = ys[i] || xs[i];
    }
    return zs;
}
