import { InferPromise, MaybePromise } from "src/types";

function* handleFilter<T>(
  func: (value: T) => MaybePromise<boolean>,
  iterable: Iterable<T>
): IterableIterator<MaybePromise<T>> {
  for (let value of iterable) {
    if (value instanceof Promise) {
      yield value.then(async function (v) {
        if (await func(v)) return v;
      }) as Promise<T>;
    } else {
      const res = func(value as T);
      if (res instanceof Promise) {
        yield res.then((v) => {
          if (v) return value;
        }) as Promise<T>;
      } else if (res) yield value as T;
    }
  }
}

export function filter<T>(
  func: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

export function filter<T extends Promise<any>>(
  func: (value: InferPromise<T>) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

export function filter<T>(
  func: (value: T) => Promise<boolean>,
  iterable: Iterable<T>
): IterableIterator<Promise<T>>;

export function filter<T>(
  func: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

export function filter<T extends Promise<any>>(
  func: (value: InferPromise<T>) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

export function filter<T>(
  func: (value: InferPromise<T>) => Promise<boolean>
): (iterable: Iterable<T>) => IterableIterator<Promise<T>>;

export function filter<T>(
  func: (value: T) => MaybePromise<boolean>,
  iterable?: Iterable<T>
) {
  if (iterable === undefined) {
    return (iterable: Iterable<T>) => filter(func as any, iterable);
  }

  return handleFilter(func, iterable);
}
