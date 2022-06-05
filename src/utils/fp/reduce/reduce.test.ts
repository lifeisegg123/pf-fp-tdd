import { reduce } from ".";

const sum = (acc: number, number: number) => acc + number;

const syncTestValue = [0, 1, 2, 3, 4];

const asyncTestValue = [
  Promise.resolve(0),
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
];

describe("fp/reduce", () => {
  describe("sync", () => {
    it("should handle sync values", () => {
      expect(reduce(sum, 0, syncTestValue)).toEqual(10);
    });

    it("could be curried", () => {
      expect(reduce(sum, 0)(syncTestValue)).toEqual(10);
    });
  });

  describe("async", () => {
    it("should handle async values", async () => {
      const res = await reduce(sum, 0, asyncTestValue);
      expect(res).toEqual(10);
    });

    it("should handle async callback", async () => {
      const promiseTestFunction = (acc: number, value: number) => {
        return Promise.resolve(sum(acc, value));
      };

      const result = await reduce(promiseTestFunction, 0, syncTestValue);
      expect(result).toEqual(10);
    });
  });
});
