function* handleMap<T, R>(
  func: (value: T) => R,
  iterable: Iterable<T>
): IterableIterator<R> {
  for (const value of iterable) {
    yield func(value);
  }
}

export function map<T, R>(
  func: (value: T) => R,
  iterable: Iterable<T>
): IterableIterator<R>;

export function map<T, R>(
  func: (value: T) => R
): (iterable: Iterable<T>) => IterableIterator<R>;

export function map<T, R>(func: (value: T) => R, iterable?: Iterable<T>) {
  if (iterable === undefined)
    return (iterable: Iterable<T>) => map(func, iterable);

  return handleMap(func, iterable);
}
