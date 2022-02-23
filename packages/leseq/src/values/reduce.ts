import { Seq } from '../seq';

/**
 * Returns the result of applying the aggregate function to the elements of the current sequence.
 * The difference with [scan()](/api/operators/#scan) is that it only returns the final result.
 * 
 * ```typescript
 * const output = from([1, 2, 3, 4, 5]).value(
 *   reduce(100, (acc, i) => acc + i)
 * );
 * 
 * //result: 115
 * ```
 * 
 * @param seed This is the initial value for aggregation.
 * @param func Aggregate function.
 * @typeParam T Source element type.
 * @typeParam TAccumulate The type returned by the aggregate function.
 * @returns Aggregate results.
 * @category Values
 */
export const reduce =
  <T, TAccumulate>(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => TAccumulate) =>
  (seq: Seq<T>): TAccumulate => {
    let count = 0;
    let nextAccumulate = seed;
    for (const i of seq) {
      nextAccumulate = func(nextAccumulate, i, count);
      count++;
    }
    return nextAccumulate;
  };
