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

describe("fp/pipe", () => {
  describe("sync", () => {
    it("should handle sync values", () => {
      expect(
        pipe(
          syncTestValue,
          filter((v) => v % 2 === 0),
          map((v) => v * 2)
        )
      ).toEqual([0, 4, 8]);
    });

    it("could be curried", () => {
      expect(
        pipe<number>(
          filter((v) => v % 2 === 0),
          map((v) => v * 2)
        )(syncTestValue)
      ).toEqual([0, 4, 8]);
    });
  });

  describe("async", () => {
    it("should handle async values", async () => {
      const res = await pipe(
        asyncTestValue,
        filter((v) => v % 2 === 0),
        map((v) => v * 2)
      );
      expect(res).toEqual([0, 4, 8]);
    });

    it("should handle async callback", async () => {
      const promiseTestFunction = (arr: number[]) => {
        return Promise.resolve(map((v) => v * 2, arr));
      };

      const result = await pipe(syncTestValue, promiseTestFunction);
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });
});
