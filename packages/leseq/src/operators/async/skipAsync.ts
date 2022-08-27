import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Returns the sequence with the specified number of skips.
 *
 * ```typescript
 * const result = await rangeAsAsync(1,10).pipe(
 *   skipAsync(3)
 * ).toArrayAsync()
 *
 * //result: [4,5,6,7,8,9,10]
 * ```
 *
 * @param count Number of pieces to skip.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Async Operators
 */
export const skipAsync = <T>(count: number): AsyncOperator<T> =>
  async function* skipAsync(source: AsyncSeq<T>): AsyncGen<T> {
    let current = 0;
    for await (const i of source) {
      if (current >= count) {
        yield i;
      }
      current++;
    }
  };
