export type InferArray<T> = T extends Array<infer U> ? U : T;

export type LastOfArray<T> = T extends [...any, infer U] ? U : never;
