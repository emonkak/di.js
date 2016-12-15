import Container from './Container';
import Inject from './annotation/Inject';
import InjectionPolicy from './injectionPolicy/InjectionPolicy';
import Named from './annotation/Named';
import Prototype from './annotation/Prototype';
import Singleton from './annotation/Singleton';
import prototype from './scope/prototype';
import singleton from './scope/singleton';

const prototypeInjectionPolicy = new InjectionPolicy(prototype);

const singletonInjectionPolicy = new InjectionPolicy(singleton);

export {
    Container,
    Inject,
    Named,
    Prototype,
    Singleton,
    prototypeInjectionPolicy,
    singletonInjectionPolicy
};
