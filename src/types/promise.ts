export type MaybePromise<T> = Promise<T> | T;

export type InferPromise<T> = T extends Promise<infer U> ? U : T;
