import { filter } from ".";

const underTwo = (number: number) => number < 2;

const syncTestValue = [0, 1, 2, 3, 4];

const asyncTestValue = [
  Promise.resolve(0),
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
];

describe("fp/filter", () => {
  describe("sync", () => {
    it("should handle sync values", () => {
      const result = [];
      for (const value of filter(underTwo, syncTestValue)) {
        result.push(value);
      }
      expect(result).toEqual([0, 1]);
    });

    it("could be curried", () => {
      const result = [];
      for (const value of filter(underTwo)(syncTestValue)) {
        result.push(value);
      }
      expect(result).toEqual([0, 1]);
    });
  });

  describe("async", () => {
    it("should handle async values", async () => {
      const result = [];
      for await (const value of filter(underTwo, asyncTestValue)) {
        result.push(value);
      }
      expect(result).toEqual([0, 1]);
    });

    it("should handle async callback", async () => {
      const promiseTestFunction = (value: number) => {
        return Promise.resolve(value < 2);
      };

      const result = [];
      for await (const value of filter(promiseTestFunction, syncTestValue)) {
        result.push(value);
      }

      expect(result).toEqual([0, 1]);
    });

    it("should be run concurrently", async () => {
      const testFunction = (value: number) => {
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            resolve(underTwo(value));
          }, 500);
        });
      };

      const result = await Promise.all(filter(testFunction, syncTestValue));
      expect(result).toEqual([0, 1]);
    }, 650);
  });
});
