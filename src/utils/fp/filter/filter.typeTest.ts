import { check, checks } from "src/types";

import { filter } from ".";

const underTwo = (number: number) => number < 2;
const promiseTestFunction = (value: number) => {
  return Promise.resolve(value < 2);
};

const syncTestValue = [0, 1, 2, 3, 4];

const asyncTestValue = [
  Promise.resolve(0),
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
];

const res1 = filter(underTwo, syncTestValue);
const res2 = filter(underTwo)(syncTestValue);

const res3 = filter(underTwo, asyncTestValue);
const res4 = filter(promiseTestFunction, syncTestValue);

checks([
  check<typeof res1, IterableIterator<number>>(),
  check<typeof res2, IterableIterator<number>>(),

  check<typeof res3, IterableIterator<Promise<number>>>(),
  check<typeof res4, IterableIterator<Promise<number>>>(),
]);
