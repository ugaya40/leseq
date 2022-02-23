import { Gen, Operator, Seq } from '../seq';

/**
 * Returns the sequence with the specified number of skips.
 *
 * ```typescript
 * const result = range(1,10).pipe(
 *   skip(3)
 * ).toArray()
 *
 * //result: [4,5,6,7,8,9,10]
 * ```
 *
 * @param count Number of pieces to skip.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Operators
 */
export const skip = <T>(count: number): Operator<T> =>
  function* (source: Seq<T>): Gen<T> {
    let current = 0;
    for (const i of source) {
      if (current >= count) {
        yield i;
      }
      current++;
    }
  };
