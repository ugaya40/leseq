import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns a sequence divided into arrays based on an accumulation function and a threshold condition.
 *
 * ```typescript
 * const result1 = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
 *   chunkByAccumulation(
 *     0,
 *     (acc, current) => acc + current,
 *     (acc) => acc <= 10
 *   )
 * ).toArray();
 *
 * // result1: [[1, 2, 3, 4], [5, 6], [7], [8], [9], [10]]
 *
 * // Example where the first value doesn't satisfy the condition
 * const result2 = from([11, 1, 2, 3]).pipe(
 *   chunkByAccumulation(
 *     0,
 *     (acc, current) => acc + current,
 *     (acc) => acc <= 10
 *   )
 * ).toArray();
 *
 * // result2: []
 *
 * // Example where enumeration stops when a single value doesn't satisfy the condition
 * const result3 = from([1, 2, 3, 15, 4, 5]).pipe(
 *   chunkByAccumulation(
 *     0,
 *     (acc, current) => acc + current,
 *     (acc) => acc <= 10
 *   )
 * ).toArray();
 *
 * // result3: [[1, 2, 3]]
 * ```
 *
 * In these examples:
 * - A new chunk starts whenever the sum exceeds 10.
 * - In result2, an empty array is returned because the first value (11) immediately fails the condition.
 * - In result3, enumeration stops at 15 because it fails the condition on its own, and the previous chunk is returned.
 *
 * @param seed The initial value for the accumulation.
 * @param func A function that takes the current accumulation and the current element, and returns a new accumulation.
 * @param thresholdUntil A function that takes the current accumulation and returns true if the chunk should continue, or false if a new chunk should start.
 *                       When this function returns false, the accumulation is reset to the seed value for the next chunk.
 * @typeParam T Source element type.
 * @typeParam TAccumulate The type returned by the aggregate function.
 * @returns Operator function.
 *
 * @remarks
 * - The accumulation is reset to the seed value at the beginning of each new chunk.
 * - If the first value in the sequence doesn't satisfy the thresholdUntil condition, an empty sequence is returned.
 * - If at any point in the sequence a single value doesn't satisfy the thresholdUntil condition, the enumeration stops at that point.
 *
 * @category Operators
 */
export const chunkByAccumulation = <T, TAccumulate>(
  seed: TAccumulate,
  func: (accInChunk: TAccumulate, current: T) => TAccumulate,
  thresholdUntil: (accInChunk: TAccumulate) => boolean
): Operator<T, readonly T[]> =>
  function* chunkByAccumulation(source: Seq<T>): Gen<readonly T[]> {
    let accumulate = seed;
    let ch: T[] = [];
    for (const one of source) {
      const newAccumulate = func(accumulate, one);
      if (thresholdUntil(newAccumulate)) {
        accumulate = newAccumulate;
        ch.push(one);
      } else {
        if (ch.length != 0) {
          yield ch;
        }
        ch = [];
        accumulate = func(seed, one);
        if (thresholdUntil(accumulate)) {
          ch.push(one);
        } else {
          break;
        }
      }
    }
    if (ch.length != 0) {
      yield ch;
    }
  };
