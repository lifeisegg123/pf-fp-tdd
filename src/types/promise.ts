export type MaybePromise<T> = Promise<T> | T;

export type InferPromise<T> = T extends Promise<infer U> ? U : T;

export type ReturnPromise<T, R> = T extends Promise<any> ? Promise<R> : R;
