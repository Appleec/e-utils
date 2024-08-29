declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R
}

declare type AnyFn = (...args: any[]) => any

declare type TargetContext = '_self' | '_blank'
