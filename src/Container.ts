import AliasDefinition from './definition/AliasDefinition';
import BindDefinition from './definition/BindDefinition';
import FactoryDefinition from './definition/FactoryDefinition';
import ValueDefinition from './definition/ValueDefinition';
import { IDefinition, IDependency, IInjectionPolicy, IResolver , InjectableClass, InjectableFunction, InjectionKey } from './types';

export default class Container implements IResolver {
    private _definitions: Map<InjectionKey<any>, IDefinition<any>> = new Map();

    constructor(private readonly _injectionPolicy: IInjectionPolicy) {
    }

    alias<T>(key: InjectionKey<T>, target: InjectionKey<T>): AliasDefinition<T> {
        const definition = new AliasDefinition<T>(target);

        this._definitions.set(key, definition);

        return definition;
    }

    bind<T>(key: InjectableClass<T>): BindDefinition<T> {
        const definition = new BindDefinition<T>(key);

        this._definitions.set(key, definition);

        return definition;
    }

    factory<T>(key: InjectionKey<T>, factory: InjectableFunction<T>): FactoryDefinition<T> {
        const definition = new FactoryDefinition<T>(factory);

        this._definitions.set(key, definition);

        return definition;
    }

    set<T>(key: InjectionKey<T>, value: T): ValueDefinition<T> {
        const definition = new ValueDefinition<T>(value);

        this._definitions.set(key, definition);

        return definition;
    }

    resolve<T>(key: InjectionKey<T>): IDependency<T> {
        let definition: IDefinition<T>;

        if (this._definitions.has(key)) {
            definition = this._definitions.get(key) as IDefinition<T>;
        } else {
            if (typeof key !== 'function') {
                throw new Error(`Cannot resolve the dependencies for "${toReadableKey(key)}"`);
            }
            definition = new BindDefinition(key);
        }

        try {
            return definition.resolveBy(this, this._injectionPolicy);
        } catch (e) {
            e.message = `Error while resolving the key "${toReadableKey(key)}".\nCaused by: ${e.message}`;
            throw e;
        }
    }

    get<T>(key: InjectionKey<T>): T {
        return this.resolve(key).get();
    }

    has<T>(key: InjectionKey<T>): boolean {
        return this._definitions.has(key) || (typeof key === 'function' && this._injectionPolicy.isInjectable(key));
    }
}

function toReadableKey(key: InjectionKey<any>): string {
    if (typeof key === 'string') {
        return key;
    }
    if (typeof key === 'function') {
        return key.name !== '' ? key.name : '(anonymouse function)';
    }
    return key.toString();
}
