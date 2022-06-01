import { InferPromise, MaybePromise } from "src/types";

function* handleMap<T, R>(
  func: (value: T) => MaybePromise<R>,
  iterable: Iterable<T>
): IterableIterator<MaybePromise<R>> {
  for (const value of iterable) {
    if (value instanceof Promise) {
      yield value.then(async (v) => {
        return func(v);
      });
    } else {
      yield func(value);
    }
  }
}

export function map<T, R>(
  func: (value: T) => R,
  iterable: Iterable<T>
): IterableIterator<R>;

export function map<T extends Promise<any>, R>(
  func: (value: InferPromise<T>) => R,
  iterable: Iterable<T>
): IterableIterator<Promise<R>>;

export function map<T, R>(
  func: (value: InferPromise<T>) => R
): (iterable: Iterable<T>) => IterableIterator<R>;

export function map<T extends Promise<any>, R>(
  func: (value: InferPromise<T>) => R
): (iterable: Iterable<T>) => IterableIterator<Promise<R>>;

export function map<T, R>(func: (value: T) => R, iterable?: Iterable<T>) {
  if (iterable === undefined)
    return (iterable: Iterable<T>) => map(func, iterable as any);

  return handleMap(func, iterable);
}
