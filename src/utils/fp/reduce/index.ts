import { InferPromise, MaybePromise } from "src/types";

const async = async <T, A, R = A>(
  acc: MaybePromise<A>,
  value: MaybePromise<T>,
  func: (acc: A, value: T) => R
) => {
  return func(await acc, await value);
};

export function reduce<T, A, R = A>(
  func: (acc: A, value: T) => R,
  acc: A,
  iter: Iterable<T>
): R;

export function reduce<T extends Promise<any>, A, R = A>(
  func: (acc: A, value: InferPromise<T>) => R,
  acc: A,
  iter: Iterable<T>
): Promise<R>;

export function reduce<T, A, R = A>(
  func: (acc: A, value: T) => R,
  acc: A
): (iter: Iterable<T>) => R;

export function reduce<T extends Promise<any>, A, R = A>(
  func: (acc: A, value: InferPromise<T>) => R,
  acc: A
): (iter: Iterable<T>) => Promise<R>;

export function reduce<T, A, R = A>(
  func: (acc: A, value: T) => MaybePromise<R>,
  acc: A,
  iter?: Iterable<T>
) {
  if (!iter) return (iterable: Iterable<T>) => reduce(func, acc, iterable);

  let res = acc as any;
  for (let value of iter) {
    if (value instanceof Promise || res instanceof Promise) {
      res = async(res, value, func);
    } else {
      res = func(res, value);
    }
  }
  return res as R;
}
