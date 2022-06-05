import { check, checks } from "src/types";

import { reduce } from ".";

const sum = (acc: number, number: number) => acc + number;

const promiseTestFunction = (acc: number, value: number) => {
  return Promise.resolve(sum(acc, value));
};

const syncTestValue = [0, 1, 2, 3, 4];

const asyncTestValue = [
  Promise.resolve(0),
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
];

const res1 = reduce(sum, 0, syncTestValue);
const res2 = reduce(sum, 0)(syncTestValue);

const res3 = reduce(sum, 0, asyncTestValue);
const res4 = reduce(promiseTestFunction, 0, syncTestValue);

checks([
  check<typeof res1, number>(),
  check<typeof res2, number>(),

  check<typeof res3, Promise<number>>(),
  check<typeof res4, Promise<number>>(),
]);
