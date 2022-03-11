import { AsyncSeq, AsyncSeqToValue } from '../../asyncSeq';

/**
 * Returns the result of applying the aggregate function to the elements of the current sequence.
 * The difference with [scan()](/api/operators/#scan) is that it only returns the final result.
 *
 * ```typescript
 * const output = await fromAsAsync([1, 2, 3, 4, 5]).valueAsync(
 *   reduceAsync(100, async (acc, i) => acc + i)
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
 * @category Async Values
 */
export const reduceAsync =
  <T, TAccumulate>(seed: TAccumulate, func: (previous: TAccumulate, current: T, index: number) => Promise<TAccumulate>): AsyncSeqToValue<T, TAccumulate> =>
  async (seq: AsyncSeq<T>): Promise<TAccumulate> => {
    let count = 0;
    let nextAccumulate = seed;
    for await (const i of seq) {
      nextAccumulate = await func(nextAccumulate, i, count);
      count++;
    }
    return nextAccumulate;
  };
