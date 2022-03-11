import { AsyncGen, AsyncOperator, AsyncSeq } from '../../asyncSeq';

/**
 * Returns a sequence that enumerates the specified number of items.
 *
 * ```typescript
 * const result = await rangeAsAsync(1,10).pipe(
 *   takeAsync(3)
 * ).toArrayAsync()
 *
 * //result: [1,2,3]
 * ```
 *
 * @param count Number to enumerate.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Async Operators
 */
export const takeAsync = <T>(count: number): AsyncOperator<T> =>
  async function* (source: AsyncSeq<T>): AsyncGen<T> {
    if (count <= 0) return;
    let current = 0;
    for await (const i of source) {
      yield i;
      current++;
      if (current == count) return;
    }
  };
