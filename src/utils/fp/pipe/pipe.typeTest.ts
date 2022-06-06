import { check, checks } from "src/types";

import { pipe } from ".";
import { filter } from "../filter";
import { map } from "../map";

const syncTestValue = [0, 1, 2, 3, 4];

const asyncTestValue = [
  Promise.resolve(0),
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
];

const res1 = pipe(
  syncTestValue,
  filter((v) => v % 2 === 0),
  map((v) => v * 2)
);

const res2 = pipe<number>(
  filter((v) => v % 2 === 0),
  map((v) => v * 2)
)(syncTestValue);

const res3 = pipe(
  asyncTestValue,
  filter((v) => v % 2 === 0),
  map((v) => v * 2)
);

const promiseTestFunction = (arr: number[]) => {
  return Promise.resolve(map((v) => v * 2, arr));
};

const res4 = pipe(syncTestValue, promiseTestFunction);

checks([
  check<typeof res1, IterableIterator<number>>(),
  check<typeof res2, IterableIterator<number>>(),

  check<typeof res3, IterableIterator<Promise<number>>>(),
  check<typeof res4, Promise<IterableIterator<number>>>(),
]);
