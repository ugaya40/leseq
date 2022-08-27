import { AsyncGen, AsyncOperator, AsyncSeq } from '../../AsyncSeq';

/**
 * Returns a sequence divided into array of the specified size.
 *
 * ```typescript
 * const result = await fromAsAsync([1, 2, 3, 4, 5, 6, 7]).pipe(
 *   chunkAsync(2)
 * ).toArrayAsync();
 * //result: [[1,2],[3,4],[5,6],[7]]
 * ```
 *
 * @param size Length of elements per array.
 * @returns Operator function.
 * @typeParam T Source element type.
 * @category Async Operators
 */
export const chunkAsync = <T>(size: number): AsyncOperator<T, readonly T[]> =>
  async function* chunkAsync(source: AsyncSeq<T>): AsyncGen<readonly T[]> {
    let ch: T[] = [];
    for await (const one of source) {
      ch.push(one);
      if (ch.length === size) {
        yield ch;
        ch = [];
      }
    }
    if (ch.length != 0) {
      yield ch;
    }
  };
