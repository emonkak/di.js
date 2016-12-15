export type InjectionKey<T> = InjectableClass<T> | string | symbol;

export interface Injectable extends Function {
    $inject?: InjectionKey<any>[];
    $scope?: IScope;
}

export interface InjectableClass<T> extends Injectable {
    new(...args: any[]): T;
}

export interface InjectablePrototype<T> extends Injectable {
    new(...args: any[]): T;
}

export interface InjectableFunction<T> extends Injectable {
    (...args: any[]): T;
}

export interface IResolver {
    resolve<T>(key: InjectionKey<T>): IDependency<T>;
}

export interface IInjectionPolicy {
    getInjections(target: Injectable): InjectionKey<any>[];

    getScope(target: Injectable): IScope;

    isInjectable(target: Injectable): boolean;
}

export interface IScope {
    <T>(instantiable: IInstantiable<T>): T;
}

export interface IDefinition<T> {
    resolveBy(resolver: IResolver, injectionPolicy: IInjectionPolicy): IDependency<T>;
}

export interface IDependency<T> {
    get(): T;
}

export interface IInstantiable<T> {
    readonly injectable: Injectable;

    instantiate(): T;
}
