import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Returns a sequence that has been filtered by the specified condition.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(
 *   filterAsync(async i => i % 2 == 0)
 * ).toArrayAsync();
 * //result: [2,4]
 * ```
 *
 * @param predicate Conditional functions for filtering.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */

export const filterAsync = <T>(predicate: (arg: T, index: number) => Promise<boolean>): AsyncOperator<T> =>
  async function* filterAsync(source: AsyncSeq<T>): AsyncGen<T> {
    let count = 0;
    for await (const i of source) {
      if (await predicate(i, count)) {
        yield i;
      }
      count++;
    }
  };
