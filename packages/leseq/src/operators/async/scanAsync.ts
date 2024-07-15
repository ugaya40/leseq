import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Returns the resulting sequence after applying the aggregate function to the elements of the current sequence.
 * The difference from [reduce()](/api/values/#reduce) is that each time the aggregate function is applied, the intermediate steps are also enumerated.
 *
 * ```typescript
 * const output = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   scanAsync(100, async (acc, i) => acc + i)
 * ).toArrayAsync();
 *
 * //result: [101, 103, 106, 110, 115]
 * ```
 *
 * @param seed This is the initial value for aggregation.
 * @param func Aggregate function.
 * @typeParam T Source element type.
 * @typeParam TAccumulate The type returned by the aggregate function.
 * @returns Operator function.
 * @category Async Operators
 */
export const scanAsync = <T, TAccumulate>(
  seed: TAccumulate,
  func: (acc: TAccumulate, current: T, index: number) => Promise<TAccumulate>
): AsyncOperator<T, TAccumulate> =>
  async function* scanAsync(source: AsyncSeq<T>): AsyncGen<TAccumulate> {
    let count = 0;
    let nextAccumulate = seed;
    for await (const i of source) {
      nextAccumulate = await func(nextAccumulate, i, count);
      yield nextAccumulate;
      count++;
    }
  };
