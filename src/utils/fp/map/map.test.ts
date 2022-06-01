import { MaybePromise } from "src/types";
import { map } from ".";

const multiply2 = (number: MaybePromise<number>) =>
  number instanceof Promise ? number.then((x) => x * 2) : number * 2;

const syncTestValue = [0, 1, 2, 3, 4];

const asyncTestValue = [
  Promise.resolve(0),
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
];

describe("fp/map", () => {
  describe("sync", () => {
    it("should handle sync values", () => {
      const result = [];
      for (const value of map(multiply2, syncTestValue)) {
        result.push(value);
      }
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });

    it("could be curried", () => {
      const result = [];
      for (const value of map(multiply2)(syncTestValue)) {
        result.push(value);
      }
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });

  describe("async", () => {
    it("should handle async values", async () => {
      const result = [];
      for await (const value of map(multiply2, asyncTestValue)) {
        result.push(value);
      }
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });

    it("should handle async callback", async () => {
      const promiseTestFunction = (value: number) => {
        return Promise.resolve(value + 5);
      };

      const result = [];
      for await (const value of map(promiseTestFunction, syncTestValue)) {
        result.push(value);
      }

      expect(result).toEqual([5, 6, 7, 8, 9]);
    });

    it("should be run concurrently", async () => {
      const testFunction = (value: number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(multiply2(value));
          }, 500);
        });
      };

      const result = await Promise.all(map(testFunction, syncTestValue));
      expect(result).toEqual([0, 2, 4, 6, 8]);
    }, 550);
  });
});
