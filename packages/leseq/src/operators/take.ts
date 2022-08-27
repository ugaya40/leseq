import { Gen, Operator, Seq } from '../Seq';

/**
 * Returns a sequence that enumerates the specified number of items.
 *
 * ```typescript
 * const result = range(1,10).pipe(
 *   take(3)
 * ).toArray()
 *
 * //result: [1,2,3]
 * ```
 *
 * @param count Number to enumerate.
 * @typeParam T Source element type.
 * @returns Operator function.
 * @category Operators
 */
export const take = <T>(count: number): Operator<T> =>
  function* take(source: Seq<T>): Gen<T> {
    if (count <= 0) return;
    let current = 0;
    for (const i of source) {
      yield i;
      current++;
      if (current == count) return;
    }
  };
